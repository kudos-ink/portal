export async function safeFetch<T>(
  fetchFn: () => Promise<T>,
  context: string,
  fallback: T ,
  additionalInfo?: any
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    logError(context, error, additionalInfo);
    return fallback;
  }
}

// Utility function to improve error logging
export function logError(context: string, error: any, additionalInfo?: any) {
  console.error(`[Error in ${context}]`, error);
  if (additionalInfo) {
    console.error("Additional Info:", additionalInfo);
  }
}
