import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createHabit, getUserHabits } from "@/lib/habits";
import { HabitFrequency } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description, frequency } = body;

    if (
      !name ||
      !frequency ||
      !Object.values(HabitFrequency).includes(frequency)
    ) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const habit = await createHabit({
      name,
      description,
      frequency,
      userId,
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error("[HABITS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const habits = await getUserHabits(userId);
    return NextResponse.json(habits);
  } catch (error) {
    console.error("[HABITS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
