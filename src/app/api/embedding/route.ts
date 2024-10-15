import { db } from "@/utils/drizzle";
import { appAI } from "@/utils/openai";
import { NextResponse } from "next/server";
import { documents } from "../../../../schema/schema";

export async function POST(req: Request) {
  const { body, title, proposalId } = await req.json();
  try {
    const { embedding } = await appAI.createEmbedding(title + body);

    await db.insert(documents).values({
      body,
      title,
      embedding,
      proposalId,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
