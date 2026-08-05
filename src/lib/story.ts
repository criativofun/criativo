import { appConfig } from "@/lib/config";

export type StoryPage = {
  page: number;
  text: string;
  illustrationPrompt: string;
};

export type Storybook = {
  title: string;
  summary: string;
  message: string;
  pages: StoryPage[];
};

type StoryRequest = {
  character: {
    name: string;
    personality: string;
    likes: string;
    dreams: string;
    details: string;
  };
  adventure: string;
};

export async function generateStorybook(input: StoryRequest): Promise<Storybook> {
  const { url, publishableKey, isConfigured } = appConfig.supabase;

  if (!isConfigured) {
    throw new Error("A conexão segura do crIAtivo ainda não foi configurada.");
  }

  const response = await fetch(`${url}/functions/v1/generate-story`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify(input),
  });

  const result = (await response.json().catch(() => ({}))) as Storybook & { error?: string };

  if (!response.ok || !result.pages?.length) {
    throw new Error(result.error || "Não foi possível escrever a história agora. Tente novamente.");
  }

  return result;
}
