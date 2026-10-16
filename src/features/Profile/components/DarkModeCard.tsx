"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export default function DarkModeCard() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="flex flex-row items-center justify-between">
      <CardHeader className="grow">
        <CardTitle>Dark Mode</CardTitle>
        <CardDescription>Enable Dark Mode</CardDescription>
      </CardHeader>
      <CardContent>
        <Switch
          id="darkMode"
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </CardContent>
    </Card>
  );
}
