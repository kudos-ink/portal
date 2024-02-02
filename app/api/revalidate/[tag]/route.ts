import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getTags } from "@/utils/cache";

export async function POST(
  _: NextRequest,
  { params }: { params: { tag: string } },
) {
  const tag = params.tag;

  if (!getTags().includes(tag)) {
    return NextResponse.json({ error: "Invalid tag" }, { status: 400 });
  }
  revalidateTag(tag);

  return NextResponse.json({ revalidated: tag });
}
