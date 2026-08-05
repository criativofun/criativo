import { appConfig } from "@/lib/config";

type GenerateCharactersResponse = {
  images?: string[];
  error?: string;
};

export type CharacterStyle = "3d" | "2d" | "vector";

export async function generateCharacterInterpretations(
  imageDataUrl: string,
  style: CharacterStyle,
): Promise<string[]> {
  const { url, publishableKey, isConfigured } = appConfig.supabase;

  if (!isConfigured) {
    throw new Error("A conexão segura do crIAtivo ainda não foi configurada.");
  }

  const response = await fetch(`${url}/functions/v1/generate-character`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify({ imageDataUrl, style }),
  });

  const result = (await response.json().catch(() => ({}))) as GenerateCharactersResponse;

  if (!response.ok || !result.images?.length) {
    throw new Error(result.error || "Não foi possível dar vida ao desenho agora. Tente novamente.");
  }

  return result.images;
}
