import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { completeHabit, uncompleteHabit } from "@/lib/habits";
import { prisma } from "@/lib/db";

export async function POST(
  request: Request,
  context: { params: { habitId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const habit = await prisma.habit.findUnique({
      where: { id: context.params.habitId },
    });

    if (!habit || habit.userId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = await request.json();
    const { date } = body;

    const completion = await completeHabit(
      context.params.habitId,
      date ? new Date(date) : undefined
    );

    return NextResponse.json(completion);
  } catch (error) {
    console.error("[HABIT_COMPLETION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { habitId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const habit = await prisma.habit.findUnique({
      where: { id: context.params.habitId },
    });

    if (!habit || habit.userId !== userId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const url = new URL(request.url);
    const date = url.searchParams.get("date");

    await uncompleteHabit(
      context.params.habitId,
      date ? new Date(date) : undefined
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[HABIT_COMPLETION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
