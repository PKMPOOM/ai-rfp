import { db } from "@/utils/drizzle";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { documents } from "../../../../schema/schema";

export const vectorSearch = async (embedding: any) => {
  try {
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
      .where(gt(similarity, 0.75))
      .orderBy((t) => desc(t.similarity))
      .limit(3);

    return similar;
  } catch (error) {
    console.log(error);
    throw new Error("Error in getVector");
  }
};
