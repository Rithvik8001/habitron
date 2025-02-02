"use client";

import { useHabits } from "@/hooks/use-habits";
import { HabitCompletionChart } from "./components/habit-completion-chart";
import { HabitStatsGrid } from "./components/habit-stats-grid";
import { StreakCard } from "./components/streak-card";
import { Skeleton } from "@/components/ui/skeleton";
import { startOfWeek, addDays, format } from "date-fns";

export default function AnalyticsPage() {
  const { habits, isLoading, getCompletionsForDate } = useHabits();

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <Skeleton className="h-8 w-[150px]" />
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[120px]" />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
          </div>
        </div>
      </div>
    );
  }

  // Calculate weekly completion data
  const weekStart = startOfWeek(new Date());
  const weeklyData = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(weekStart, index);
    const completedHabits =
      habits?.filter((habit) => getCompletionsForDate(habit.id, date)).length ??
      0;
    const completionRate = habits?.length
      ? Math.round((completedHabits / habits.length) * 100)
      : 0;

    return {
      name: format(date, "EEE"),
      total: completionRate,
    };
  });

  // Calculate total completions
  const totalCompletions =
    habits?.reduce((acc, habit) => acc + habit.completions.length, 0) ?? 0;

  // Calculate completion rate
  const completedToday =
    habits?.filter((habit) => getCompletionsForDate(habit.id, new Date()))
      .length ?? 0;

  // Calculate current streak
  const currentStreak =
    habits?.reduce((maxStreak, habit) => {
      let streak = 0;
      let date = new Date();

      while (getCompletionsForDate(habit.id, date)) {
        streak++;
        date = new Date(date.setDate(date.getDate() - 1));
      }

      return Math.max(maxStreak, streak);
    }, 0) ?? 0;

  // Calculate longest streak from the useHabits hook
  const longestStreak =
    habits?.reduce((maxStreak, habit) => {
      let currentStreak = 0;
      let maxCurrentStreak = 0;
      const sortedDates = habit.completions
        .map((c) => new Date(c.date))
        .sort((a, b) => b.getTime() - a.getTime());

      for (let i = 0; i < sortedDates.length; i++) {
        const current = sortedDates[i];
        const next = sortedDates[i + 1];

        if (next && Math.abs(current.getTime() - next.getTime()) === 86400000) {
          currentStreak++;
          maxCurrentStreak = Math.max(maxCurrentStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }

      return Math.max(maxStreak, maxCurrentStreak);
    }, 0) ?? 0;

  const stats = {
    totalHabits: habits?.length ?? 0,
    completedToday,
    totalCompletions,
    achievementRate: Math.round(
      (totalCompletions / ((habits?.length || 1) * 30)) * 100
    ),
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:space-y-6 md:p-8 md:pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Analytics</h2>
      </div>
      <div className="space-y-4 md:space-y-6">
        <HabitStatsGrid {...stats} />
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          <HabitCompletionChart data={weeklyData} />
          <StreakCard
            currentStreak={currentStreak}
            longestStreak={longestStreak + 1}
          />
        </div>
      </div>
    </div>
  );
}
