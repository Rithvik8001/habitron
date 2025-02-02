import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import {
  createHabit,
  getUserHabits,
  updateHabit,
  deleteHabit,
} from "@/lib/habits";
import { getOrCreateUser } from "@/lib/user";
import { HabitFrequency } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
      // Ensure user exists in our database
      await getOrCreateUser(userId);
    } catch (error) {
      console.error("[USER_CREATE]", error);
      return new NextResponse(
        "Failed to create user. Please ensure you have verified your email address.",
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, description, frequency } = body;

    console.log("Creating habit:", { name, description, frequency, userId });

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!frequency) {
      return new NextResponse("Frequency is required", { status: 400 });
    }

    if (!Object.values(HabitFrequency).includes(frequency)) {
      return new NextResponse(
        `Invalid frequency. Must be one of: ${Object.values(
          HabitFrequency
        ).join(", ")}`,
        { status: 400 }
      );
    }

    const habit = await createHabit({
      name,
      description,
      frequency,
      userId,
    });

    console.log("Habit created:", habit);

    return NextResponse.json(habit);
  } catch (error) {
    console.error("[HABITS_POST]", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return new NextResponse(message, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
      // Ensure user exists in our database
      await getOrCreateUser(userId);
    } catch (error) {
      console.error("[USER_CREATE]", error);
      return new NextResponse(
        "Failed to create user. Please ensure you have verified your email address.",
        { status: 400 }
      );
    }

    const habits = await getUserHabits(userId);
    return NextResponse.json(habits);
  } catch (error) {
    console.error("[HABITS_GET]", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return new NextResponse(message, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { habitId, name, description, frequency } = body;

    if (
      !habitId ||
      !name ||
      !frequency ||
      !Object.values(HabitFrequency).includes(frequency)
    ) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const habit = await updateHabit(habitId, {
      name,
      description,
      frequency,
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error("[HABITS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const habitId = searchParams.get("habitId");

    if (!habitId) {
      return new NextResponse("Missing habitId", { status: 400 });
    }

    await deleteHabit(habitId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[HABITS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
