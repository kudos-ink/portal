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
