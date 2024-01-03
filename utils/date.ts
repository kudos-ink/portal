import dayjs from "dayjs";

export function subtractMonths(date: Date, numberOfMonths: number): Date {
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() - numberOfMonths);
  return result;
}

export function daysSince(date: Date) {
  const currentDate = new Date();
  const givenDate = new Date(date);

  const differenceInTime = currentDate.getTime() - givenDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}

export const formatDate = (date: Date): string => {
  const now = dayjs();
  const targetDate = dayjs(date);
  const diff = targetDate.diff(now, "second");

  const sec = Math.abs(diff);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(sec / 3600);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 30.44); // Approximation for months
  const year = Math.floor(day / 365.25); // Approximation for leap years

  let value = sec;
  let unit = "s";

  if (min > 0 && min < 60) {
    value = min;
    unit = "m";
  } else if (hour > 0 && hour < 24) {
    value = hour;
    unit = "h";
  } else if (day > 0 && month < 12) {
    value = day;
    unit = "d";
  } else if (year > 0) {
    value = year;
    unit = "y";
  }

  return `${Math.floor(value)}${unit}`;
};
