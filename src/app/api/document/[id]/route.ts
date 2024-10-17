import { db } from "@/utils/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { proposal } from "../../../../../schema/schema";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await db.query.proposal.findFirst({
    where: (data, { eq }) => eq(data.id, parseInt(params.id)),
    with: {
      documents: {
        columns: {
          id: true,
          title: true,
          body: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: (doc, { desc }) => [desc(doc.createdAt)],
      },
    },
  });

  const bigIntFix = JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );

  return NextResponse.json({
    ...bigIntFix,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { name } = await req.json();

  await db
    .update(proposal)
    .set({
      name,
    })
    .where(eq(proposal.id, parseInt(params.id)));

  return NextResponse.json({ status: 200 });
}
