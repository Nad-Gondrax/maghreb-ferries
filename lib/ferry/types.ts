export type Country =
  | "France"
  | "Espagne"
  | "Italie"
  | "Maroc"
  | "Algerie"
  | "Tunisie";

export type VehicleType = "none" | "car" | "van" | "motorcycle";

export type Port = {
  id: string;
  name: string;
  city: string;
  country: Country;
  region?: string;
};

export type FerryOperator = {
  id: string;
  name: string;
  country?: Country;
};

export type Route = {
  id: string;
  slug: string;
  fromPortId: string;
  toPortId: string;
  operatorIds: string[];
  averageDurationHours: number;
  minDurationHours: number;
  vehicleAccepted: boolean;
  cabinAvailable: boolean;
  familyScore: number;
  comfortScore: number;
  priceScore: number;
  tags: string[];
  summary: string;
};

export type Crossing = {
  id: string;
  routeId: string;
  operatorId: string;
  departureTime: string;
  arrivalTime: string;
  durationHours: number;
  estimatedPrice: number;
  vehicleAccepted: boolean;
  cabinAvailable: boolean;
  comfortScore: number;
  priceScore: number;
  familyScore: number;
  affiliateProvider: "directferries" | "ferryhopper" | "aferry";
};

export type SearchQuery = {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  vehicle?: VehicleType;
  cabinNeeded?: boolean;
};

export type RecommendationKind =
  | "cheapest"
  | "comfortable"
  | "fastest"
  | "car";

export type Recommendation = {
  kind: RecommendationKind;
  title: string;
  routeId: string;
  reason: string;
  badge: string;
};
