import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HabitFrequency } from "@prisma/client";
import { createHabit } from "@/lib/api";
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

interface CreateHabitFormProps {
  onSuccess?: () => void;
}

export function CreateHabitForm({ onSuccess }: CreateHabitFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const frequency = formData.get("frequency") as HabitFrequency;

      await createHabit({
        name,
        description,
        frequency,
      });

      queryClient.invalidateQueries({ queryKey: ["habits"] });
      formRef.current?.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create habit:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
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
          placeholder="Do a 30-minute workout"
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency</Label>
        <Select name="frequency" defaultValue={HabitFrequency.DAILY} required>
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
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Habit"}
      </Button>
    </form>
  );
}
