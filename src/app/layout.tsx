import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/providers/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <TanstackProvider>
          <MaxWidthWrapper>
            <Toaster closeButton richColors position="top-right" />
            {children}
          </MaxWidthWrapper>
        </TanstackProvider>
      </body>
    </html>
  );
}
