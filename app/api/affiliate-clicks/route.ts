import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth/admin";
import { listAffiliateClicks } from "@/lib/affiliate/clickStore";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Acces admin requis." }, { status: 401 });
  }

  return NextResponse.json({ clicks: await listAffiliateClicks() });
}
