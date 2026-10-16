import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemePrivider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      defaultTheme="system"
      attribute={"class"}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
