"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle2, Calendar, Trophy } from "lucide-react";

interface HabitStatsGridProps {
  totalHabits: number;
  completedToday: number;
  totalCompletions: number;
  achievementRate: number;
}

export function HabitStatsGrid({
  totalHabits,
  completedToday,
  totalCompletions,
  achievementRate,
}: HabitStatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-2 md:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
          <Target className="h-4 w-4 text-violet-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHabits}</div>
        </CardContent>
      </Card>
      <Card className="p-2 md:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedToday}</div>
        </CardContent>
      </Card>
      <Card className="p-2 md:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
          <Calendar className="h-4 w-4 text-sky-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCompletions}</div>
        </CardContent>
      </Card>
      <Card className="p-2 md:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Achievement Rate</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{achievementRate}%</div>
        </CardContent>
      </Card>
    </div>
  );
}
