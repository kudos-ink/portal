import { sanitizeUrl } from "@/utils/url";
import APIClient from "@/api/client";

const CORE_API_URL = sanitizeUrl(process.env.API_URL || "");
export const coreApiClient = new APIClient(CORE_API_URL);
