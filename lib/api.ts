import { HabitFrequency } from "@prisma/client";

export async function getHabits() {
  const response = await fetch("/api/habits");
  if (!response.ok) {
    throw new Error("Failed to fetch habits");
  }
  return response.json();
}

export async function createHabit({
  name,
  description,
  frequency,
}: {
  name: string;
  description?: string;
  frequency: HabitFrequency;
}) {
  const response = await fetch("/api/habits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      frequency,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create habit");
  }

  return response.json();
}

export async function completeHabit(habitId: string, date?: Date) {
  const response = await fetch(`/api/habits/${habitId}/completion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: date?.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to complete habit");
  }

  return response.json();
}

export async function uncompleteHabit(habitId: string, date?: Date) {
  const url = new URL(
    `/api/habits/${habitId}/completion`,
    window.location.origin
  );
  if (date) {
    url.searchParams.set("date", date.toISOString());
  }

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to uncomplete habit");
  }
}
