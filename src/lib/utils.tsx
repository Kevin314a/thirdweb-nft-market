import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { orderNumberPrefix } from "./constants";
import { formatRelative } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleInputQuantity(
  e: React.FocusEvent<HTMLInputElement, Element>,
  setQuantity: React.Dispatch<React.SetStateAction<string | number>>,
  defaultFallbackQuantity?: number
) {
  if (Number(e.target.value) < 1 || isNaN(Number(e.target.value))) {
    setQuantity(defaultFallbackQuantity ?? 1);
    return;
  }
  setQuantity(() => Number(e.target.value.split(".")[0]));
}

export function convertSecondsToDate(seconds: number) {
  const time = new Date(Date.UTC(1970, 0, 1)); // Epoch
  time.setUTCSeconds(seconds);
  return time;
}

export function convertDateToRelativeTime(date: Date) {
  const relativeDate = formatRelative(date, new Date());
  return relativeDate[0].toUpperCase() + relativeDate.slice(1);
}

export function formatOrderNumber(id: number) {
  return `#${orderNumberPrefix + id.toString()}`;
}

export function removeOrderNumberFormatting(id: number) {
  return Number(String(id).split(String(orderNumberPrefix))[1]);
}

export function shortenString(str: string | undefined, len: number) {
  if (!str) {
    return "";
  }

  if (!!str && str.length <= len) {
    return str;
  }

  return str.substring(0, len).concat('...');
}

export function getDateTimeAfter(date: Date | null, days: string, hours: string, mins: string): Date {
  const parsedDays = isNaN(Number(days)) ? 0 : Number(days);
  const parsedHours = isNaN(Number(hours)) ? 0 : Number(hours);
  const parsedMins = isNaN(Number(mins)) ? 0 : Number(mins);

  // const parsedDays = !days ? 0 : days;
  // const parsedHours = !hours ? 0 : hours;
  // const parsedMins = !mins ? 0 : mins;

  const addedTime = parsedDays * 24 * 60 * 60 * 1000 + parsedHours * 60 * 60 * 1000 + parsedMins * 60 * 1000;

  const vDate = !date ? new Date() : date;
  const newDate = new Date(vDate.getTime() + addedTime);
  return newDate;
}

export function formatDate(date: Date, short: boolean = true): string {
  // Define options for date formatting
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format with AM/PM
  };

  // Format the date to a more readable string
  const formattedDate = date.toLocaleString('en-US', options);

  // Get the timezone offset in hours and minutes
  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;

  // Construct the GMT offset string
  const gmtOffset = ` GMT${timezoneOffset >= 0 ? '+' : '-'}${String(offsetHours).padStart(2, '0')}${String(offsetMinutes).padStart(2, '0')}`;

  // Combine formatted date and GMT offset
  return `${formattedDate}${short ? '' : gmtOffset}`;
}

export function formatDateStageDuration(days: string, hours: string, mins: string): string {
  return ((!days ? "" : days.concat(" Days "))
    .concat(!hours ? "" : hours.concat(" Hours ")))
    .concat(!mins ? "" : mins.concat(" Mins "));
}

export function formatDateIntl(timestamp: number) {
  // Output: "Oct, 2024" (for the current date)
  const date = new Date(timestamp <= 0 ? (Date.now()) : timestamp);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric"
  }).format(date);
  return formattedDate;
}

export function royaltyBpsToBigInt(royaltyPercentage: number) {
  const scaleFactor = 1000; // Scale factor for 3 decimal places
  return BigInt(Math.round(royaltyPercentage * scaleFactor));
}

export const isValidBigInt = (value: string | undefined, required: boolean): boolean => {
  if (!value) {
    return !required;
  }
  // Check for valid integer pattern, allowing optional leading "-" for negative numbers
  const integerPattern = /^-?\d+$/;
  return integerPattern.test(value);
};

export const isValidNumber = (value: string | undefined, required: boolean): boolean => {
  if (!value) {
    return !required;
  }
  const floatPattern = /^-?\d*\.?\d*$/;
  return floatPattern.test(value);
};

export const isNotOverMin = (value: string | undefined, minValue: number): boolean => {
  if (!value) {
    return true;
  }
  const v = Number(value);
  return isNaN(v) || v >= minValue;
};

export const isNotOverMax = (value: string | undefined, maxValue: number): boolean => {
  if (!value) {
    return true;
  }
  const v = Number(value);
  return isNaN(v) || v <= maxValue;
};

export const toNumber = (value: string): number => {
  const num = Number(value); // Convert string to a number
  return isNaN(num) ? 0 : num; // Check if conversion was successful
};

export const parseRemainTime = (duration: number): { remainDays: number, remainHours: number, remainMins: number, remainSecs: number, isPast: boolean } => {
  const currentTime = Date.now();

  const difference = (duration - currentTime < 0) ? currentTime - duration : duration - currentTime;
  const isPast = (duration - currentTime < 0) ? true : false;

  const totalSeconds = Math.floor(difference / 1000); // Total seconds
  const days = Math.floor(totalSeconds / (60 * 60 * 24)); // Days
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)); // Hours
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60); // Minutes
  const seconds = totalSeconds % 60; // Remaining seconds

  return { remainDays: days, remainHours: hours, remainMins: minutes, remainSecs: seconds, isPast };
};

export const makeBotAddress = () => {
  const currentTime = Date.now();

  const twinedv = '0x1' + currentTime.toString() + currentTime.toString() + currentTime.toString();
  return twinedv;
};

export const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const formatToPowerNotation = (strnumber: string) => {
  const num = Number(strnumber);
  if (num > 0.0000001) {
    return num;
  }
  const exponent = num.toExponential().split("e")[1];
  return `10^${exponent}`;
};