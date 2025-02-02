import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { completeHabit, uncompleteHabit } from "@/lib/habits";
import { prisma } from "@/lib/db";

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { habitId, date } = body;

    if (!habitId) {
      return new NextResponse("Missing habitId", { status: 400 });
    }

    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit || habit.userId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Parse the date string into a Date object
    const completionDate = date ? new Date(date) : new Date();

    // Only allow completing habits for the current day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (completionDate >= tomorrow || completionDate < today) {
      return new NextResponse(
        JSON.stringify({
          error: "Can only complete habits for the current day",
        }),
        { status: 400 }
      );
    }

    // Set to noon UTC to avoid timezone issues
    completionDate.setUTCHours(12, 0, 0, 0);

    const completion = await completeHabit(habitId, completionDate);
    return NextResponse.json(completion);
  } catch (error) {
    console.error("[HABIT_COMPLETION_POST]", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const habitId = searchParams.get("habitId");
    const date = searchParams.get("date");

    if (!habitId) {
      return new NextResponse("Missing habitId", { status: 400 });
    }

    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit || habit.userId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Parse the date string into a Date object
    const completionDate = date ? new Date(date) : new Date();

    // Only allow uncompleting habits for the current day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (completionDate >= tomorrow || completionDate < today) {
      return new NextResponse(
        JSON.stringify({
          error: "Can only uncomplete habits for the current day",
        }),
        { status: 400 }
      );
    }

    // Set to noon UTC to avoid timezone issues
    completionDate.setUTCHours(12, 0, 0, 0);

    await uncompleteHabit(habitId, completionDate);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[HABIT_COMPLETION_DELETE]", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      { status: 500 }
    );
  }
}
