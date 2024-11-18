import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../schema/schema";
import * as relations from "../../schema/relations";

import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool, { schema: { ...schema, ...relations } });
