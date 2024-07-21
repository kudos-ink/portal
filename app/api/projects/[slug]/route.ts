import { NextRequest, NextResponse } from "next/server";
import ConfigApi from "@/api/config/api";
import { errorHandler } from "@/middlewares/error";

const handleGet = async (
  _: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const slug = params.slug;
  const project = await ConfigApi.getProjectInfos(slug);
  return NextResponse.json({ data: project });
};

export const GET = errorHandler(handleGet);
