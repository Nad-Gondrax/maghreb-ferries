import type { Crossing, FerryOperator, Port, Route } from "./types";

export const ports: Port[] = [
  { id: "marseille", name: "Port de Marseille", city: "Marseille", country: "France" },
  { id: "sete", name: "Port de Sete", city: "Sete", country: "France" },
  { id: "algesiras", name: "Port d'Algesiras", city: "Algesiras", country: "Espagne" },
  { id: "tarifa", name: "Port de Tarifa", city: "Tarifa", country: "Espagne" },
  { id: "almeria", name: "Port d'Almeria", city: "Almeria", country: "Espagne" },
  { id: "barcelone", name: "Port de Barcelone", city: "Barcelone", country: "Espagne" },
  { id: "alicante", name: "Port d'Alicante", city: "Alicante", country: "Espagne" },
  { id: "valence", name: "Port de Valence", city: "Valence", country: "Espagne" },
  { id: "genes", name: "Port de Genes", city: "Genes", country: "Italie" },
  { id: "civitavecchia", name: "Port de Civitavecchia", city: "Civitavecchia", country: "Italie" },
  { id: "tanger-med", name: "Tanger Med", city: "Tanger Med", country: "Maroc" },
  { id: "tanger-ville", name: "Tanger Ville", city: "Tanger", country: "Maroc" },
  { id: "nador", name: "Port de Nador", city: "Nador", country: "Maroc" },
  { id: "alger", name: "Port d'Alger", city: "Alger", country: "Algerie" },
  { id: "oran", name: "Port d'Oran", city: "Oran", country: "Algerie" },
  { id: "bejaia", name: "Port de Bejaia", city: "Bejaia", country: "Algerie" },
  { id: "mostaganem", name: "Port de Mostaganem", city: "Mostaganem", country: "Algerie" },
  { id: "tunis", name: "Port de Tunis", city: "Tunis", country: "Tunisie" },
  { id: "zarzis", name: "Port de Zarzis", city: "Zarzis", country: "Tunisie" }
];

export const operators: FerryOperator[] = [
  { id: "balearia", name: "Balearia" },
  { id: "gnv", name: "GNV" },
  { id: "la-meridionale", name: "La Meridionale" },
  { id: "aml", name: "AML" },
  { id: "frs", name: "FRS" },
  { id: "naviera-armas", name: "Naviera Armas" },
  { id: "corsica-linea", name: "Corsica Linea" },
  { id: "ctn", name: "CTN" },
  { id: "grimaldi-lines", name: "Grimaldi Lines" },
  { id: "algerie-ferries", name: "Algerie Ferries" }
];

const route = (
  slug: string,
  fromPortId: string,
  toPortId: string,
  operatorIds: string[],
  averageDurationHours: number,
  scores: Pick<Route, "comfortScore" | "priceScore" | "familyScore">,
  tags: string[],
  summary: string
): Route => ({
  id: slug,
  slug,
  fromPortId,
  toPortId,
  operatorIds,
  averageDurationHours,
  minDurationHours: Math.max(1, averageDurationHours - 2),
  vehicleAccepted: true,
  cabinAvailable: averageDurationHours > 6,
  ...scores,
  tags,
  summary
});

