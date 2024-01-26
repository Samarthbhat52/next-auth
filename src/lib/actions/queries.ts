"use client";

import { getSupabaseClient } from "@/lib/supabase/client";

const supabase = getSupabaseClient();

export async function getProfileData() {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name,email")
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getAvatarBlob() {
  const id = (await supabase.auth.getUser()).data.user?.id;
  const { data, error } = await supabase.storage
    .from("avatars")
    .download(`${id}/profile`);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
