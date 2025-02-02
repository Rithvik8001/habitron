"use client";

import { HabitsList } from "./habits-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Habit, Completion } from "@prisma/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
});

type HabitWithCompletions = Habit & {
  completions: Completion[];
};

interface HabitsPageClientProps {
  habits: HabitWithCompletions[];
}

export function HabitsPageClient({ habits }: HabitsPageClientProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Your Habits</h1>
            <p className="mt-2 text-muted-foreground">
              View and manage all your habits here.
            </p>
          </div>
          <HabitsList habits={habits} />
        </div>
      </div>
    </QueryClientProvider>
  );
}
