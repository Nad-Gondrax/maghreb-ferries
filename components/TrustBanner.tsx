import { Bell, Car, ShieldCheck, UsersRound } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Specialiste ferry Maghreb", text: "Routes utiles pour Maroc, Algerie, Tunisie." },
  { icon: Car, title: "Avec voiture", text: "Vehicule, bagages et cabines pris en compte." },
  { icon: Bell, title: "Alertes prix", text: "Suivi des ouvertures ete et baisses de prix." },
  { icon: UsersRound, title: "Conseils famille", text: "Priorite au confort sur les longues traversees." }
];

export function TrustBanner() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="rounded-lg border border-ink/10 bg-white/80 p-5 shadow-sm">
          <item.icon className="h-5 w-5 text-petrol" aria-hidden="true" />
          <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/65">{item.text}</p>
        </div>
      ))}
    </section>
  );
}
