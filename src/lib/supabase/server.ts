"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient(serverComponent = false) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value;
        },
        set(name, value, options) {
          if (serverComponent) return;
          cookies().set({ name, value, ...options });
        },
        remove(name, options) {
          if (serverComponent) return;
          cookies().set({ name, value: "", ...options });
        },
      },
    }
  );
}
