import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/lib/api";
import { Habit, Completion } from "@prisma/client";

type HabitWithCompletions = Habit & {
  completions: Completion[];
};

export function useHabits() {
  const { data: habits, isLoading } = useQuery<HabitWithCompletions[]>({
    queryKey: ["habits"],
    queryFn: getHabits,
  });

  const getCompletionsForDate = (habitId: string, date: Date) => {
    const habit = habits?.find((h: HabitWithCompletions) => h.id === habitId);
    return habit?.completions.some(
      (c: Completion) => new Date(c.date).toDateString() === date.toDateString()
    );
  };

  const getCompletionRate = () => {
    if (!habits?.length) return 0;
    const totalCompletions = habits.reduce(
      (acc: number, habit: HabitWithCompletions) => acc + habit.completions.length,
      0
    );
    const totalDays = habits.length * 30; // Last 30 days
    return Math.round((totalCompletions / totalDays) * 100);
  };

  const getLongestStreak = () => {
    if (!habits?.length) return 0;
    let longestStreak = 0;

    habits.forEach((habit: HabitWithCompletions) => {
      let currentStreak = 0;
      let maxStreak = 0;
      const sortedDates = habit.completions
        .map((c: Completion) => new Date(c.date))
        .sort((a: Date, b: Date) => b.getTime() - a.getTime());

      for (let i = 0; i < sortedDates.length; i++) {
        const current = sortedDates[i];
        const next = sortedDates[i + 1];

        if (next && isConsecutiveDay(current, next)) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }
      longestStreak = Math.max(longestStreak, maxStreak);
    });

    return longestStreak;
  };

  const getCurrentStreak = () => {
    if (!habits?.length) return 0;
    let currentStreak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const hasCompletion = habits.some((habit: HabitWithCompletions) =>
        habit.completions.some(
          (c: Completion) => new Date(c.date).toDateString() === date.toDateString()
        )
      );

      if (hasCompletion) {
        currentStreak++;
      } else {
        break;
      }
    }

    return currentStreak;
  };

  return {
    habits,
    isLoading,
    getCompletionsForDate,
    getCompletionRate,
    getLongestStreak,
    getCurrentStreak,
  };
}

function isConsecutiveDay(date1: Date, date2: Date) {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}
