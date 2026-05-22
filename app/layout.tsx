import type { Metadata } from "next";
import Link from "next/link";
import { Ship } from "lucide-react";
import "./globals.css";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

export const metadata: Metadata = {
  metadataBase: new URL("https://maghreb-ferries.example"),
  title: {
    default: "Maghreb Ferries - Comparer les ferries vers Maroc, Algerie, Tunisie",
    template: "%s | Maghreb Ferries"
  },
  description:
    "Assistant de voyage bateau pour comparer les ferries vers le Maghreb avec voiture, cabine, bagages et conseils famille."
};

const nav = [
  { href: "/recherche", label: "Comparer" },
  { href: "/guides", label: "Guides" },
  { href: "/contact-aide-whatsapp", label: "Aide" },
  { href: "/transparence-affiliation", label: "Transparence" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <header className="sticky top-0 z-30 border-b border-ink/10 bg-sand/85 backdrop-blur">
          <nav className="container-page flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 text-base font-bold text-ink">
              <span className="rounded-lg bg-marine p-2 text-white">
                <Ship className="h-5 w-5" aria-hidden="true" />
              </span>
              Maghreb Ferries
            </Link>
            <div className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/recherche"
              className="focus-ring rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white"
            >
              Comparer
            </Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="container-page pb-24 pt-12 md:pb-12">
          <div className="grid gap-8 border-t border-ink/10 pt-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-lg font-semibold text-ink">Maghreb Ferries</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-ink/65">
                MVP avec donnees mockees pour aider les familles de la diaspora a choisir une traversee vers le Maghreb.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-ink/65">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <AffiliateDisclosure />
          </div>
        </footer>
      </body>
    </html>
  );
}
