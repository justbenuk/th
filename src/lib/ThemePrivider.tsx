"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemePrivider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      defaultTheme="system"
      attribute={"class"}
      disableTransitionOnChange
      // Keep the server bootstrap executable; client remounts only need the provider effects.
      scriptProps={
        typeof window === "undefined" ? undefined : { type: "application/json" }
      }
    >
      {children}
    </NextThemeProvider>
  );
}
