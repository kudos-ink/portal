import { sanitizeUrl } from "@/utils/url";
import APIClient from "@/api/client";

const CONFIG_API_URL = sanitizeUrl(
  process.env.PROJECT_CLASSIFICATION_URL || "",
);
export const configApiClient = new APIClient(CONFIG_API_URL);
