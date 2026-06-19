import Link from "next/link";
import { ArrowRight, CarFront, MapPinned, UsersRound } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { RouteCard } from "@/components/routes/RouteCard";
import { SearchBox } from "@/components/search/SearchBox";
import type { CountryLandingPage as CountryLandingPageData } from "@/lib/ferry/countryLandingPages";
import { ports, routes } from "@/lib/ferry/mockData";
import { getPort } from "@/lib/ferry/provider";

export function CountryLandingPage({ page }: { page: CountryLandingPageData }) {
  const countryRoutes = routes.filter(
    (route) => getPort(route.toPortId)?.country === page.country
  );
  const countryWithArticle =
    page.country === "Maroc"
      ? "le Maroc"
      : page.country === "Algerie"
        ? "l'Algerie"
        : "la Tunisie";
  const countryWithPreposition = page.country === "Maroc" ? "au Maroc" : `en ${page.country}`;

  return (
    <div>
      <section className="container-page grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">
            Bateau vers le Maghreb
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">
            {page.introduction}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-ink/70">
            <span className="rounded-lg border border-ink/10 bg-white px-4 py-2">{countryRoutes.length} routes comparees</span>
            <span className="rounded-lg border border-ink/10 bg-white px-4 py-2">Avec voiture</span>
            <span className="rounded-lg border border-ink/10 bg-white px-4 py-2">Conseils famille</span>
          </div>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <MapPinned className="h-5 w-5 text-coral" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-ink">Chercher un bateau vers {countryWithArticle}</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-ink/65">Ports desservis : {page.ports}.</p>
          <div className="mt-5">
            <SearchBox ports={ports} compact defaultTo={page.country} />
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Routes disponibles</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">Les bateaux vers {countryWithArticle}</h2>
          </div>
          <Link href={`/recherche?to=${page.country}`} className="inline-flex items-center gap-2 text-sm font-semibold text-coral">
            Comparer toutes les options <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {countryRoutes.map((route, index) => (
            <RouteCard key={route.id} route={route} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="container-page grid gap-5 py-10 md:grid-cols-2">
        <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
          <CarFront className="h-6 w-6 text-petrol" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold text-ink">Aller {countryWithPreposition} avec une voiture</h2>
          <p className="mt-3 text-base leading-7 text-ink/70">{page.drivingAdvice}</p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
          <UsersRound className="h-6 w-6 text-petrol" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold text-ink">Voyager en famille</h2>
          <p className="mt-3 text-base leading-7 text-ink/70">{page.familyAdvice}</p>
        </article>
      </section>

      <section className="container-page py-10">
        <FAQ
          items={[
            {
              question: `Quel bateau choisir pour aller ${countryWithPreposition} avec une voiture ?`,
              answer: `Comparez le port de depart, la duree en mer et la distance routiere totale. Les routes affichees sont des exemples MVP ; les horaires et disponibilites doivent etre verifies chez le partenaire.`
            },
            {
              question: `Quels ports desservent ${countryWithArticle} ?`,
              answer: `Les ports presentes dans notre comparateur sont ${page.ports}. Les liaisons disponibles dependent de la date et de la compagnie.`
            },
            {
              question: "Quand reserver un bateau pour l'ete ?",
              answer: "Pour les periodes tres demandees, commencez a surveiller les ouvertures plusieurs mois avant le depart et comparez des dates proches si votre voyage est flexible."
            }
          ]}
        />
      </section>

      <section className="container-page py-10">
        <LeadCaptureCard route={page.slug} />
      </section>
    </div>
  );
}
