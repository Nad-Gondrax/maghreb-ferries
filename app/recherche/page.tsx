import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { CrossingCard } from "@/components/routes/CrossingCard";
import { RecommendationCard } from "@/components/routes/RecommendationCard";
import { SearchBox } from "@/components/search/SearchBox";
import { ferryProvider, getPort, getRoute } from "@/lib/ferry/provider";
import { getRecommendations } from "@/lib/ferry/recommendations";
import type { SearchQuery, VehicleType } from "@/lib/ferry/types";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Recherche ferry Maroc, Algerie, Tunisie",
  description: "Comparez des traversees ferry mockees avec voiture, prix estime et scores famille.",
  robots: {
    index: false,
    follow: true
  },
  ...canonical("/recherche")
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function valueOf(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const query: SearchQuery = {
    from: valueOf(params.from),
    to: valueOf(params.to),
    departureDate: valueOf(params.departureDate),
    returnDate: valueOf(params.returnDate),
    passengers: Number(valueOf(params.passengers) ?? 4),
    vehicle: (valueOf(params.vehicle) as VehicleType | undefined) ?? "car",
    cabinNeeded: valueOf(params.cabinNeeded) === "true"
  };

  const [ports, crossings] = await Promise.all([
    ferryProvider.getPorts(),
    ferryProvider.searchCrossings(query)
  ]);
  const recommendations = getRecommendations(crossings, query);
  const destinationLabel = query.to ? ` pour aller a ${query.to}` : "";

  const filters = ["Prix", "Duree", "Avec voiture", "Depart France / Espagne / Italie", "Compagnie"];
  const sorts = ["Recommande", "Moins cher", "Plus rapide", "Plus confortable"];

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-ink md:text-5xl">Comparer les traversees</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink/70">
          Donnees d'exemple pour tester l'experience. La reservation et le paiement se font chez le partenaire.
        </p>
      </div>

      <SearchBox ports={ports} compact defaultFrom={query.from} defaultTo={query.to} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-5">
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-petrol" aria-hidden="true" />
              <h2 className="font-semibold text-ink">Filtres</h2>
            </div>
            <div className="mt-4 space-y-3">
              {filters.map((filter) => (
                <label key={filter} className="flex items-center gap-3 text-sm text-ink/70">
                  <input type="checkbox" className="h-4 w-4 accent-petrol" />
                  {filter}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-ink">Tri</h2>
            <div className="mt-4 grid gap-2">
              {sorts.map((sort, index) => (
                <button
                  key={sort}
                  type="button"
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium ${index === 0 ? "bg-marine text-white" : "bg-mist text-ink/70"}`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Resultats</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              Nous avons trouve {crossings.length} options{destinationLabel}
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              Les scores mettent en avant le confort famille, la duree et le vehicule. Le choix siege,
              fauteuil ou cabine se verifie ensuite selon la traversee et la compagnie.
            </p>
          </div>

          {recommendations.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {recommendations.slice(0, 3).map((recommendation) => (
                <RecommendationCard key={`${recommendation.kind}-${recommendation.routeId}`} recommendation={recommendation} />
              ))}
            </div>
          )}

          <div className="space-y-4">
            {crossings.map((crossing, index) => {
              const route = getRoute(crossing.routeId);
              const toPort = route ? getPort(route.toPortId) : undefined;
              const badge = index === 0 ? "Meilleur choix famille" : index === 1 ? "Meilleur prix" : toPort?.country === "Maroc" ? "Moins de conduite" : undefined;
              return <CrossingCard key={crossing.id} crossing={crossing} badge={badge} />;
            })}
          </div>

          <LeadCaptureCard route={query.to} />
        </section>
      </div>
    </div>
  );
}
