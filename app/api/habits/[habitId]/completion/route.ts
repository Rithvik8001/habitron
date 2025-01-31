import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { completeHabit, uncompleteHabit } from "@/lib/habits";
import { prisma } from "@/lib/db";

type RouteContext = {
  params: {
    habitId: string;
  };
};

export async function POST(
  req: NextRequest,
  context: RouteContext
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

    const body = await req.json();
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
  req: NextRequest,
  context: RouteContext
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

    const { searchParams } = req.nextUrl;
    const date = searchParams.get("date");

    await uncompleteHabit(context.params.habitId, date ? new Date(date) : undefined);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[HABIT_COMPLETION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
