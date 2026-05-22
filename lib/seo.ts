export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://maghreb-ferries.vercel.app";

export const siteName = "Maghreb Ferries";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function canonical(path = "/") {
  return {
    alternates: {
      canonical: absoluteUrl(path)
    }
  };
}
