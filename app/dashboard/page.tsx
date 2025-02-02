import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CalendarView } from "@/app/components/dashboard/calendar-view";
import { Stats } from "@/app/components/dashboard/stats";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const habits = await prisma.habit.findMany({
    where: {
      userId,
    },
    include: {
      completions: true,
    },
  });

  // Calculate active streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let currentStreak = 0;
  let streakDates: { date: Date; habits: string[] }[] = [];

  // Look back up to 30 days to find the streak
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Get completions for this date
    const completedHabits = habits.filter((habit) =>
      habit.completions.some((completion) => {
        const completionDate = new Date(completion.date);
        return completionDate.toDateString() === date.toDateString();
      })
    );

    if (completedHabits.length > 0) {
      currentStreak = i === 0 ? 1 : currentStreak + 1;
      streakDates.unshift({
        date,
        habits: completedHabits.map((h) => h.name),
      });
    } else {
      if (i === 0) {
        // Check if there were completions yesterday to continue the streak
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayCompletions = habits.filter((habit) =>
          habit.completions.some((completion) => {
            const completionDate = new Date(completion.date);
            return completionDate.toDateString() === yesterday.toDateString();
          })
        );
        if (yesterdayCompletions.length > 0) {
          currentStreak = 1;
          streakDates.unshift({
            date: yesterday,
            habits: yesterdayCompletions.map((h) => h.name),
          });
        }
      }
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let currentLongestStreak = 0;
  let longestStreakDates: { date: Date; habits: string[] }[] = [];
  let tempStreakDates: { date: Date; habits: string[] }[] = [];

  // Get all dates in ascending order
  const allDates = Array.from(
    new Set(
      habits.flatMap((h) =>
        h.completions.map((c) => new Date(c.date).toDateString())
      )
    )
  )
    .map((d) => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime());

  for (let i = 0; i < allDates.length; i++) {
    const currentDate = allDates[i];
    const nextDate = i < allDates.length - 1 ? allDates[i + 1] : null;

    const completedHabits = habits.filter((habit) =>
      habit.completions.some((completion) => {
        const completionDate = new Date(completion.date);
        return completionDate.toDateString() === currentDate.toDateString();
      })
    );

    if (completedHabits.length > 0) {
      currentLongestStreak++;
      tempStreakDates.push({
        date: currentDate,
        habits: completedHabits.map((h) => h.name),
      });

      if (
        !nextDate ||
        nextDate.getTime() - currentDate.getTime() > 24 * 60 * 60 * 1000
      ) {
        if (currentLongestStreak > longestStreak) {
          longestStreak = currentLongestStreak;
          longestStreakDates = [...tempStreakDates];
        }
        currentLongestStreak = 0;
        tempStreakDates = [];
      }
    }
  }

  // Calculate completion rate for the last 30 days
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const completionsLast30Days = habits.reduce((total, habit) => {
    return (
      total +
      habit.completions.filter((completion) => {
        const completionDate = new Date(completion.date);
        return completionDate >= thirtyDaysAgo && completionDate <= today;
      }).length
    );
  }, 0);

  const totalPossibleCompletions = habits.length * 30;
  const completionRate =
    totalPossibleCompletions > 0
      ? Math.round((completionsLast30Days / totalPossibleCompletions) * 100)
      : 0;

  return (
    <div className="container mx-auto max-w-5xl space-y-8 p-8">
      <Stats
        habits={habits}
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        completionRate={completionRate}
        streakDates={streakDates}
        longestStreakDates={longestStreakDates}
      />

      <CalendarView habits={habits} />
    </div>
  );
}
