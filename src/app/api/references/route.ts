import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ id: "subject.id" }, { status: 200 });
}
