import { crossings, operators, ports, routes } from "./mockData";
import type { Crossing, Port, Route, SearchQuery } from "./types";

export type FerryProvider = {
  getPorts: () => Promise<Port[]>;
  getRoutes: () => Promise<Route[]>;
  getRouteBySlug: (slug: string) => Promise<Route | undefined>;
  searchCrossings: (query: SearchQuery) => Promise<Crossing[]>;
};

const normalize = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const portMatches = (portId: string, value?: string) => {
  if (!value) return true;
  const port = ports.find((item) => item.id === portId);
  if (!port) return false;
  const needle = normalize(value);
  return [port.id, port.name, port.city, port.country].some((part) =>
    normalize(part).includes(needle)
  );
};

const matchesAnyPort = (value?: string) => {
  if (!value) return false;
  const needle = normalize(value);
  return ports.some((port) =>
    [port.id, port.name, port.city, port.country].some((part) =>
      normalize(part).includes(needle)
    )
  );
};

export const ferryProvider: FerryProvider = {
  async getPorts() {
    return ports;
  },
  async getRoutes() {
    return routes;
  },
  async getRouteBySlug(slug) {
    return routes.find((route) => route.slug === slug);
  },
  async searchCrossings(query) {
    const shouldFilterFrom = matchesAnyPort(query.from);
    const shouldFilterTo = matchesAnyPort(query.to);
    const matchingRoutes = routes.filter(
      (route) =>
        (!shouldFilterFrom || portMatches(route.fromPortId, query.from)) &&
        (!shouldFilterTo || portMatches(route.toPortId, query.to)) &&
        (!query.vehicle || query.vehicle === "none" || route.vehicleAccepted)
    );

    return crossings.filter((crossing) =>
      matchingRoutes.some((route) => route.id === crossing.routeId)
    );
  }
};

export function getPort(portId: string) {
  return ports.find((port) => port.id === portId);
}

export function getOperator(operatorId: string) {
  return operators.find((operator) => operator.id === operatorId);
}

export function getRoute(routeId: string) {
  return routes.find((route) => route.id === routeId);
}

export function getRouteLabel(route: Route) {
  const from = getPort(route.fromPortId);
  const to = getPort(route.toPortId);
  return `${from?.city ?? route.fromPortId} -> ${to?.city ?? route.toPortId}`;
}
