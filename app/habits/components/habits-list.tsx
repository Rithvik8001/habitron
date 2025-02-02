"use client";

import { Habit, Completion } from "@prisma/client";
import { useHabitCompletion } from "@/hooks/use-habit-completion";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/lib/api";
import { cn } from "@/lib/utils";

export type HabitWithCompletions = Habit & {
  completions: Completion[];
};

interface HabitsListProps {
  habits: HabitWithCompletions[];
}

export function HabitsList({ habits: initialHabits }: HabitsListProps) {
  const { completeHabit, uncompleteHabit } = useHabitCompletion();
  const [loadingHabitId, setLoadingHabitId] = useState<string | null>(null);

  const { data: habits = initialHabits, isLoading } = useQuery({
    queryKey: ["habits"],
    queryFn: () => getHabits() as Promise<HabitWithCompletions[]>,
    initialData: initialHabits,
  });

  const handleHabitToggle = async (habit: HabitWithCompletions) => {
    try {
      setLoadingHabitId(habit.id);

      // Set the date to noon UTC to avoid timezone issues
      const targetDate = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (targetDate >= tomorrow) {
        console.error("Cannot complete habits for future dates");
        return;
      }

      targetDate.setUTCHours(12, 0, 0, 0);

      const isCompleted = habit.completions.length > 0;
      if (isCompleted) {
        await uncompleteHabit({ habitId: habit.id, date: targetDate });
      } else {
        await completeHabit({ habitId: habit.id, date: targetDate });
      }
    } catch (error) {
      console.error("Failed to toggle habit:", error);
    } finally {
      setLoadingHabitId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {habits.map((habit: HabitWithCompletions) => {
        const isCompleted = habit.completions.length > 0;
        const isLoading = loadingHabitId === habit.id;
        return (
          <div
            key={habit.id}
            className={cn(
              "flex items-center justify-between rounded-lg border p-4 transition-colors duration-200",
              isCompleted && "bg-secondary/50"
            )}
          >
            <div className="space-y-1">
              <h3 className="font-medium">{habit.name}</h3>
              {habit.description && (
                <p className="text-sm text-muted-foreground">
                  {habit.description}
                </p>
              )}
            </div>
            <Button
              variant={isCompleted ? "outline" : "default"}
              size="sm"
              onClick={() => handleHabitToggle(habit)}
              disabled={isLoading}
              className="min-w-[120px] transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isCompleted ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Done
                </>
              ) : (
                <>
                  <Circle className="mr-2 h-4 w-4" />
                  Not Done
                </>
              )}
            </Button>
          </div>
        );
      })}
      {habits.length === 0 && (
        <p className="text-center text-muted-foreground">No habits found.</p>
      )}
    </div>
  );
}
