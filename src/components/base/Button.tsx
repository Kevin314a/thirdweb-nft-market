'use client'

import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "text-sm whitespace-nowrap transition-all ease-out duration-500 font-semibold inline-flex justify-center items-center border border-golden-1000 gap-2 disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-golden-1000 hover:bg-golden-1100 text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        destructiveOutline:
          "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
        outline:
          "bg-transparent hover:bg-golden-1000 hover:text-white text-golden-1000",
        secondary:
          "bg-golden-1200 hover:bg-gray-700 text-white",
      },
      size: {
        default: "rounded-lg p-[7px] px-3",
        sm: "py-1 px-3",
        lg: "rounded-md px-8 ",
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
