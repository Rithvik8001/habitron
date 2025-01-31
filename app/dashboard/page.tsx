"use client";

import { ContributionsGrid } from "../components/dashboard/contributions-grid";
import { CalendarDays, CheckCircle2, Flame, Target } from "lucide-react";
import { useHabits } from "@/hooks/use-habits";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const {
    habits,
    isLoading,
    getCompletionsForDate,
    getCompletionRate,
    getLongestStreak,
    getCurrentStreak,
  } = useHabits();

  // Generate data for contributions grid
  const getContributionsData = () => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split("T")[0],
        completed:
          habits?.some((habit) =>
            habit.completions.some(
              (c) => new Date(c.date).toDateString() === date.toDateString()
            )
          ) ?? false,
      });
    }
    return data;
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium">Total Habits</div>
          </div>
          <div className="mt-2 text-2xl font-bold">{habits?.length ?? 0}</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <div className="text-sm font-medium">Active Streak</div>
          </div>
          <div className="mt-2 text-2xl font-bold">
            {getCurrentStreak()} days {getCurrentStreak() > 0 ? "🔥" : ""}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium">Completion Rate</div>
          </div>
          <div className="mt-2 text-2xl font-bold">{getCompletionRate()}%</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium">Longest Streak</div>
          </div>
          <div className="mt-2 text-2xl font-bold">
            {getLongestStreak()} days
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Habit Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your habit completion activity for the past year
          </p>
        </div>
        <div className="p-6">
          <ContributionsGrid data={getContributionsData()} />
        </div>
      </div>

      <div className="rounded-xl border">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y">
          {habits
            ?.flatMap((habit) =>
              habit.completions.slice(0, 5).map((completion) => ({
                habitName: habit.name,
                date: new Date(completion.date),
              }))
            )
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 5)
            .map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <div className="font-medium">
                    {activity.habitName} completed
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatRelativeTime(activity.date)}
                  </div>
                </div>
              </div>
            ))}
          {(!habits?.length ||
            !habits.some((h) => h.completions.length > 0)) && (
            <div className="p-6 text-sm text-muted-foreground">
              No recent activity. Start by creating a new habit!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }
  if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }
  return "Just now";
}
