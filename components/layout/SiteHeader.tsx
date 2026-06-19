"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Ship, X } from "lucide-react";

const destinations = [
  { href: "/bateau-maroc", label: "Maroc" },
  { href: "/bateau-algerie", label: "Algerie" },
  { href: "/bateau-tunisie", label: "Tunisie" }
];

const resources = [
  { href: "/guides", label: "Guides et conseils" },
  { href: "/contact-aide-whatsapp", label: "Aide" }
];

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-sand/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-3" aria-label="Navigation principale">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-base font-bold text-ink">
          <span className="rounded-lg bg-marine p-2 text-white">
            <Ship className="h-5 w-5" aria-hidden="true" />
          </span>
          Maghreb Ferries
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {destinations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isCurrent(pathname, item.href)
                  ? "bg-petrol/10 text-petrol"
                  : "text-ink/70 hover:bg-white/70 hover:text-ink"
              }`}
            >
              Bateau {item.label}
            </Link>
          ))}
          {resources.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isCurrent(pathname, item.href)
                  ? "bg-petrol/10 text-petrol"
                  : "text-ink/70 hover:bg-white/70 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/recherche"
            className="focus-ring rounded-lg bg-coral px-3 py-2 text-sm font-semibold text-white sm:px-4"
          >
            Comparer
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/10 bg-white text-ink lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-ink/10 bg-white lg:hidden">
          <div className="container-page grid gap-6 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-petrol">Destinations</p>
              <div className="mt-2 grid gap-1 sm:grid-cols-3">
                {destinations.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                    className={`rounded-lg px-3 py-3 text-sm font-semibold ${
                      isCurrent(pathname, item.href) ? "bg-mist text-petrol" : "text-ink hover:bg-mist"
                    }`}
                  >
                    Bateau {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid gap-1 border-t border-ink/10 pt-4 sm:grid-cols-3">
              <Link href="/recherche" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-mist">Comparer les traversees</Link>
              {resources.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-mist">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
