const GOOGLE_INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const variants = [
  "Use um acabamento de livro infantil contemporâneo, mantendo o resultado extremamente fiel ao desenho.",
  "Use cores um pouco mais vivas e alegres, sem alterar nenhuma característica do personagem.",
  "Use um acabamento suave, delicado e acolhedor, sem alterar nenhuma característica do personagem.",
];

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
  variantInstruction: string,
) {
  const prompt = `Você é um ilustrador de livros infantis. Revele o personagem que já existe neste desenho feito por uma criança.

REGRAS OBRIGATÓRIAS:
- preserve exatamente a ideia original, silhueta, proporções, quantidade e posição de braços, pernas, olhos, asas, chifres e acessórios;
- preserve as cores e os detalhes incomuns, tortos ou assimétricos: eles são parte da identidade criada pela criança;
- não corrija, não redesenhe e não acrescente poderes, roupas ou objetos que não estejam presentes;
- apenas transforme o traço em uma ilustração finalizada, calorosa e apropriada para crianças;
- mostre somente o personagem inteiro, centralizado, em fundo claro e simples;
- não inclua texto, letras, moldura, assinatura ou marca.

Direção desta versão: ${variantInstruction}`;

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
        image_size: "1K",
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
    const { imageDataUrl } = await request.json();
    if (typeof imageDataUrl !== "string") return json({ error: "Envie um desenho válido." }, 400);

    const match = imageDataUrl.match(/^data:(image\/(?:jpeg|png));base64,(.+)$/s);
    if (!match) return json({ error: "O desenho precisa estar em JPG ou PNG." }, 400);

    const [, mimeType, imageData] = match;
    const results = await Promise.allSettled(
      variants.map((variant) => generateVariant(apiKey, imageData, mimeType, variant)),
    );
    const images = results
      .filter((result): result is PromiseFulfilledResult<string> => result.status === "fulfilled")
      .map((result) => result.value);

    if (!images.length) {
      const firstError = results.find((result) => result.status === "rejected");
      throw firstError && firstError.status === "rejected"
        ? firstError.reason
        : new Error("Não foi possível gerar o personagem.");
    }

    return json({ images });
  } catch (error) {
    console.error(error);
    return json(
      { error: error instanceof Error ? error.message : "Não foi possível interpretar o desenho." },
      500,
    );
  }
});

