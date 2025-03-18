import { db } from "@/utils/drizzle";
import { NextResponse } from "next/server";
import { documents } from "../../../../schema/schema";
import { appAI } from "@/utils/openai";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
    console.log("GET ACTION CALL");

    // const data = await db.select().from(documents)

    // for (const doc of data) {
    //     const { embedding } = await appAI.createEmbedding(doc.title + doc.body);
    //     await db.update(documents).set({ embedding: embedding }).where(eq(documents.id, doc.id));
    // }


    return NextResponse.json({ status: 200 });
}