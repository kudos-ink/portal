import { addEmail } from "@/lib/sender";
import { isValidEmail } from "@/utils/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (isValidEmail(email)) {
    const added = await addEmail(email);
    if (added) {
      return NextResponse.json({}, { status: 201 }); //TODO: fix, return empty
    } else {
      return NextResponse.json(
        { error: "Error adding the email" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
}
