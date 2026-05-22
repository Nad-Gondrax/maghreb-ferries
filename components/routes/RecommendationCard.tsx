import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getRoute, getRouteLabel } from "@/lib/ferry/provider";
import type { Recommendation } from "@/lib/ferry/types";

export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const route = getRoute(recommendation.routeId);

  return (
    <article className="rounded-lg border border-petrol/15 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="rounded-lg bg-petrol/10 p-2 text-petrol">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-petrol">
            {recommendation.badge}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-ink">{recommendation.title}</h3>
          {route && <p className="mt-1 text-sm font-medium text-ink/60">{getRouteLabel(route)}</p>}
          <p className="mt-3 text-sm leading-6 text-ink/70">{recommendation.reason}</p>
          {route && (
            <Link href={`/routes/${route.slug}`} className="mt-4 inline-flex text-sm font-semibold text-petrol">
              Voir cette route
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
