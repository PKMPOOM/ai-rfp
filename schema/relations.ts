import { relations } from "drizzle-orm/relations";
import { proposal, documents } from "./schema";

export const documentsRelations = relations(documents, ({one}) => ({
	proposal: one(proposal, {
		fields: [documents.proposalId],
		references: [proposal.id]
	}),
}));

export const proposalRelations = relations(proposal, ({many}) => ({
	documents: many(documents),
}));