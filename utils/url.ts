import { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (
  key: string,
  value: string | null | undefined,
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const keyLowerCase = key.toLowerCase();
  const searchParams = new URLSearchParams(params.toString());
  if (value) {
    searchParams.set(keyLowerCase, value.toString());
  } else {
    searchParams.delete(keyLowerCase);
  }

  const newParams = searchParams.toString();
  const queryString = `${newParams.length ? "?" : ""}${newParams}`;
  const url = `${pathname}${queryString}`;
  return url;
};
