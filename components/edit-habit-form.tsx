import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HabitFrequency, type Habit } from "@prisma/client";
import { updateHabit, deleteHabit } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EditHabitFormProps {
  habit: Habit;
  onSuccess?: () => void;
}

export function EditHabitForm({ habit, onSuccess }: EditHabitFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const queryClient = useQueryClient();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const frequency = formData.get("frequency") as HabitFrequency;

      await updateHabit(habit.id, {
        name,
        description,
        frequency,
      });

      queryClient.invalidateQueries({ queryKey: ["habits"] });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to update habit:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete() {
    setIsLoading(true);

    try {
      await deleteHabit(habit.id);
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to delete habit:", error);
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={habit.name}
          placeholder="Exercise"
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={habit.description || ""}
          placeholder="Do a 30-minute workout"
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select name="frequency" defaultValue={habit.frequency} required>
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={HabitFrequency.DAILY}>Daily</SelectItem>
            <SelectItem value={HabitFrequency.WEEKLY}>Weekly</SelectItem>
            <SelectItem value={HabitFrequency.MONTHLY}>Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between pt-2">
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive" disabled={isLoading}>
              Delete Habit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                habit and all its completion records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
