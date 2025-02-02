import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";
import { HabitFrequency } from "@prisma/client";

export type CreateHabitInput = {
  name: string;
  description?: string;
  frequency: HabitFrequency;
  userId: string;
};

export async function createHabit(input: CreateHabitInput) {
  return prisma.habit.create({
    data: {
      ...input,
    },
  });
}

export async function getUserHabits(userId: string) {
  return prisma.habit.findMany({
    where: {
      userId,
      archived: false,
    },
    include: {
      completions: {
        where: {
          date: {
            // Get completions for today only
            gte: startOfDay(new Date()),
            lte: endOfDay(new Date()),
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getHabitWithCompletions(habitId: string) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return prisma.habit.findUnique({
    where: {
      id: habitId,
    },
    include: {
      completions: {
        where: {
          date: {
            gte: today,
            lt: tomorrow,
          },
        },
        orderBy: {
          date: "desc",
        },
      },
    },
  });
}

export async function getHabitHistory(habitId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setUTCHours(0, 0, 0, 0);

  return prisma.completion.findMany({
    where: {
      habitId,
      date: {
        gte: startDate,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function completeHabit(habitId: string, date: Date = new Date()) {
  // Ensure the date is set to noon UTC
  const completionDate = new Date(date);
  completionDate.setUTCHours(12, 0, 0, 0);

  try {
    return await prisma.completion.create({
      data: {
        habitId,
        date: completionDate,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to complete habit: ${error.message}`);
    }
    throw error;
  }
}

export async function uncompleteHabit(
  habitId: string,
  date: Date = new Date()
) {
  // Ensure the date is set to noon UTC
  const completionDate = new Date(date);
  completionDate.setUTCHours(12, 0, 0, 0);

  try {
    return await prisma.completion.deleteMany({
      where: {
        habitId,
        date: {
          equals: completionDate,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to uncomplete habit: ${error.message}`);
    }
    throw error;
  }
}

export async function getHabitCompletions(habitId: string, days: number = 365) {
  return prisma.completion.findMany({
    where: {
      habitId,
      date: {
        gte: new Date(new Date().setDate(new Date().getDate() - days)),
      },
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function updateHabit(
  habitId: string,
  data: {
    name: string;
    description?: string;
    frequency: HabitFrequency;
  }
) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const habit = await prisma.habit.findUnique({
    where: { id: habitId },
  });

  if (!habit || habit.userId !== userId) {
    throw new Error("Not found");
  }

  return prisma.habit.update({
    where: { id: habitId },
    data,
  });
}

export async function deleteHabit(habitId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const habit = await prisma.habit.findUnique({
    where: { id: habitId },
  });

  if (!habit || habit.userId !== userId) {
    throw new Error("Not found");
  }

  // Delete all completions first
  await prisma.completion.deleteMany({
    where: { habitId },
  });

  // Then delete the habit
  return prisma.habit.delete({
    where: { id: habitId },
  });
}

export async function isHabitCompletedToday(habitId: string) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const completion = await prisma.completion.findFirst({
    where: {
      habitId,
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  return completion !== null;
}

function startOfDay(date: Date) {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
}

function endOfDay(date: Date) {
  const newDate = new Date(date);
  newDate.setUTCHours(23, 59, 59, 999);
  return newDate;
}
