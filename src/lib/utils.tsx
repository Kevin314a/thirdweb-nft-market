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

export function shortenString(str: string, len: number) {
  if (!str || str.length <= len) {
    return str;
  }

  return str.substring(0, len).concat('...');
}

export function getDateTimeAfter(date: Date | null, days: number | undefined, hours: number | undefined, mins: number | undefined) : Date {
  // const parsedDays = isNaN(Number(days)) ? 0 : Number(days);
  // const parsedHours = isNaN(Number(hours)) ? 0 : Number(hours);
  // const parsedMins = isNaN(Number(mins)) ? 0 : Number(mins);

  const parsedDays = !days ? 0 : days;
  const parsedHours = !hours ? 0 : hours;
  const parsedMins = !mins ? 0 : mins;

  const addedTime = parsedDays * 24 * 60 * 60 * 1000 + parsedHours * 60 * 60 * 1000 + parsedMins * 60 * 1000;

  const vDate = !date ? new Date() : date;
  const newDate = new Date(vDate.getTime() + addedTime);
  return newDate;
}

export function formatDate(date: Date): string {
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
  const gmtOffset = `GMT${timezoneOffset >= 0 ? '+' : '-'}${String(offsetHours).padStart(2, '0')}${String(offsetMinutes).padStart(2, '0')}`;

  // Combine formatted date and GMT offset
  return `${formattedDate} ${gmtOffset}`;
}