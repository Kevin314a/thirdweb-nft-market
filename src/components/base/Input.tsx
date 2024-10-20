'use client'

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full text-white hover:border-golden-1000 focus:border-golden-1000 outline-none font-poppins font-normal py-2 placeholder:text-gray-1000 border border-golden-1300 rounded-lg bg-golden-1300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
