import type { Metadata } from "next";
import { CountryLandingPage } from "@/components/country/CountryLandingPage";
import { getCountryLandingPage } from "@/lib/ferry/countryLandingPages";
import { absoluteUrl, canonical } from "@/lib/seo";

const page = getCountryLandingPage("bateau-maroc")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  ...canonical("/bateau-maroc"),
  openGraph: { title: page.title, description: page.description, url: absoluteUrl("/bateau-maroc") }
};

export default function BateauMarocPage() {
  return <CountryLandingPage page={page} />;
}
