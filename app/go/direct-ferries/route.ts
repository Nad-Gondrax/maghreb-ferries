import { NextResponse } from "next/server";
import { trackAffiliateClick } from "@/lib/affiliate/clickStore";
import { buildPartnerRedirectUrl } from "@/lib/affiliate/partnerRedirect";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const route = url.searchParams.get("route") ?? "";
  const provider = url.searchParams.get("provider") ?? "directferries";
  const href = buildPartnerRedirectUrl(url.origin, route, provider);

  await trackAffiliateClick({
    route,
    provider,
    href,
    referrer: request.headers.get("referer") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  });

  return NextResponse.redirect(href);
}
