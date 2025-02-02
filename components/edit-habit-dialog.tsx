import { type Habit } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditHabitForm } from "@/components/edit-habit-form";
import { useState } from "react";
import { Settings2 } from "lucide-react";

interface EditHabitDialogProps {
  habit: Habit;
  id?: string;
}

export function EditHabitDialog({ habit, id }: EditHabitDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" id={id}>
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit habit</DialogTitle>
          <DialogDescription>
            Make changes to your habit. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <EditHabitForm habit={habit} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
