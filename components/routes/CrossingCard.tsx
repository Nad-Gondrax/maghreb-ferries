import Link from "next/link";
import { ArrowRight, BedDouble, CarFront, Clock } from "lucide-react";
import { buildAffiliateUrl } from "@/lib/affiliate/buildAffiliateUrl";
import { getOperator, getRoute, getRouteLabel } from "@/lib/ferry/provider";
import type { Crossing } from "@/lib/ferry/types";
import { ScorePill } from "./ScorePill";

export function CrossingCard({ crossing, badge }: { crossing: Crossing; badge?: string }) {
  const route = getRoute(crossing.routeId);
  const operator = getOperator(crossing.operatorId);
  if (!route) return null;

  return (
    <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {badge && <span className="rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold text-coral">{badge}</span>}
          <h3 className="mt-3 text-xl font-semibold text-ink">{getRouteLabel(route)}</h3>
          <p className="mt-1 text-sm text-ink/60">{operator?.name} - donnee exemple non garantie</p>
        </div>
        <div className="rounded-lg bg-mist px-4 py-3 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">Des</p>
          <p className="text-2xl font-bold text-ink">{crossing.estimatedPrice} EUR</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-ink/70 sm:grid-cols-3">
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 text-petrol" aria-hidden="true" />
          {crossing.durationHours} h - depart {crossing.departureTime}
        </span>
        <span className="inline-flex items-center gap-2">
          <CarFront className="h-4 w-4 text-petrol" aria-hidden="true" />
          Vehicule {crossing.vehicleAccepted ? "accepte" : "non indique"}
        </span>
        <span className="inline-flex items-center gap-2">
          <BedDouble className="h-4 w-4 text-petrol" aria-hidden="true" />
          {crossing.cabinAvailable ? "Cabine selon compagnie" : "Pas de cabine sur traversee courte"}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <ScorePill label="Confort" value={crossing.comfortScore} />
        <ScorePill label="Prix" value={crossing.priceScore} />
        <ScorePill label="Famille" value={crossing.familyScore} />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/routes/${route.slug}`} className="text-sm font-semibold text-petrol">
          Lire le guide de cette route
        </Link>
        <Link
          href={buildAffiliateUrl(route.slug)}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white"
        >
          Voir l'offre
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
