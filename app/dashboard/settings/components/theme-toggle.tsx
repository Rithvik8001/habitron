"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>
          Choose between light and dark mode for your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          size="lg"
          onClick={() => setTheme("light")}
          className="w-full"
        >
          <Sun className="h-4 w-4 mr-2" />
          Light
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          size="lg"
          onClick={() => setTheme("dark")}
          className="w-full"
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </Button>
      </CardContent>
    </Card>
  );
}
