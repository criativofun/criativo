const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const appConfig = {
  supabase: {
    url: supabaseUrl ?? "",
    publishableKey: supabasePublishableKey ?? "",
    isConfigured: Boolean(supabaseUrl && supabasePublishableKey),
  },
};

