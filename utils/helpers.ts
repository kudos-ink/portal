export function subtractMonths(date: Date, numberOfMonths: number): Date {
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() - numberOfMonths);
  return result;
}
