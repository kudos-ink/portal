import { addEmail } from "@/lib/sender";
import { NextRequest, NextResponse } from "next/server";
import isEmail from "is-email";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email is missing" }, { status: 400 });
  }
  if (isEmail(email)) {
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
