"use client";

import { useEffect, useState } from "react";
import { Habit } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useHabitCompletion } from "@/hooks/use-habit-completion";
import { Loader2 } from "lucide-react";

interface HabitStatusProps {
  habit: Habit & { isCompletedToday: boolean };
}

export function HabitStatus({ habit }: HabitStatusProps) {
  const [isCompleted, setIsCompleted] = useState(habit.isCompletedToday);
  const { completeHabit, uncompleteHabit } = useHabitCompletion();
  const [loadingHabitId, setLoadingHabitId] = useState<string | null>(null);

  // Reset completion status at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setIsCompleted(false);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = async () => {
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

      if (isCompleted) {
        await uncompleteHabit({ habitId: habit.id, date: targetDate });
        setIsCompleted(false);
      } else {
        await completeHabit({ habitId: habit.id, date: targetDate });
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Failed to toggle habit:", error);
    } finally {
      setLoadingHabitId(null);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
          ) : (
            <div className="h-2 w-2 rounded-full bg-gray-300" />
          )}
          <span className="text-sm font-medium">
            {isCompleted ? "Completed" : "Not completed"}
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        disabled={loadingHabitId === habit.id}
      >
        {loadingHabitId === habit.id ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isCompleted ? (
          "Mark as Not Done"
        ) : (
          "Mark as Done"
        )}
      </Button>
    </div>
  );
}
