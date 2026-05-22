type AffiliateProvider = "directferries" | "ferryhopper" | "aferry";

export function buildAffiliateUrl(routeSlug: string, provider: AffiliateProvider = "directferries") {
  const providerParam = provider === "directferries" ? "directferries" : provider;
  return `/go/direct-ferries?route=${encodeURIComponent(routeSlug)}&provider=${encodeURIComponent(providerParam)}`;
}
