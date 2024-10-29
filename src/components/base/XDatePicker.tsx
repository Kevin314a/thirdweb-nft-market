'use client'

import * as React from "react";
import DatePicker from "react-datepicker";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerVariants = cva(
  "inline-block outline-none py-2 px-4 text-base font-medium",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex items-center border border-golden-1300 rounded-lg bg-golden-1300 text-white hover:border-golden-1000 focus:border-golden-1000 relative xxl:max-w-[507px] lg:max-w-[330px] w-full",
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
);

const XDatePicker = React.forwardRef<
  React.ElementRef<typeof DatePicker>,
  React.ComponentPropsWithoutRef<typeof DatePicker> &
  VariantProps<typeof DatePickerVariants> &
  {
    xDate: Date | null,
    onChangeDate: (d: Date | null) => void,
  }
>(({ className, variant, size, xDate, onChangeDate, ...props }, ref) => (
  <DatePicker
    selected={xDate}
    onChange={(d) => onChangeDate(d)}
    showTimeSelect
    timeFormat="hh:mm aa"  // This sets the time format to 12-hour with AM/PM
    timeIntervals={15}
    dateFormat="MMMM d, yyyy h:mm aa"
    className={cn(DatePickerVariants({ variant, size, className }))}
  />
));

XDatePicker.displayName = "XDatePicker";

export { XDatePicker };
