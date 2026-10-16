import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ThemePrivider from "@/lib/ThemePrivider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    template: "%s | Tamworth Hub",
    default: "Tamworth Hub",
  },
  description: "Community portal for everything Tamworth",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={"h-full antialiased"} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemePrivider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemePrivider>
      </body>
    </html>
  );
}
