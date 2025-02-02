"use client";

import { useRef } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { Check, Edit, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitSwipeActionsProps {
  onComplete: () => void;
  onEdit: () => void;
  onDelete?: () => void;
  isCompleted?: boolean;
  children: React.ReactNode;
}

export function HabitSwipeActions({
  onComplete,
  onEdit,
  onDelete,
  isCompleted,
  children,
}: HabitSwipeActionsProps) {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      // Swiped left - edit
      await controls.start({ x: -100 });
      onEdit();
      controls.start({ x: 0 });
    } else if (offset > 50 || velocity > 500) {
      // Swiped right - complete/uncomplete
      await controls.start({ x: 100 });
      onComplete();
      controls.start({ x: 0 });
    } else {
      // Reset position
      controls.start({ x: 0 });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg touch-pan-y">
      {/* Background actions */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <div className="flex h-12 items-center rounded-lg bg-primary/10 px-4">
          <div className="flex items-center gap-2 text-primary">
            <Edit className="h-5 w-5" />
            <span className="text-sm font-medium">Edit</span>
          </div>
        </div>
        <div
          className={cn(
            "flex h-12 items-center rounded-lg px-4",
            isCompleted
              ? "bg-destructive/10 text-destructive"
              : "bg-emerald-500/10 text-emerald-500"
          )}
        >
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <>
                <X className="h-5 w-5" />
                <span className="text-sm font-medium">Uncomplete</span>
              </>
            ) : (
              <>
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">Complete</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Swipeable content */}
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="relative touch-pan-y bg-background"
      >
        {children}
      </motion.div>
    </div>
  );
}
