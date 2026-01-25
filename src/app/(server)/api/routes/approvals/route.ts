import { NextResponse } from "next/server";

// Route disabled — approvals moved to client-side demo data
export async function GET() {
  return NextResponse.json({ error: "This route has been removed" }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ error: "This route has been removed" }, { status: 410 });
}

