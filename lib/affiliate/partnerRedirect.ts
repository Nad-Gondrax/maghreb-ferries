const directFerriesBaseUrl = process.env.DIRECT_FERRIES_AFFILIATE_BASE_URL;

export function buildPartnerRedirectUrl(origin: string, route: string, provider: string) {
  if (provider === "directferries" && directFerriesBaseUrl) {
    const target = new URL(directFerriesBaseUrl);
    target.searchParams.set("route", route);
    if (process.env.DIRECT_FERRIES_AFFILIATE_ID) {
      target.searchParams.set("affiliateId", process.env.DIRECT_FERRIES_AFFILIATE_ID);
    }
    return target.toString();
  }

  const fallback = new URL("/transparence-affiliation", origin);
  fallback.searchParams.set("route", route);
  fallback.searchParams.set("provider", provider);
  fallback.searchParams.set("mockAffiliate", "true");
  return fallback.toString();
}
