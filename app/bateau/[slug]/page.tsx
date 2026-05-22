import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BedDouble, CarFront, Clock, Ship } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { buildAffiliateUrl } from "@/lib/affiliate/buildAffiliateUrl";
import { routes } from "@/lib/ferry/mockData";
import { ferryProvider, getPort, getRouteLabel } from "@/lib/ferry/provider";
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
  const title = `Bateau ${from?.city} ${to?.city} : trajet, voiture et prix`;
  const description = `Guide bateau ${from?.city} ${to?.city} : duree, voiture, famille, bagages, cabine selon traversee et lien partenaire pour voir les disponibilites.`;

  return {
    title,
    description,
    ...canonical(`/bateau/${route.slug}`),
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/bateau/${route.slug}`),
      type: "article"
    }
  };
}

export default async function BateauRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const route = await ferryProvider.getRouteBySlug(slug);
  if (!route) notFound();

  const label = getRouteLabel(route);
  const from = getPort(route.fromPortId);
  const to = getPort(route.toPortId);
  const isShortCrossing = route.averageDurationHours <= 3;

  return (
    <div className="container-page py-8 md:py-12">
      <article className="mx-auto max-w-5xl space-y-10">
        <header className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">
            Bateau vers le Maghreb
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Bateau {label}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink/70">
            Vous cherchez un bateau {from?.city} {to?.city} avec voiture, bagages ou enfants ?
            Cette page resume les points importants avant de comparer les disponibilites chez un partenaire.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-mist p-4">
              <Clock className="h-5 w-5 text-petrol" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">{route.averageDurationHours} h environ</p>
            </div>
            <div className="rounded-lg bg-mist p-4">
              <CarFront className="h-5 w-5 text-petrol" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">Voiture acceptee selon offre</p>
            </div>
            <div className="rounded-lg bg-mist p-4">
              <BedDouble className="h-5 w-5 text-petrol" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">
                {route.cabinAvailable ? "Cabine selon bateau" : "Pas de cabine sur trajet court"}
              </p>
            </div>
            <div className="rounded-lg bg-mist p-4">
              <Ship className="h-5 w-5 text-petrol" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">Donnees exemples MVP</p>
            </div>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-ink">Pourquoi chercher ce bateau ?</h2>
            <p className="mt-3 text-base leading-7 text-ink/70">
              La route {label} peut etre interessante si vous voulez organiser un depart vers {to?.country}
              avec une logique famille : voiture, valises, horaires, attente au port et fatigue totale.
            </p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-ink">Avec voiture</h2>
            <p className="mt-3 text-base leading-7 text-ink/70">
              Pour un bateau avec voiture, comparez toujours le prix du billet avec carburant, peages,
              distance jusqu'au port et distance apres l'arrivee.
            </p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-ink">Cabine, siege ou fauteuil</h2>
            <p className="mt-3 text-base leading-7 text-ink/70">
              {isShortCrossing
                ? "Sur une traversee courte, le choix cabine n'est generalement pas le sujet principal. Regardez plutot les horaires, l'attente et la frequence."
                : "Sur une longue traversee, la cabine peut changer le confort du voyage. Le choix exact depend du bateau et de la compagnie."}
            </p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-ink">Comparer avant de reserver</h2>
            <p className="mt-3 text-base leading-7 text-ink/70">
              Maghreb Ferries ne vend pas les billets. Le paiement, le billet et le service apres-vente
              sont assures par les partenaires de reservation.
            </p>
          </div>
        </section>

        <div className="rounded-lg bg-marine p-6 text-white md:p-8">
          <h2 className="text-2xl font-semibold">Voir les disponibilites bateau {label}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75">
            Les prix et horaires visibles dans le MVP sont indicatifs. Verifiez les disponibilites finales
            chez le partenaire avant de reserver.
          </p>
          <Link
            href={buildAffiliateUrl(route.slug)}
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white"
          >
            Voir chez notre partenaire
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <FAQ
          items={[
            {
              question: `Combien de temps dure le bateau ${label} ?`,
              answer: `La duree indiquee dans le MVP est d'environ ${route.averageDurationHours} h. Elle doit etre verifiee chez le partenaire selon la date et la compagnie.`
            },
            {
              question: `Peut-on prendre le bateau ${label} avec une voiture ?`,
              answer: route.vehicleAccepted
                ? "Oui, cette route est presentee comme compatible voiture dans les donnees exemples. Le prix depend du vehicule et de ses dimensions."
                : "Les donnees exemples ne confirment pas le vehicule pour cette route."
            },
            {
              question: "Faut-il dire ferry ou bateau pour chercher ?",
              answer:
                "Les deux mots sont utiles. Beaucoup de voyageurs disent bateau, tandis que les partenaires de reservation utilisent souvent ferry."
            }
          ]}
        />

        <LeadCaptureCard route={`bateau-${route.slug}`} />
      </article>
    </div>
  );
}
