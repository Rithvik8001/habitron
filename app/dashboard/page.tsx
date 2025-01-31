"use client";

import { ContributionsGrid } from "../components/dashboard/contributions-grid";
import { CalendarDays, CheckCircle2, Flame, Target } from "lucide-react";

// Temporary data for the contributions grid
const getDummyData = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      completed: Math.random() > 0.5, // 50% chance of completion
    });
  }
  return data;
};

export default function DashboardPage() {
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
          <div className="mt-2 text-2xl font-bold">5</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <div className="text-sm font-medium">Active Streak</div>
          </div>
          <div className="mt-2 text-2xl font-bold">7 days 🔥</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium">Completion Rate</div>
          </div>
          <div className="mt-2 text-2xl font-bold">85%</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-medium">Longest Streak</div>
          </div>
          <div className="mt-2 text-2xl font-bold">14 days</div>
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
          <ContributionsGrid data={getDummyData()} />
        </div>
      </div>

      <div className="rounded-xl border">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <div className="font-medium">Morning Meditation completed</div>
                <div className="text-sm text-muted-foreground">2 hours ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
