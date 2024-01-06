"use client";

import { useRouter } from "next/navigation";

interface LoginButtonTypes {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonTypes) => {
  const router = useRouter();

  function onClick() {
    router.push("/auth/login");
  }

  if (mode === "modal") {
    return <span>TODO: implement modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
