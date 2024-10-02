import { db } from "@/utils/drizzle";
import { appAI } from "@/utils/openai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { documents } from "../../../../schema/schema";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ status: 400, error: "query is required" });
  }

  // embeding query using openai
  const { embedding } = await appAI.createEmbedding(query);

  // seach in db documents
  const similarity = sql<number>`1 - (${cosineDistance(documents.embedding, embedding)})`;
  const similar = await db
    .select({
      id: documents.id,
      title: documents.title,
      body: documents.body,
      similarity,
    })
    .from(documents)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(5);

  return NextResponse.json(
    {
      similar,
    },
    { status: 200 },
  );
}
