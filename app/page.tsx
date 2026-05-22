import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPinned, RouteIcon } from "lucide-react";
import { GuideCard } from "@/components/guides/GuideCard";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { RouteCard } from "@/components/routes/RouteCard";
import { SearchBox } from "@/components/search/SearchBox";
import { TrustBanner } from "@/components/TrustBanner";
import { ferryProvider } from "@/lib/ferry/provider";
import { routes } from "@/lib/ferry/mockData";
import { guideArticles } from "@/lib/guides";
import { absoluteUrl, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bateau et ferry Maroc, Algerie, Tunisie avec voiture",
  description:
    "Comparez les bateaux et ferries vers le Maghreb depuis France, Espagne et Italie : Maroc, Algerie, Tunisie, voiture, famille, bagages et alertes prix.",
  ...canonical("/"),
  openGraph: {
    title: "Maghreb Ferries - Comparer les bateaux et ferries vers le Maghreb",
    description:
      "Assistant bateau et ferry pour choisir la bonne route vers Maroc, Algerie ou Tunisie avec voiture et enfants.",
    url: absoluteUrl("/")
  }
};

export default async function HomePage() {
  const ports = await ferryProvider.getPorts();
  const popularRoutes = routes
    .filter((route) => ["marseille-tanger-med", "sete-nador", "algesiras-tanger-med"].includes(route.slug));

  return (
    <div>
      <section className="container-page grid gap-10 py-10 md:py-16 lg:grid-cols-[1fr_0.86fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Assistant ferry diaspora Maghreb</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Comparez la bonne traversee, pas seulement le prix.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            Maghreb Ferries aide les familles a comparer les bateaux et ferries vers le Maroc, l'Algerie et la Tunisie avec voiture,
            bagages, enfants, trajets d'ete et options de confort selon la traversee.
          </p>
          <div className="mt-8">
            <SearchBox ports={ports} />
          </div>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/80 p-5 shadow-soft">
          <div className="rounded-lg bg-marine p-6 text-white">
            <MapPinned className="h-8 w-8 text-coral" aria-hidden="true" />
            <h2 className="mt-6 text-2xl font-semibold">Special ete, voiture et famille</h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Les donnees affichees sont des exemples mockes pour le MVP. Les disponibilites reelles seront verifiees chez les partenaires de reservation.
            </p>
          </div>
          <div className="mt-4 grid gap-3">
            {[
              ["Maroc", "Tanger Med, Nador, Tanger Ville"],
              ["Algerie", "Alger, Oran, Bejaia, Mostaganem"],
              ["Tunisie", "Tunis, Zarzis"]
            ].map(([title, text]) => (
              <Link key={title} href={`/recherche?to=${title}`} className="rounded-lg border border-ink/10 bg-white p-4 hover:border-petrol/30">
                <span className="text-lg font-semibold text-ink">{title}</span>
                <p className="mt-1 text-sm text-ink/60">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Maroc", "Marseille, Sete, Algesiras, Almeria et Barcelone vers Tanger Med ou Nador."],
            ["Algerie", "Routes directes depuis Marseille et alternatives Espagne vers Oran ou Mostaganem."],
            ["Tunisie", "Marseille, Genes ou Civitavecchia vers Tunis et Zarzis."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/65">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-8 py-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Decision utile</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Trouvez la meilleure route, pas seulement le prix</h2>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Un billet bateau cher doit etre juge avec la conduite, les horaires, l'arrivee, les besoins des enfants et les options de confort disponibles apres le choix de la traversee.
            Le moteur MVP calcule des scores simples prix, confort et famille.
          </p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <RouteIcon className="h-5 w-5 text-coral" aria-hidden="true" />
            <h3 className="text-lg font-semibold">Je pars d'ou ? Je vais ou ?</h3>
          </div>
          <div className="mt-4">
            <SearchBox ports={ports} compact defaultFrom="Paris" defaultTo="Nador" />
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Routes populaires</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">Traversees souvent comparees</h2>
          </div>
          <Link href="/recherche" className="hidden items-center gap-2 text-sm font-semibold text-coral md:inline-flex">
            Voir les options <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {popularRoutes.map((route) => (
            <RouteCard key={route.id} route={route} featured={route.slug === "sete-nador"} />
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Guides pratiques</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">Choisir sans stress</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {guideArticles.slice(0, 3).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <TrustBanner />
      </section>

      <section className="container-page py-10">
        <LeadCaptureCard />
      </section>
    </div>
  );
}
