import { NextApiRequest, NextApiResponse } from "next";

export const runtime = "nodejs";
export const maxDuration = 60; // This function can run for a maximum of 60 seconds
// This is required to enable streaming
export const dynamic = "force-dynamic";

// curl -Nv localhost:3000/api/sse
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");

  for (let i = 0; i < 5; i++) {
    res.write(`data: Hello seq ${i}\n\n`);
    // await sleep(1000);
  }
  res.end("done\n");
}
