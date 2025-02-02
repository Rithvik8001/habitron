"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCard({ currentStreak, longestStreak }: StreakCardProps) {
  return (
    <Card className="p-2 md:p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Streaks
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Current Streak</div>
          <div className="text-xl md:text-2xl font-bold">{currentStreak} days</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Longest Streak</div>
          <div className="text-xl md:text-2xl font-bold">{longestStreak} days</div>
        </div>
      </CardContent>
    </Card>
  );
}
