import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BedDouble, CarFront, Clock, MapPin } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { RouteCard } from "@/components/routes/RouteCard";
import { buildAffiliateUrl } from "@/lib/affiliate/buildAffiliateUrl";
import { routes } from "@/lib/ferry/mockData";
import { ferryProvider, getOperator, getPort, getRouteLabel } from "@/lib/ferry/provider";
import { getRouteAlternatives } from "@/lib/ferry/recommendations";
import { absoluteUrl, canonical } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return routes.map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = await ferryProvider.getRouteBySlug(slug);
  if (!route) return {};
  const from = getPort(route.fromPortId);
  const to = getPort(route.toPortId);
  const title = `Ferry bateau ${from?.city} ${to?.city} : prix, duree et voiture`;
  const description = `${route.summary} Duree, voiture, options de confort, conseils famille et alternatives pour le bateau.`;
  return {
    title,
    description,
    ...canonical(`/routes/${route.slug}`),
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/routes/${route.slug}`),
      type: "article"
    }
  };
}

export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params;
  const route = await ferryProvider.getRouteBySlug(slug);
  if (!route) notFound();

  const from = getPort(route.fromPortId);
  const to = getPort(route.toPortId);
  const operators = route.operatorIds.map(getOperator).filter(Boolean);
  const alternatives = getRouteAlternatives(route.id);
  const label = getRouteLabel(route);
  const countryPage = to?.country === "Maroc" ? "/bateau-maroc" : to?.country === "Algerie" ? "/bateau-algerie" : "/bateau-tunisie";

  return (
    <div className="container-page py-8 md:py-12">
      <div className="-mt-8 mb-6 md:-mt-12">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: `Bateau ${to?.country}`, href: countryPage }, { label }]} />
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <article className="space-y-10">
          <header className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Guide route ferry</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">Ferry / bateau {label}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-ink/70">{route.summary}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-mist p-4">
                <Clock className="h-5 w-5 text-petrol" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold">{route.averageDurationHours} h moyenne</p>
              </div>
              <div className="rounded-lg bg-mist p-4">
                <MapPin className="h-5 w-5 text-petrol" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold">{from?.city} vers {to?.city}</p>
              </div>
              <div className="rounded-lg bg-mist p-4">
                <CarFront className="h-5 w-5 text-petrol" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold">Vehicule accepte</p>
              </div>
              <div className="rounded-lg bg-mist p-4">
                <BedDouble className="h-5 w-5 text-petrol" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold">{route.cabinAvailable ? "Cabine selon compagnie" : "Pas de cabine sur traversee courte"}</p>
              </div>
            </div>
          </header>

          <section className="grid gap-5 md:grid-cols-2">
            {[
              ["Pourquoi choisir cette route", `Cette route est pertinente si vous cherchez un trajet ${route.tags.join(", ")} avec une organisation simple pour la famille.`],
              ["A savoir avant d'embarquer", "Arrivez en avance, gardez les documents accessibles et verifiez les horaires definitifs chez le partenaire de reservation."],
              ["Avec voiture", "Comparez le prix du billet avec peages, carburant et fatigue routiere. Les vehicules et utilitaires peuvent modifier le tarif."],
              ["Famille / enfants", "Pour les longues traversees, privilegiez les horaires de nuit et une cabine si la compagnie la propose. Sur les traversees courtes type Algesiras -> Tanger Med, l'enjeu est plutot l'attente au port et l'embarquement."]
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-ink">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/70">{body}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-ink">Alternatives</h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {alternatives.map((alternative) => (
                <RouteCard key={alternative.id} route={alternative} />
              ))}
            </div>
          </section>

          <FAQ
            items={[
              { question: `Quelle est la duree du ferry ${label} ?`, answer: `La duree mockee moyenne est d'environ ${route.averageDurationHours} h. Elle doit etre confirmee chez le partenaire.` },
              { question: "Peut-on voyager avec une voiture ?", answer: route.vehicleAccepted ? "Oui, cette route est presentee comme compatible vehicule dans les donnees MVP." : "Cette route n'indique pas de vehicule dans les donnees MVP." },
              { question: "Maghreb Ferries vend-il le billet ?", answer: "Non. Le site compare et renvoie vers des partenaires qui gerent reservation, paiement, billet et service apres-vente." }
            ]}
          />
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Comparer</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Voir les disponibilites</h2>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              Operateurs exemples : {operators.map((operator) => operator?.name).join(", ")}. Disponibilite non garantie.
            </p>
            <Link
              href={buildAffiliateUrl(route.slug)}
              className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white"
            >
              Reserver chez notre partenaire
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <LeadCaptureCard route={route.slug} />
        </aside>
      </div>
    </div>
  );
}
