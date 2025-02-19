import { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { getHabitWithCompletions, getHabitHistory } from "@/lib/habits";
import { HabitStatus } from "./components/habit-status";

type PageProps = {
  params: Promise<{ habitId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { habitId } = await params;
  const habit = await getHabitWithCompletions(habitId);

  if (!habit) {
    return {
      title: "Habit Not Found",
    };
  }

  return {
    title: habit.name,
    description: `Track your progress for ${habit.name}`,
  };
}

async function getHabitDetails(habitId: string) {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const [habit, completions] = await Promise.all([
    getHabitWithCompletions(habitId),
    getHabitHistory(habitId),
  ]);

  if (!habit || habit.userId !== userId) {
    return null;
  }

  return {
    ...habit,
    isCompletedToday: habit.completions.length > 0,
    history: completions,
  };
}

export default async function HabitPage({ params }: PageProps) {
  const { habitId } = await params;
  const habit = await getHabitDetails(habitId);

  if (!habit) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{habit.name}</h1>
          {habit.description && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              {habit.description}
            </p>
          )}
        </div>

        <div className="rounded-lg border p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold">Today's Status</h2>
          <div className="mt-4">
            <HabitStatus habit={habit} />
          </div>
        </div>

        <div className="rounded-lg border p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold">Habit Details</h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Frequency</dt>
              <dd className="mt-1 text-sm font-medium">{habit.frequency}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Started</dt>
              <dd className="mt-1 text-sm font-medium">
                {format(habit.startDate, "PPP")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold">
            Recent Completions
          </h2>
          {habit.history.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {habit.history.map((completion) => (
                <li
                  key={completion.id}
                  className="flex items-center justify-between rounded-md bg-muted/40 p-3 sm:p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-sm font-medium">
                        {format(completion.date, "MMM d, yyyy")}
                      </span>
                      <span className="text-xs text-muted-foreground sm:text-sm">
                        {format(completion.date, "p")}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No completions recorded yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
