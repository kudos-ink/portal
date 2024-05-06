import { NextRequest, NextResponse } from "next/server";
import { getProjectInfos } from "@/lib/config/projects";
import { errorHandler } from "@/middlewares/error";

const handleGet = async (
  _: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const slug = params.slug;
  const project = await getProjectInfos(slug);
  return NextResponse.json({ data: project });
};

export const GET = errorHandler(handleGet);
