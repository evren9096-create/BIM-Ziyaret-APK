import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[transform,background-color,box-shadow,opacity,color] duration-150 ease-out select-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 active:not-disabled:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-fg shadow-sm hover:bg-primary-hover",
        ink: "bg-ink text-primary-fg shadow-sm hover:bg-ink-2",
        secondary:
          "bg-surface-2 text-fg hover:bg-border",
        outline:
          "border border-border bg-surface text-fg hover:bg-surface-2",
        ghost: "text-fg hover:bg-surface-2",
        whatsapp: "bg-wa text-primary-fg hover:bg-wa-hover",
        history: "bg-history text-primary-fg hover:bg-history-hover",
        destructive: "bg-primary text-primary-fg hover:bg-primary-hover",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3 text-[13px] rounded-md",
        lg: "h-12 px-5",
        icon: "size-11",
        chip: "h-10 px-3 text-[13px]",
        compact: "h-6 px-1.5 text-[10px] gap-0.5 rounded [&_svg]:size-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
