'use client'

import * as React from "react";
import { Tab as HUTab } from "@headlessui/react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const TabVariants = cva(
  "inline-block outline-none py-2 px-4 text-base font-medium",
  {
    variants: {
      variant: {
        default: "bg-bg-btn data-[selected]:bg-golden-1000 text-white rounded-lg",
        outline: "bg-transparent text-golden-1000 hover:text-golden-1400 border-none data-[selected]:border-solid data-[selected]:border-b-2 data-[selected]:border-b-golden-1000",
      },
      size: {
        default: "p-[7px] px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Tab = React.forwardRef<
  React.ElementRef<typeof HUTab>,
  React.ComponentPropsWithoutRef<typeof HUTab> &
  VariantProps<typeof TabVariants>
>(({ className, variant, size, ...props }, ref) => (
  <HUTab
    ref={ref}
    className={cn(TabVariants({ variant, size, className }))}
    {...props}
  />
));

Tab.displayName = "Tab";

export { Tab };
