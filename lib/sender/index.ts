export async function addEmail(email: string): Promise<boolean> {
  const url = new URL(process.env.SENDER_URL!);

  let headers = {
    Authorization: "Bearer " + process.env.SENDER_API_KEY!,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}
