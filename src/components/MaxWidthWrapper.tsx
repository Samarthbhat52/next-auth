import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn(
        "mx-auto w-full h-full max-w-screen-2xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </main>
  );
};
