import { db } from "@/utils/drizzle";
import { appAI } from "@/utils/openai";
import { NextResponse } from "next/server";
import { documents } from "../../../../schema/schema";

export async function POST(req: Request) {
  const { body, title } = await req.json();
  try {
    const { embedding } = await appAI.createEmbedding(title + body);

    await db.insert(documents).values({
      body,
      title,
      embedding,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function GET(req: Request) {
  const data = await db.query.proposal.findFirst({
    where: (data, { eq }) => eq(data.name, "test"),
    with: {
      documents: {
        columns: {
          id: true,
          title: true,
          body: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  const bigIntFix = JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );

  return NextResponse.json(bigIntFix);
}
