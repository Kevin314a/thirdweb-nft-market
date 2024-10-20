'use client'

import * as React from "react";
import { Label as HULabel } from "@headlessui/react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof HULabel>,
  React.ComponentPropsWithoutRef<typeof HULabel> &
  VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <HULabel
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
