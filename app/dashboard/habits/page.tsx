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
import { CheckCircle2, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Habits</h1>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Last Completed</TableHead>
                  <TableHead>Today&apos;s Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell>
                        <div>
                          <div className="font-medium">{habit.name}</div>
                          {habit.description && (
                            <div className="text-sm text-muted-foreground">
                              {habit.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{habit.frequency}</Badge>
                      </TableCell>
                      <TableCell>
                        {lastCompletion ? (
                          formatRelativeTime(lastCompletion)
                        ) : (
                          <span className="text-muted-foreground">Never</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isCompletedToday ? (
                          <div className="flex items-center text-emerald-500">
                            <CheckCircle2 className="mr-1.5 h-4 w-4" />
                            Completed
                          </div>
                        ) : (
                          <div className="flex items-center text-muted-foreground">
                            <XCircle className="mr-1.5 h-4 w-4" />
                            Not Completed
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
