import { auth } from "@clerk/nextjs/server";
import { getUserHabits } from "@/lib/habits";
import { HabitsPageClient } from "./components/habits-page-client";

async function getHabits() {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  return getUserHabits(userId);
}

export default async function HabitsPage() {
  const habits = await getHabits();
  return <HabitsPageClient habits={habits} />;
}
