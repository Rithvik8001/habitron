import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateHabitForm } from "@/components/create-habit-form";
import { useState } from "react";
import { Plus } from "lucide-react";

export function CreateHabitDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Habit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new habit</DialogTitle>
          <DialogDescription>
            Add a new habit to track. Make it specific and actionable.
          </DialogDescription>
        </DialogHeader>
        <CreateHabitForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
