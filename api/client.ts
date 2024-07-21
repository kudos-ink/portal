type Options = {
  tag?: string;
  noStoreCache?: boolean;
};

export default class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, options);
    if (!response.ok) {
      const error = new Error("HTTP Error") as any;
      error.status = response.status;
      error.response = await response.json();
      throw error;
    }
    return (await response.json()) as T;
  }

  public get<T>(url: string, options: Options = {}): Promise<T> {
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...(options.tag ? { next: { tags: [options.tag] } } : {}),
      ...(options.noStoreCache ? { cache: "no-store" } : {}),
    };
    return this.request<T>(url, fetchOptions);
  }

  public post<T, D>(url: string, data: D, options: Options = {}): Promise<T> {
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...(options.tag ? { next: { tags: [options.tag] } } : {}),
      ...(options.noStoreCache ? { cache: "no-store" } : {}),
    };
    return this.request<T>(url, fetchOptions);
  }
}
