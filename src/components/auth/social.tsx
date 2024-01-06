"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { getSupabaseClient } from "@/lib/supabase/client";

export const Social = () => {
  const supabase = getSupabaseClient();

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={loginWithGoogle}
      >
        <FcGoogle />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={loginWithGitHub}
      >
        <FaGithub />
      </Button>
    </div>
  );
};
