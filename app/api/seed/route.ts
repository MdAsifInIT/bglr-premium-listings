import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error: "Database seeding is disabled.",
      message: "Demo listings are provided by the frontend fallback in lib/sample-listings.ts.",
    },
    { status: 410 }
  );
}
