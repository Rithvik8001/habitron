import { prisma } from './db'
import { HabitFrequency } from '@prisma/client'

export type CreateHabitInput = {
  name: string
  description?: string
  frequency: HabitFrequency
  userId: string
}

export async function createHabit(input: CreateHabitInput) {
  return prisma.habit.create({
    data: {
      ...input,
    },
  })
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
            gte: new Date(new Date().setDate(new Date().getDate() - 365)), // Last 365 days
          },
        },
        orderBy: {
          date: 'desc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function completeHabit(habitId: string, date: Date = new Date()) {
  return prisma.completion.create({
    data: {
      habitId,
      date,
    },
  })
}

export async function uncompleteHabit(habitId: string, date: Date = new Date()) {
  return prisma.completion.deleteMany({
    where: {
      habitId,
      date: {
        equals: date,
      },
    },
  })
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
      date: 'desc',
    },
  })
}
