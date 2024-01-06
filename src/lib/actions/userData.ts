"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function getUserData() {
  const supabase = await createSupabaseServerClient();
  const data = (await supabase.auth.getUser()).data.user?.user_metadata;
  return data;
}
