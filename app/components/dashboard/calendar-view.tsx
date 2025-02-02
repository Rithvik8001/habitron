"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Habit, Completion } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

type HabitWithCompletions = Habit & {
  completions: Completion[];
};

interface CalendarViewProps {
  habits: HabitWithCompletions[];
}

export function CalendarView({ habits }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  // Get the first day of the month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get the day of the week for the first day (0 = Sunday)
  const firstDayWeekday = firstDayOfMonth.getDay();

  // Calculate total days in the grid (including padding)
  const daysInGrid = Array.from(
    { length: 42 }, // 6 rows * 7 days
    (_, i) => {
      const date = new Date(firstDayOfMonth);
      date.setDate(date.getDate() + (i - firstDayWeekday));
      return date;
    }
  );

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return date > today;
  };

  const getHabitsForDate = (date: Date) => {
    return habits.filter((habit) =>
      habit.completions.some((c) => {
        const completionDate = new Date(c.date);
        return completionDate.toDateString() === date.toDateString();
      })
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="flex h-8 items-center justify-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
        {daysInGrid.map((date, i) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const habitsForDate = getHabitsForDate(date);
          const hasHabits = habitsForDate.length > 0;

          return (
            <Button
              key={i}
              variant="ghost"
              className={cn(
                "h-12 hover:bg-muted",
                !isCurrentMonth && "text-muted-foreground opacity-50",
                isToday(date) && "bg-accent",
                hasHabits && "bg-emerald-500/20"
              )}
              onClick={() => setSelectedDate(date)}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm">{date.getDate()}</span>
                {hasHabits && (
                  <div className="mt-1 h-1 w-1 rounded-full bg-emerald-500" />
                )}
              </div>
            </Button>
          );
        })}
      </div>

      <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDate?.toLocaleDateString("default", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </DialogTitle>
            <DialogDescription>
              View completed habits for this day.
            </DialogDescription>
          </DialogHeader>
          {selectedDate && (
            <div className="space-y-4">
              {isFutureDate(selectedDate) ? (
                <div className="flex flex-col items-center justify-center space-y-2 py-4">
                  <div className="rounded-full bg-secondary p-3">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    This day hasn&apos;t arrived yet. Check back on{" "}
                    {selectedDate.toLocaleDateString("default", {
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    to track your habits.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="font-medium">Completed Habits</h3>
                  {getHabitsForDate(selectedDate).length > 0 ? (
                    <ul className="space-y-1">
                      {getHabitsForDate(selectedDate).map((habit) => (
                        <li
                          key={habit.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="flex items-center gap-2 rounded-lg border px-3 py-2 w-full">
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span>{habit.name}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No habits completed on this day
                    </p>
                  )}
                </div>
              )}
              {isToday(selectedDate) && (
                <div className="flex justify-center">
                  <Button onClick={() => router.push("/habits")}>
                    View All Habits
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
