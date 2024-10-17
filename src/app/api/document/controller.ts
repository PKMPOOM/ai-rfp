import { db } from "@/utils/drizzle";
import { proposal } from "../../../../schema/schema";

const saveProposal = async (name: string) => {
  await db.insert(proposal).values({
    name,
  });
};

export const documentController = {
  saveDocument: saveProposal,
};
