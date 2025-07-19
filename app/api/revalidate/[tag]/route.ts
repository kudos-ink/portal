import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(_: NextRequest, props: { params: Promise<{ tag: string }> }) {
  const params = await props.params;
  const tag = params.tag;
  revalidateTag(tag);

  // return NextResponse.json({ revalidated: tag });
}
