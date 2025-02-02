import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeHabit, uncompleteHabit } from "@/lib/api";
import { Habit, Completion } from "@prisma/client";

type HabitWithCompletions = Habit & {
  completions: Completion[];
};

export function useHabitCompletion() {
  const queryClient = useQueryClient();

  const completeMutation = useMutation({
    mutationFn: ({ habitId, date }: { habitId: string; date?: Date }) =>
      completeHabit(habitId, date),
    onMutate: async ({ habitId, date }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["habits"] });

      // Snapshot the previous value
      const previousHabits = queryClient.getQueryData<HabitWithCompletions[]>(["habits"]);

      // Optimistically update habits
      queryClient.setQueryData<HabitWithCompletions[]>(["habits"], (old = []) => {
        return old.map((habit) => {
          if (habit.id === habitId) {
            return {
              ...habit,
              completions: [
                {
                  id: "temp-" + Date.now(),
                  habitId,
                  date: date || new Date(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
            };
          }
          return habit;
        });
      });

      return { previousHabits };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousHabits) {
        queryClient.setQueryData(["habits"], context.previousHabits);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure data is correct
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const uncompleteMutation = useMutation({
    mutationFn: ({ habitId, date }: { habitId: string; date?: Date }) =>
      uncompleteHabit(habitId, date),
    onMutate: async ({ habitId }) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });

      const previousHabits = queryClient.getQueryData<HabitWithCompletions[]>(["habits"]);

      queryClient.setQueryData<HabitWithCompletions[]>(["habits"], (old = []) => {
        return old.map((habit) => {
          if (habit.id === habitId) {
            return {
              ...habit,
              completions: [],
            };
          }
          return habit;
        });
      });

      return { previousHabits };
    },
    onError: (err, variables, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(["habits"], context.previousHabits);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  return {
    completeHabit: completeMutation.mutate,
    uncompleteHabit: uncompleteMutation.mutate,
  };
}
