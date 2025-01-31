import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-white hover:bg-foreground/90 hover:scale-[0.98] active:scale-[0.97]",
        primary:
          "bg-primary text-white hover:bg-primary/90 hover:scale-[0.98] active:scale-[0.97]",
        secondary:
          "bg-secondary text-white hover:bg-secondary/90 hover:scale-[0.98] active:scale-[0.97]",
        outline:
          "border-2 border-foreground bg-transparent hover:bg-foreground/5 hover:scale-[0.98] active:scale-[0.97]",
        ghost:
          "bg-transparent hover:bg-foreground/5 hover:scale-[0.98] active:scale-[0.97]",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
