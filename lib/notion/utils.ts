import { ValidNotionResponse } from "./types";

export function isValidNotionPage(object: any): object is ValidNotionResponse {
  return object && object.object === "page" && "properties" in object;
}
