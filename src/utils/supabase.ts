import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wwkjuyyjddyeiplwylal.supabase.co";
const supabaseKey = process.env.SUPABASE_PUBLIC_ANON_KEY;

if (!supabaseKey) {
  throw new Error("Missing env: SUPABASE_PUBLIC_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const performVectorSearch = (vector: number[]) => {
  // query_embedding vector(384),
  // match_threshold float,
  // match_count int
  return supabase.rpc("vector_search", {
    query_embedding: vector,
    match_threshold: 0.7,
    match_count: 5,
  });
};

// reference function
// create or replace function vector_search (
//   query_embedding vector(384),
//   match_threshold float,
//   match_count int
// )
// returns table (
//   id bigint,
//   title text,
//   body text,
//   similarity float
// )
// language sql stable
// as $$
//   select
//     Document.id,
//     Document.title,
//     Document.body,
//     1 - (Document.embeddeds <=> query_embedding) as similarity
//   from Document
//   where 1 - (Document.embeddeds <=> query_embedding) > match_threshold
//   order by (Document.embeddeds <=> query_embedding) asc
//   limit match_count;
// $$;
