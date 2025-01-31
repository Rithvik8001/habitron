"use client";

import { cn } from "@/lib/utils";

interface ContributionsGridProps {
  data: {
    date: string;
    completed: boolean;
  }[];
}

export function ContributionsGrid({ data }: ContributionsGridProps) {
  // Create a 7x52 grid (full year)
  const weeks = Array.from({ length: 52 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="w-full space-y-2 overflow-x-auto">
      <div className="flex min-w-max gap-2">
        {weeks.map((week) => (
          <div key={week} className="grid gap-2">
            {days.map((day) => {
              const index = week * 7 + day;
              const contribution = data[index];
              return (
                <div
                  key={day}
                  className={cn(
                    "h-3 w-3 rounded-sm transition-colors",
                    contribution?.completed
                      ? "bg-emerald-500 dark:bg-emerald-500"
                      : "bg-gray-100 dark:bg-gray-800"
                  )}
                  title={`${contribution?.date}: ${
                    contribution?.completed ? "Completed" : "Not completed"
                  }`}
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
