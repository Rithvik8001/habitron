import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeHabit, uncompleteHabit } from "@/lib/api";

export function useHabitCompletion() {
  const queryClient = useQueryClient();

  const completeMutation = useMutation({
    mutationFn: ({ habitId, date }: { habitId: string; date?: Date }) =>
      completeHabit(habitId, date),
    onSuccess: () => {
      // Invalidate both habits and completions queries
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["completions"] });
      // Refetch immediately
      queryClient.refetchQueries({ queryKey: ["habits"] });
      queryClient.refetchQueries({ queryKey: ["completions"] });
    },
  });

  const uncompleteMutation = useMutation({
    mutationFn: ({ habitId, date }: { habitId: string; date?: Date }) =>
      uncompleteHabit(habitId, date),
    onSuccess: () => {
      // Invalidate both habits and completions queries
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["completions"] });
      // Refetch immediately
      queryClient.refetchQueries({ queryKey: ["habits"] });
      queryClient.refetchQueries({ queryKey: ["completions"] });
    },
  });

  return {
    completeHabit: completeMutation.mutate,
    uncompleteHabit: uncompleteMutation.mutate,
    isLoading: completeMutation.isPending || uncompleteMutation.isPending,
  };
}
