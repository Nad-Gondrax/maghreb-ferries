import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth/admin";
import { addLead, listLeads } from "@/lib/leads/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.consent) {
    return NextResponse.json({ error: "Email et consentement requis." }, { status: 400 });
  }

  const lead = await addLead({
    email: String(body.email),
    whatsapp: body.whatsapp ? String(body.whatsapp) : undefined,
    route: body.route ? String(body.route) : undefined,
    consent: true,
    source: "price_alert"
  });

  return NextResponse.json({ ok: true, lead });
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Acces admin requis." }, { status: 401 });
  }

  return NextResponse.json({ leads: await listLeads() });
}
