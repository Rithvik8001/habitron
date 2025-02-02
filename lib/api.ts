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
    const error = await response.text();
    console.error("Failed to create habit:", {
      status: response.status,
      statusText: response.statusText,
      error,
    });
    throw new Error(`Failed to create habit: ${error}`);
  }

  return response.json();
}

export async function completeHabit(habitId: string, date?: Date) {
  const res = await fetch("/api/habit-completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ habitId, date: date?.toISOString() }),
  });

  if (!res.ok) {
    throw new Error("Failed to complete habit");
  }

  return res.json();
}

export async function uncompleteHabit(habitId: string, date?: Date) {
  const url = new URL("/api/habit-completions", window.location.origin);
  url.searchParams.set("habitId", habitId);
  if (date) {
    url.searchParams.set("date", date.toISOString());
  }

  const res = await fetch(url.toString(), {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to uncomplete habit");
  }
}

export async function updateHabit(
  habitId: string,
  data: {
    name: string;
    description?: string;
    frequency: HabitFrequency;
  }
) {
  const res = await fetch("/api/habits", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ habitId, ...data }),
  });

  if (!res.ok) {
    throw new Error("Failed to update habit");
  }

  return res.json();
}

export async function deleteHabit(habitId: string) {
  const url = new URL("/api/habits", window.location.origin);
  url.searchParams.set("habitId", habitId);

  const res = await fetch(url.toString(), {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete habit");
  }
}
