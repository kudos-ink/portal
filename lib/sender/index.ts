export async function addEmail(email: string): Promise<boolean> {
  const url = new URL(process.env.SENDER_URL!);

  let headers = {
    Authorization: "Bearer " + process.env.SENDER_API_KEY!,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  try {
    const { success } = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
      }),
    }).then((response) => response.json());
    return success;
  } catch (error) {
    console.error("Error adding email:", error);
    return false;
  }
}
