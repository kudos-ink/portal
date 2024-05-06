import { NextRequest, NextResponse } from "next/server";

export function errorHandler(handler: Function) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error: any) {
      console.error("An error occurred:", error);
      return NextResponse.json(
        {
          error: error.message || "An unexpected error occurred",
        },
        {
          status: error.statusCode || 500,
        },
      );
    }
  };
}
