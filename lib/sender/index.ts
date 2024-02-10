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
    const { success, message } = await response.json();

    if (response.ok && success) {
      return true;
    } else {
      console.error("error adding the email: ", message);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
