"use client";

import { Flame, Hash, LineChart, ListChecks } from "lucide-react";
import { StatCard } from "./stat-card";
import { Habit } from "@prisma/client";

interface StatsProps {
  habits: (Habit & { completions: any[] })[];
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  streakDates: { date: Date; habits: string[] }[];
  longestStreakDates: { date: Date; habits: string[] }[];
}

export function Stats({
  habits,
  currentStreak,
  longestStreak,
  completionRate,
  streakDates,
  longestStreakDates,
}: StatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Hash}
        title="Total Habits"
        value={habits.length}
        habits={habits}
      />
      <StatCard
        icon={Flame}
        title="Active Streak"
        value={currentStreak}
        iconColor="text-orange-500"
        streakDates={streakDates}
      />
      <StatCard
        icon={ListChecks}
        title="Longest Streak"
        value={longestStreak}
        iconColor="text-green-500"
        streakDates={longestStreakDates}
      />
      <StatCard
        icon={LineChart}
        title="Completion Rate"
        value={`${completionRate}%`}
        iconColor="text-blue-500"
      />
    </div>
  );
}
