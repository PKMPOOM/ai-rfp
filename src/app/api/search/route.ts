import { db } from "@/utils/drizzle";
import { appAI } from "@/utils/openai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { documents } from "../../../../schema/schema";
import { vectorSearch } from "./utils";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ status: 400, error: "query is required" });
  }

  // embeding query using openai
  const { embedding } = await appAI.createEmbedding(query);

  const data = await vectorSearch(embedding);

  return NextResponse.json(
    {
      data,
    },
    { status: 200 },
  );
}
