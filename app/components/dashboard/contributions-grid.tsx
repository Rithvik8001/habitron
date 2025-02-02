"use client";

import { cn } from "@/lib/utils";
import { Habit } from "@prisma/client";

interface ContributionsGridProps {
  data: {
    date: string;
    completed: boolean;
    habits: (Habit & { completions: any[] })[];
  }[];
}

export function ContributionsGrid({ data }: ContributionsGridProps) {
  // Create a 7x52 grid (full year)
  const weeks = Array.from({ length: 52 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => i);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full space-y-2 overflow-x-auto">
      <div className="flex min-w-max gap-2">
        {weeks.map((week) => (
          <div key={week} className="grid gap-2">
            {days.map((day) => {
              const index = week * 7 + day;
              const contribution = data[index];
              const tooltipContent =
                contribution?.habits.length > 0
                  ? `${formatDate(
                      contribution.date
                    )}\nCompleted Habits:\n${contribution.habits
                      .map((h) => `• ${h.name}`)
                      .join("\n")}`
                  : `${formatDate(contribution.date)}\nNo habits completed`;

              return (
                <div
                  key={day}
                  className={cn(
                    "h-3 w-3 rounded-sm transition-colors",
                    contribution?.completed
                      ? "bg-emerald-500 dark:bg-emerald-500"
                      : "bg-gray-100 dark:bg-gray-800"
                  )}
                  title={tooltipContent}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
        <div>Not completed</div>
        <div className="h-3 w-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
        <div className="h-3 w-3 rounded-sm bg-emerald-500 dark:bg-emerald-500" />
        <div>Completed</div>
      </div>
    </div>
  );
}
