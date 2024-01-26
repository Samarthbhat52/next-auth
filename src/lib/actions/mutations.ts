"use client";

import { getSupabaseClient } from "@/lib/supabase/client";
import { AvatarChangeSchema } from "@/schema";
import * as z from "zod";

const supabase = getSupabaseClient();

export async function setAvatar(values: z.infer<typeof AvatarChangeSchema>) {
  const id = (await supabase.auth.getUser()).data.user?.id;
  const avatarPath = `${id}/profile`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(avatarPath, values.avatarImg, { upsert: true });

  if (error) throw new Error(error.message);

  const publicURL = supabase.storage.from("avatars").getPublicUrl(avatarPath);

  const { error: databaseError } = await supabase
    .from("profiles")
    .upsert({ id: id, avatar_url: publicURL.data.publicUrl });

  if (databaseError) throw new Error(databaseError.message);

  return true;
}
