import Link from "next/link";
import { ArrowRight, Car, Ship } from "lucide-react";
import { getPort, getRouteLabel } from "@/lib/ferry/provider";
import type { Route } from "@/lib/ferry/types";
import { buildAffiliateUrl } from "@/lib/affiliate/buildAffiliateUrl";
import { ScorePill } from "./ScorePill";

export function RouteCard({ route, featured = false }: { route: Route; featured?: boolean }) {
  const to = getPort(route.toPortId);

  return (
    <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          {featured && (
            <span className="rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold text-coral">
              Route recommandee
            </span>
          )}
          <h3 className="mt-3 text-xl font-semibold text-ink">{getRouteLabel(route)}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/65">{route.summary}</p>
        </div>
        <Ship className="h-6 w-6 shrink-0 text-petrol" aria-hidden="true" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <ScorePill label="Confort" value={route.comfortScore} />
        <ScorePill label="Prix" value={route.priceScore} />
        <ScorePill label="Famille" value={route.familyScore} />
      </div>
      <div className="mt-5 grid gap-2 text-sm text-ink/70 sm:grid-cols-2">
        <span>{route.averageDurationHours} h en moyenne</span>
        <span>{to?.country}</span>
        <span className="inline-flex items-center gap-2">
          <Car className="h-4 w-4" aria-hidden="true" />
          Vehicule accepte
        </span>
        <span>{route.cabinAvailable ? "Cabine selon compagnie" : "Pas de cabine sur traversee courte"}</span>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/routes/${route.slug}`}
          className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-ink/10 px-4 py-3 text-sm font-semibold text-ink"
        >
          Details route
        </Link>
        <Link
          href={buildAffiliateUrl(route.slug)}
          className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-marine px-4 py-3 text-sm font-semibold text-white"
        >
          Voir les disponibilites
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
