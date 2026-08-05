const GOOGLE_INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type CharacterStyle = "3d" | "2d" | "vector";

const styleProfiles: Record<CharacterStyle, { artDirection: string }> = {
  "3d": {
    artDirection: `um personagem CGI 3D cinematográfico, reconstruído como um modelo tridimensional completo e não como uma pintura. Use cabeça, corpo, braços, roupa e acessórios com volume real; formas arredondadas; pele e materiais macios; tecido com espessura e costuras sutis; olhos com reflexos; iluminação de estúdio com luz principal, luz de recorte e sombras de contato; profundidade de campo suave; renderização premium de longa-metragem de animação familiar. O resultado deve parecer um boneco 3D fotografado em um estúdio, com profundidade e presença física. PROIBIDO: aquarela, papel, textura de papel, lápis, giz, pinceladas, line art, contornos desenhados, ilustração plana ou aparência 2D`,
  },
  "2d": {
    artDirection: "ilustração 2D sofisticada de livro infantil, com desenho orgânico, formas expressivas, pintura digital rica, textura delicada e acabamento editorial",
  },
  vector: {
    artDirection: "personagem em ilustração vetorial moderna, com silhueta clara, formas geométricas limpas, contornos bem resolvidos, cores marcantes e gradientes muito sutis",
  },
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function findImage(value: unknown): { data: string; mimeType: string } | null {
  if (!value || typeof value !== "object") return null;

  const object = value as Record<string, unknown>;
  const data = typeof object.data === "string" ? object.data : null;
  const type = object.type === "image" || object.type === "image_url";
  const mimeType =
    typeof object.mime_type === "string"
      ? object.mime_type
      : typeof object.mimeType === "string"
        ? object.mimeType
        : "image/png";

  if (type && data) return { data, mimeType };

  for (const child of Object.values(object)) {
    if (Array.isArray(child)) {
      for (const item of child) {
        const found = findImage(item);
        if (found) return found;
      }
    } else {
      const found = findImage(child);
      if (found) return found;
    }
  }

  return null;
}

async function generateVariant(
  apiKey: string,
  imageData: string,
  mimeType: string,
  artDirection: string,
) {
  const prompt = `Você é um diretor de arte especializado em personagens para crianças. Use o desenho somente como referência de IDENTIDADE e transforme o personagem em ${artDirection}.

REGRAS OBRIGATÓRIAS:
- preserve os elementos que tornam o personagem reconhecível: formato geral, penteado, rosto, roupa, capa, acessórios, símbolos existentes e paleta de cores;
- preserve a identidade e o design, mas NÃO preserve o material artístico, a textura, os contornos nem a técnica do desenho original;
- reconstrua todas as formas e superfícies integralmente na direção artística escolhida;
- dê ao rosto uma expressão calorosa e comunicativa, sem descaracterizar os elementos desenhados;
- não copie nenhum personagem conhecido e não acrescente roupas, poderes, armas ou acessórios inexistentes;
- se já existir uma letra ou símbolo importante na roupa, preserve-o; não crie textos novos;
- mostre somente o personagem inteiro, centralizado, em pose natural, sobre fundo claro e simples;
- o resultado deve parecer a evolução surpreendente do desenho, não apenas uma versão limpa ou redesenhada em 2D.

Direção desta versão: preserve a identidade original, use uma pose natural e crie uma expressão calorosa e encantadora.`;

  const response = await fetch(GOOGLE_INTERACTIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      model: "gemini-3.1-flash-image",
      input: [
        { type: "text", text: prompt },
        { type: "image", data: imageData, mime_type: mimeType },
      ],
      response_format: {
        type: "image",
        mime_type: "image/jpeg",
        aspect_ratio: "1:1",
        image_size: "512",
      },
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error?.message || "O Google não conseguiu gerar esta versão.";
    throw new Error(message);
  }

  const image = findImage(payload);
  if (!image) throw new Error("A resposta do Google não continha uma imagem.");
  return `data:${image.mimeType};base64,${image.data}`;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);

  const apiKey = Deno.env.get("GOOGLE_AI_API_KEY");
  if (!apiKey) return json({ error: "A chave da IA ainda não foi configurada." }, 500);

  try {
    const { imageDataUrl, style = "3d" } = await request.json();
    if (typeof imageDataUrl !== "string") return json({ error: "Envie um desenho válido." }, 400);

    const match = imageDataUrl.match(/^data:(image\/(?:jpeg|png));base64,(.+)$/s);
    if (!match) return json({ error: "O desenho precisa estar em JPG ou PNG." }, 400);

    const [, mimeType, imageData] = match;
    const selectedStyle: CharacterStyle = style === "2d" || style === "vector" ? style : "3d";
    const profile = styleProfiles[selectedStyle];
    const image = await generateVariant(apiKey, imageData, mimeType, profile.artDirection);
    const images = [image];

    return json({ images });
  } catch (error) {
    console.error(error);
    return json(
      { error: error instanceof Error ? error.message : "Não foi possível interpretar o desenho." },
      500,
    );
  }
});
