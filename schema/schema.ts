import {
  pgTable,
  foreignKey,
  serial,
  text,
  vector,
  timestamp,
  bigint,
  bigserial,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const documents = pgTable(
  "documents",
  {
    id: serial("id").primaryKey().notNull(),
    title: text("title").notNull().default("title"),
    body: text("body").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }),
    createdAt: timestamp("created_at", {
      precision: 6,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    proposalId: bigint("proposalId", { mode: "number" }),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      documentsProposalIdFkey: foreignKey({
        columns: [table.proposalId],
        foreignColumns: [proposal.id],
        name: "documents_proposalId_fkey",
      })
        .onUpdate("cascade")
        .onDelete("set null"),
    };
  },
);

export const proposal = pgTable("Proposal", {
  id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
  uuid: text("uuid").notNull().default(crypto.randomUUID()),
  name: text("name").default("proposal").notNull(),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true,
    mode: "string",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    withTimezone: true,
    mode: "string",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
