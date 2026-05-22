import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Mail, HelpCircle } from "lucide-react";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";

export const metadata: Metadata = {
  title: "Contact et aide WhatsApp",
  description: "Aide mockee Maghreb Ferries pour comparer les ferries vers le Maghreb sans vendre directement de billets."
};

export default function ContactPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Aide voyage</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">Contact / aide WhatsApp</h1>
        <p className="mt-4 text-base leading-7 text-ink/70">
          Pour le MVP, ce canal simule une aide avant reservation. Les billets, paiements, modifications et remboursements restent geres par les partenaires.
        </p>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
          <MessageCircle className="h-6 w-6 text-petrol" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-ink">WhatsApp</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Demandez de l'aide pour choisir une route, comprendre une alternative ou preparer un trajet avec voiture.
          </p>
          <Link href="https://wa.me/33000000000" className="mt-5 inline-flex text-sm font-semibold text-coral">
            Ouvrir WhatsApp
          </Link>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
          <Mail className="h-6 w-6 text-petrol" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-ink">Email</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Contact MVP : aide@maghreb-ferries.example. Aucun service apres-vente billet n'est assure par Maghreb Ferries.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
          <HelpCircle className="h-6 w-6 text-petrol" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-ink">Avant de contacter</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Indiquez votre ville de depart, destination finale, nombre de passagers, vehicule, cabine et dates souhaitees.
          </p>
        </article>
      </div>

      <div className="mt-10">
        <LeadCaptureCard />
      </div>
    </div>
  );
}
