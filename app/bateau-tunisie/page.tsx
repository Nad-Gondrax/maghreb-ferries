import type { Metadata } from "next";
import { CountryLandingPage } from "@/components/country/CountryLandingPage";
import { getCountryLandingPage } from "@/lib/ferry/countryLandingPages";
import { absoluteUrl, canonical } from "@/lib/seo";

const page = getCountryLandingPage("bateau-tunisie")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  ...canonical("/bateau-tunisie"),
  openGraph: { title: page.title, description: page.description, url: absoluteUrl("/bateau-tunisie") }
};

export default function BateauTunisiePage() {
  return <CountryLandingPage page={page} />;
}
