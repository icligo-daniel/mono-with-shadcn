import { NextResponse } from "next/server";

let draftStorage: any = {};

export async function POST(req: Request) {
  const data = await req.json();
  draftStorage = { ...draftStorage, ...data };
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(draftStorage);
}
