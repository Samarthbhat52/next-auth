"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

// Auth functions

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  name: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { full_name: data.name },
    },
  });

  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}

export async function supabaseSignOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}

// ------------------------------------------ //
