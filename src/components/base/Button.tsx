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
          "bg-destructive text-destructive-foreground hover:bg-gray-700",
        destructiveOutline:
          "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
        outline:
          "bg-transparent hover:bg-golden-1000 hover:text-white text-golden-1000",
        secondary:
          "bg-golden-1200 hover:bg-gray-700 text-white",
        common:
          "bg-gray-600/[30%] text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-black/[80%] open:bg-black/[80%] focus:outline-1 focus:outline-white",
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
  VariantProps<typeof buttonVariants> { }

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

const SwiperLeftIcon = ({
  onPrev,
}: {
  onPrev: () => void,
}) => {
  return (
    <button
      onClick={onPrev}
      className="bg-golden-1000 text-white px-2.5 py-2 rounded-full hover:bg-golden-1100 transition absolute -translate-y-1/2 top-1/2 -left-4 z-10 duration-300"
    >
      <svg
        stroke="currentColor"
        className="-ml-1"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        color="#f5f3f7"
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
};

const SwiperRightIcon = ({
  onNext,
}: {
  onNext: () => void,
}) => {
  return (
    <button
      onClick={onNext}
      className="bg-golden-1000 text-white px-2.5 py-2 rounded-full hover:bg-golden-1100 transition duration-300 absolute -translate-y-1/2 top-1/2 -right-4 z-10 "
    >
      <svg
        stroke="currentColor"
        className="rotate-180 -mr-1"
        fill="none"
        strokeWidth={2}
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        color="#f5f3f7"
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
};

export { Button, buttonVariants, SwiperLeftIcon, SwiperRightIcon };
