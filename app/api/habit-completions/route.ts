import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { completeHabit, uncompleteHabit } from "@/lib/habits";
import { prisma } from "@/lib/db";

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

    const completion = await completeHabit(
      habitId,
      date ? new Date(date) : undefined
    );

    return NextResponse.json(completion);
  } catch (error) {
    console.error("[HABIT_COMPLETION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
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

    await uncompleteHabit(habitId, date ? new Date(date) : undefined);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[HABIT_COMPLETION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