export const routes: Route[] = [
  route("marseille-tanger-med", "marseille", "tanger-med", ["gnv", "la-meridionale"], 42, { comfortScore: 86, priceScore: 62, familyScore: 88 }, ["long trajet", "cabine", "famille"], "Une option directe et lisible depuis le sud de la France vers Tanger Med."),
  route("sete-nador", "sete", "nador", ["gnv", "balearia"], 36, { comfortScore: 89, priceScore: 70, familyScore: 92 }, ["maroc oriental", "voiture", "cabine"], "Une route tres pratique pour rejoindre le nord-est du Maroc avec moins de conduite en Espagne."),
  route("sete-tanger-med", "sete", "tanger-med", ["gnv"], 40, { comfortScore: 85, priceScore: 66, familyScore: 86 }, ["cabine", "ete", "famille"], "Une traversee longue, adaptee aux familles qui veulent limiter la route."),
  route("algesiras-tanger-med", "algesiras", "tanger-med", ["balearia", "aml", "frs"], 1.5, { comfortScore: 72, priceScore: 92, familyScore: 76 }, ["rapide", "frequent", "espagne"], "La traversee courte la plus populaire pour Tanger Med apres la route jusqu'au sud de l'Espagne."),
  route("tarifa-tanger-ville", "tarifa", "tanger-ville", ["frs"], 1, { comfortScore: 70, priceScore: 88, familyScore: 70 }, ["rapide", "centre-ville"], "Une liaison courte vers Tanger Ville, interessante sans voiture lourde ni long trajet maritime."),
  route("almeria-nador", "almeria", "nador", ["balearia", "naviera-armas"], 7, { comfortScore: 78, priceScore: 86, familyScore: 80 }, ["prix", "nador", "voiture"], "Souvent interessante pour le budget si l'on accepte de conduire jusqu'en Andalousie."),
  route("barcelone-tanger-med", "barcelone", "tanger-med", ["gnv", "grimaldi-lines"], 32, { comfortScore: 82, priceScore: 68, familyScore: 84 }, ["catalogne", "cabine"], "Un compromis pour les voyageurs de l'est de la France ou de Catalogne."),
  route("marseille-alger", "marseille", "alger", ["corsica-linea", "algerie-ferries"], 22, { comfortScore: 82, priceScore: 70, familyScore: 84 }, ["algerie", "cabine"], "La route directe classique entre Marseille et Alger."),
  route("marseille-oran", "marseille", "oran", ["corsica-linea", "algerie-ferries"], 27, { comfortScore: 80, priceScore: 68, familyScore: 82 }, ["oran", "voiture"], "Une option directe vers l'ouest algerien avec voiture et bagages."),
  route("marseille-bejaia", "marseille", "bejaia", ["corsica-linea", "algerie-ferries"], 24, { comfortScore: 79, priceScore: 69, familyScore: 82 }, ["kabylie", "famille"], "Pratique pour rejoindre Bejaia et la Kabylie sans correspondance."),
  route("alicante-oran", "alicante", "oran", ["algerie-ferries"], 11, { comfortScore: 76, priceScore: 83, familyScore: 78 }, ["espagne", "oran"], "Une alternative plus courte en mer depuis l'Espagne vers Oran."),
  route("valence-mostaganem", "valence", "mostaganem", ["balearia"], 15, { comfortScore: 77, priceScore: 81, familyScore: 79 }, ["mostaganem", "prix"], "Un bon compromis si l'on part de l'est de l'Espagne."),
  route("marseille-tunis", "marseille", "tunis", ["ctn", "corsica-linea"], 21, { comfortScore: 83, priceScore: 72, familyScore: 84 }, ["tunisie", "cabine"], "La liaison directe la plus lisible entre le sud de la France et Tunis."),
  route("marseille-zarzis", "marseille", "zarzis", ["ctn"], 33, { comfortScore: 78, priceScore: 65, familyScore: 80 }, ["sud tunisien", "cabine"], "Une route utile pour rejoindre le sud tunisien avec moins de route a l'arrivee."),
  route("genes-tunis", "genes", "tunis", ["gnv", "ctn"], 24, { comfortScore: 82, priceScore: 74, familyScore: 83 }, ["italie", "tunisie"], "Une alternative solide pour les voyageurs proches de l'Italie du nord."),
  route("civitavecchia-tunis", "civitavecchia", "tunis", ["grimaldi-lines"], 19, { comfortScore: 80, priceScore: 76, familyScore: 80 }, ["rome", "tunisie"], "Une option italienne plus au sud, pratique selon l'itineraire routier.")
];

export const crossings: Crossing[] = routes.flatMap((routeItem, index) =>
  routeItem.operatorIds.slice(0, 2).map((operatorId, operatorIndex) => ({
    id: `${routeItem.slug}-${operatorId}`,
    routeId: routeItem.id,
    operatorId,
    departureTime: operatorIndex === 0 ? "18:30" : "23:00",
    arrivalTime: operatorIndex === 0 ? "Matin +1/+2" : "Soir +1/+2",
    durationHours: routeItem.minDurationHours + operatorIndex,
    estimatedPrice: Math.round(140 + routeItem.averageDurationHours * 8 + index * 11 + operatorIndex * 35),
    vehicleAccepted: routeItem.vehicleAccepted,
    cabinAvailable: routeItem.cabinAvailable,
    comfortScore: Math.min(99, routeItem.comfortScore + operatorIndex),
    priceScore: Math.max(45, routeItem.priceScore - operatorIndex * 4),
    familyScore: Math.min(99, routeItem.familyScore + operatorIndex),
    affiliateProvider: "directferries"
  }))
);
