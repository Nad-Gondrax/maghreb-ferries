import type { Metadata } from "next";
import { CountryLandingPage } from "@/components/country/CountryLandingPage";
import { getCountryLandingPage } from "@/lib/ferry/countryLandingPages";
import { absoluteUrl, canonical } from "@/lib/seo";

const page = getCountryLandingPage("bateau-algerie")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  ...canonical("/bateau-algerie"),
  openGraph: { title: page.title, description: page.description, url: absoluteUrl("/bateau-algerie") }
};

export default function BateauAlgeriePage() {
  return <CountryLandingPage page={page} />;
}
