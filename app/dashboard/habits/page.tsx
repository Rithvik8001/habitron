"use client";

import { useHabits } from "@/hooks/use-habits";
import { useHabitCompletion } from "@/hooks/use-habit-completion";
import { CreateHabitDialog } from "@/components/create-habit-dialog";
import { EditHabitDialog } from "@/components/edit-habit-dialog";
import { formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock, Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { HabitSwipeActions } from "@/components/habit-swipe-actions";
import { cn } from "@/lib/utils";

export default function HabitsPage() {
  const { habits, isLoading, getCompletionsForDate } = useHabits();
  const {
    completeHabit,
    uncompleteHabit,
    isLoading: isCompletionLoading,
  } = useHabitCompletion();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">My Habits</h1>
        <CreateHabitDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Habits</CardTitle>
          <CardDescription>
            Manage and track your habits. Click on a habit to view more details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {habits?.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center space-y-3 rounded-lg border border-dashed p-8 text-center">
              <div className="text-sm text-muted-foreground">
                No habits created yet
              </div>
              <CreateHabitDialog />
            </div>
          ) : (
            <>
              {/* Desktop view */}
              <div className="hidden sm:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%]">Name</TableHead>
                      <TableHead className="w-[15%]">Frequency</TableHead>
                      <TableHead className="w-[20%]">Last Completed</TableHead>
                      <TableHead className="w-[15%]">
                        Today&apos;s Status
                      </TableHead>
                      <TableHead className="w-[20%] text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {habits?.map((habit) => {
                      const lastCompletion = habit.completions
                        .map((c) => new Date(c.date))
                        .sort((a, b) => b.getTime() - a.getTime())[0];
                      const isCompletedToday = getCompletionsForDate(
                        habit.id,
                        new Date()
                      );

                      return (
                        <TableRow key={habit.id}>
                          <TableCell className="font-medium">
                            <div>{habit.name}</div>
                            {habit.description && (
                              <div className="text-sm text-muted-foreground">
                                {habit.description}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{habit.frequency}</Badge>
                          </TableCell>
                          <TableCell>
                            {lastCompletion ? (
                              formatRelativeTime(lastCompletion)
                            ) : (
                              <span className="text-muted-foreground">
                                Never
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isCompletedToday ? (
                              <div className="flex items-center text-emerald-500">
                                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                                <span className="hidden sm:inline">
                                  Completed
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center text-muted-foreground">
                                <XCircle className="mr-1.5 h-4 w-4" />
                                <span className="hidden sm:inline">
                                  Not Completed
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex flex-col sm:flex-row items-center justify-end gap-2">
                              <Button
                                variant={
                                  isCompletedToday ? "destructive" : "default"
                                }
                                disabled={isCompletionLoading}
                                onClick={() => {
                                  if (isCompletedToday) {
                                    uncompleteHabit({ habitId: habit.id });
                                  } else {
                                    completeHabit({ habitId: habit.id });
                                  }
                                }}
                                className="w-full sm:w-auto"
                              >
                                {isCompletedToday ? "Uncomplete" : "Complete"}
                              </Button>
                              <EditHabitDialog habit={habit} />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view */}
              <div className="sm:hidden space-y-3">
                {habits?.map((habit) => {
                  const lastCompletion = habit.completions
                    .map((c) => new Date(c.date))
                    .sort((a, b) => b.getTime() - a.getTime())[0];
                  const isCompletedToday = getCompletionsForDate(
                    habit.id,
                    new Date()
                  );

                  return (
                    <div
                      key={habit.id}
                      className="rounded-lg border bg-card p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate pr-2">
                            {habit.name}
                          </div>
                          {habit.description && (
                            <div className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                              {habit.description}
                            </div>
                          )}
                          <div className="mt-1.5 flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {habit.frequency}
                            </Badge>
                            <span className="text-xs text-muted-foreground truncate">
                              {lastCompletion
                                ? formatRelativeTime(lastCompletion)
                                : "Never completed"}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {isCompletedToday ? (
                            <div className="flex items-center text-emerald-500">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                          ) : (
                            <div className="flex items-center text-muted-foreground">
                              <Circle className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t">
                        <Button variant="ghost" size="sm" onClick={() => {}}>
                          Edit
                        </Button>
                        <Button
                          variant={isCompletedToday ? "destructive" : "default"}
                          size="sm"
                          disabled={isCompletionLoading}
                          onClick={() => {
                            if (isCompletedToday) {
                              uncompleteHabit({ habitId: habit.id });
                            } else {
                              completeHabit({ habitId: habit.id });
                            }
                          }}
                        >
                          {isCompletedToday ? "Uncomplete" : "Complete"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
