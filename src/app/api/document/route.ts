import { db } from "@/utils/drizzle";
import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { documents, proposal } from "../../../../schema/schema";
import { documentController } from "./controller";

export async function POST(req: Request) {
  const { name } = await req.json();
  try {
    await documentController.saveDocument(name);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}

export async function GET() {
  try {
    console.log("GET PROPOSAL");

    const proposalList = await db
      .select({
        id: proposal.id,
        title: proposal.name,
        create_at: proposal.createdAt,
        update_at: proposal.updatedAt,
        uuid: proposal.uuid,
        documents: count(documents.id),
      })
      .from(proposal)
      .leftJoin(documents, eq(proposal.id, documents.proposalId))
      .groupBy(proposal.id)
      .orderBy(proposal.createdAt);

    return NextResponse.json(proposalList);
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
