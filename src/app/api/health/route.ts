import { NextResponse } from "next/server";

export const runtime = "edge"; // ✅ crucial for Cloudflare Pages

export async function GET() {
  return NextResponse.json({ message: "Good!" });
}
