const pineconeKey = process.env.PINECONE_API_KEY;

if (!pineconeKey) {
  throw new Error("Missing env: PINECONE_API_KEY");
}

import { Pinecone } from "@pinecone-database/pinecone";

export const pc = new Pinecone({
  apiKey: pineconeKey,
});
