import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { updateHabit, deleteHabit } from "@/lib/habits";
import { HabitFrequency } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: { habitId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, description, frequency } = body;

    if (
      !name ||
      !frequency ||
      !Object.values(HabitFrequency).includes(frequency)
    ) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const habit = await updateHabit(params.habitId, {
      name,
      description,
      frequency,
    });

    return NextResponse.json(habit);
  } catch (error) {
    console.error("[HABIT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { habitId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await deleteHabit(params.habitId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[HABIT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
