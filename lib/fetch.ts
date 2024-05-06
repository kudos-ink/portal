export async function fetchData<T>(url: string, tag: string): Promise<T> {
  try {
    const response = await fetch(url, { next: { tags: [tag] } });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
