import Link from "next/link";
import { Ship } from "lucide-react";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

const footerGroups = [
  {
    title: "Destinations",
    links: [
      { href: "/bateau-maroc", label: "Bateau Maroc" },
      { href: "/bateau-algerie", label: "Bateau Algerie" },
      { href: "/bateau-tunisie", label: "Bateau Tunisie" }
    ]
  },
  {
    title: "Routes populaires",
    links: [
      { href: "/bateau/marseille-tanger-med", label: "Marseille - Tanger Med" },
      { href: "/bateau/sete-nador", label: "Sete - Nador" },
      { href: "/bateau/algesiras-tanger-med", label: "Algesiras - Tanger Med" }
    ]
  },
  {
    title: "Preparer le voyage",
    links: [
      { href: "/recherche", label: "Comparer les traversees" },
      { href: "/guides", label: "Guides et conseils" },
      { href: "/contact-aide-whatsapp", label: "Aide et contact" },
      { href: "/transparence-affiliation", label: "Transparence" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-ink/10 bg-white/55">
      <div className="container-page py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-ink">
              <span className="rounded-lg bg-marine p-2 text-white">
                <Ship className="h-5 w-5" aria-hidden="true" />
              </span>
              Maghreb Ferries
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-ink/65">
              L'assistant bateau pour comparer les routes vers le Maghreb avec voiture, enfants et bagages.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-ink">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-ink/65 transition hover:text-petrol">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-ink/10 pt-6">
          <AffiliateDisclosure />
        </div>
      </div>
    </footer>
  );
}
