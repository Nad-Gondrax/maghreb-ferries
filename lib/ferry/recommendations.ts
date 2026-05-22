import { crossings, routes } from "./mockData";
import { getPort, getRoute } from "./provider";
import type { Crossing, Recommendation, SearchQuery } from "./types";

const uniqueByRoute = (items: Crossing[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.routeId)) return false;
    seen.add(item.routeId);
    return true;
  });
};

export function getRecommendations(results: Crossing[], query?: SearchQuery): Recommendation[] {
  const pool = uniqueByRoute(results.length > 0 ? results : crossings);

  const cheapest = [...pool].sort((a, b) => a.estimatedPrice - b.estimatedPrice)[0];
  const fastest = [...pool].sort((a, b) => a.durationHours - b.durationHours)[0];
  const comfortable = [...pool].sort((a, b) => b.comfortScore - a.comfortScore)[0];
  const car = [...pool]
    .filter((crossing) => crossing.vehicleAccepted)
    .sort((a, b) => b.familyScore + b.comfortScore - (a.familyScore + a.comfortScore))[0];

  const recs: Recommendation[] = [];
  if (cheapest) {
    recs.push({
      kind: "cheapest",
      title: "Route la moins chere",
      routeId: cheapest.routeId,
      badge: "Meilleur prix",
      reason: `Estimation a partir de ${cheapest.estimatedPrice} EUR, utile si le budget prime sur la duree.`
    });
  }
  if (comfortable) {
    recs.push({
      kind: "comfortable",
      title: "Route la plus confortable",
      routeId: comfortable.routeId,
      badge: "Famille",
      reason: "Meilleur equilibre cabine, duree acceptable et confort pour les trajets longs."
    });
  }
  if (fastest) {
    recs.push({
      kind: "fastest",
      title: "Route la plus rapide en mer",
      routeId: fastest.routeId,
      badge: "Rapide",
      reason: `Environ ${fastest.durationHours} h de traversee, pratique si vous acceptez plus de conduite.`
    });
  }
  if (car) {
    recs.push({
      kind: "car",
      title: "Meilleure route avec voiture",
      routeId: car.routeId,
      badge: "Avec voiture",
      reason: "Priorise les routes acceptant les vehicules, les bagages et une organisation familiale plus simple."
    });
  }

  if (query && query.from && query.to && /paris/i.test(query.from) && /nador/i.test(query.to)) {
    return [
      {
        kind: "comfortable",
        title: "Sete -> Nador",
        routeId: "sete-nador",
        badge: "Moins de route",
        reason: "Depuis Paris vers Nador, Sete -> Nador limite la conduite en Espagne et reste confortable en famille."
      },
      {
        kind: "cheapest",
        title: "Almeria -> Nador",
        routeId: "almeria-nador",
        badge: "Souvent moins cher",
        reason: "Interessant pour le prix, avec davantage de route jusqu'au sud de l'Espagne."
      },
      {
        kind: "car",
        title: "Marseille -> Tanger Med",
        routeId: "marseille-tanger-med",
        badge: "Selon les dates",
        reason: "Pratique si les horaires conviennent, mais l'arrivee est plus loin de Nador."
      }
    ];
  }

  return recs;
}

export function getRouteAlternatives(routeId: string) {
  const route = getRoute(routeId);
  if (!route) return routes.slice(0, 3);
  const destination = getPort(route.toPortId)?.country;
  return routes
    .filter((candidate) => candidate.id !== route.id && getPort(candidate.toPortId)?.country === destination)
    .slice(0, 3);
}
