"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Habit } from "@prisma/client";

const iconVariants = {
  default: "text-violet-500",
  success: "text-emerald-500",
  warning: "text-amber-500",
  info: "text-sky-500",
};

const bgVariants = {
  default: "bg-violet-50 dark:bg-violet-500/10",
  success: "bg-emerald-50 dark:bg-emerald-500/10",
  warning: "bg-amber-50 dark:bg-amber-500/10",
  info: "bg-sky-50 dark:bg-sky-500/10",
};

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  iconColor?: string;
  habits?: (Habit & { completions: any[] })[];
  streakDates?: { date: Date; habits: string[] }[];
  variant?: keyof typeof iconVariants;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  iconColor,
  habits,
  streakDates,
  variant = "default",
}: StatCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (habits || streakDates || title === "Completion Rate") {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="h-auto w-full p-0 hover:bg-transparent"
        onClick={handleClick}
      >
        <div className={cn("glass-card group w-full", `variant-${variant}`)}>
          {/* Content */}
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground/80">
                  {title}
                </h3>
                <div className="text-3xl font-bold tracking-tight">
                  {value}
                  {title === "Active Streak" && Number(value) > 0 && (
                    <span className="ml-2 animate-pulse">🔥</span>
                  )}
                </div>
              </div>

              <div className="glass-card flex h-12 w-12 items-center justify-center">
                <Icon className={cn("h-6 w-6", iconVariants[variant])} />
              </div>
            </div>
          </div>
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="space-y-4">
            <DialogTitle className="flex items-center gap-2">
              <Icon className={cn("h-5 w-5", iconVariants[variant])} />
              <span>{title} Details</span>
            </DialogTitle>
            <div className={cn("rounded-lg px-4 py-3", bgVariants[variant])}>
              <div className="text-sm font-medium">Current {title}</div>
              <div className="mt-1 text-2xl font-bold tracking-tight">
                {value}
                {title === "Active Streak" && Number(value) > 0 && (
                  <span className="ml-2 animate-pulse">🔥</span>
                )}
              </div>
              {title === "Completion Rate" && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>
                    This shows how often you complete your habits. It's
                    calculated as:
                  </p>
                  <div className="mt-2 rounded-md bg-background/50 p-3 font-mono text-xs">
                    (Total Completions / (Total Days × Number of Habits)) × 100%
                  </div>
                  <p className="mt-2">
                    A higher percentage means you're more consistent with your
                    habits. Try to maintain above 80% for best results! 🎯
                  </p>
                </div>
              )}
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {habits && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-medium">
                  <div className={cn("rounded-md p-1.5", bgVariants[variant])}>
                    <Icon className={cn("h-4 w-4", iconVariants[variant])} />
                  </div>
                  Habits Contributing
                </h4>
                <ul className="space-y-3">
                  {habits.map((habit) => (
                    <li
                      key={habit.id}
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm",
                        "bg-muted/50"
                      )}
                    >
                      <div className="font-medium">{habit.name}</div>
                      <div className="mt-1 text-muted-foreground">
                        {habit.completions.length} completion
                        {habit.completions.length !== 1 ? "s" : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {streakDates && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-medium">
                  <div className={cn("rounded-md p-1.5", bgVariants[variant])}>
                    <Icon className={cn("h-4 w-4", iconVariants[variant])} />
                  </div>
                  Streak History
                </h4>
                <ul className="space-y-3">
                  {streakDates.map(({ date, habits }) => (
                    <li
                      key={date.toISOString()}
                      className={cn("rounded-lg px-4 py-3", "bg-muted/50")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">
                          {new Date(date).toLocaleDateString(undefined, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {habits.length} habit{habits.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {habits.map((habit) => (
                          <span
                            key={habit}
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              bgVariants[variant]
                            )}
                          >
                            {habit}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
