import type { Metadata } from "next";
import { GuideCard } from "@/components/guides/GuideCard";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { guideArticles } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides pratiques ferry Maghreb",
  description: "Conseils pour choisir une route ferry vers le Maroc, l'Algerie ou la Tunisie avec voiture, cabine et enfants."
};

export default function GuidesPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Guides pratiques</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Bien choisir son ferry vers le Maghreb
        </h1>
        <p className="mt-4 text-base leading-7 text-ink/70">
          Des guides simples pour comparer la route, la conduite, la cabine, la voiture et les periodes d'ete.
        </p>
      </header>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guideArticles.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
      <div className="mt-10">
        <LeadCaptureCard />
      </div>
    </div>
  );
}
