import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maghreb Ferries - Bateau Maroc, Algerie, Tunisie avec voiture",
    template: `%s | ${siteName}`
  },
  description:
    "Comparez les bateaux et ferries vers le Maroc, l'Algerie et la Tunisie avec voiture, bagages, conseils famille et alertes prix.",
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName,
    title: "Maghreb Ferries - Bateau Maroc, Algerie, Tunisie avec voiture",
    description:
      "Assistant bateau et ferry pour la diaspora Maghreb : routes, voiture, famille, ete, prix et partenaires de reservation.",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Maghreb Ferries - Bateau Maroc, Algerie, Tunisie",
    description:
      "Comparez les routes bateau et ferry utiles pour le Maghreb avec voiture, enfants et bagages."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
