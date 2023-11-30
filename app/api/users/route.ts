import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Since we will not receive any arguments in this api, but again using request: NextRequest to avoid caching of the output of this endpoint
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(users);
}
