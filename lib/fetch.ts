type Options = {
  tag?: string;
  noStoreCache?: boolean;
};

export async function fetchData<T>(
  url: string,
  options: Options = {},
): Promise<T> {
  try {
    const { tag, noStoreCache } = options;
    const response = await fetch(url, {
      ...(tag ? { next: { tags: [tag] } } : {}),
      ...(noStoreCache ? { cache: "no-store" } : {}),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
