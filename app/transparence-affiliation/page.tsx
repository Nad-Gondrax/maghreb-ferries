import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparence affiliation",
  description: "Informations sur les liens affilies, les partenaires de reservation et le role de Maghreb Ferries."
};

export default function TransparencyPage() {
  return (
    <div className="container-page py-10 md:py-14">
      <article className="mx-auto max-w-4xl space-y-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">Transparence</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Mentions affiliation et role de Maghreb Ferries
          </h1>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Maghreb Ferries est concu comme un assistant de comparaison et de decision. Le MVP n'integre aucune vraie API partenaire et n'encaisse aucun paiement.
          </p>
        </header>

        {[
          ["Ce que fait Maghreb Ferries", "Nous aidons a comparer des routes, comprendre les compromis et acceder a des liens de disponibilites chez des partenaires de reservation."],
          ["Ce que Maghreb Ferries ne fait pas", "Nous ne vendons pas directement les billets, ne collectons pas le paiement, n'emettons pas le billet et ne gerons pas le service apres-vente."],
          ["Liens affilies", "Certains liens peuvent etre affilies. Cela peut generer une commission si une reservation est effectuee chez un partenaire, sans changer le prix affiche par ce partenaire."],
          ["Donnees MVP", "Les routes, compagnies, prix et horaires visibles dans ce prototype sont mockes et ne constituent pas une disponibilite garantie."]
        ].map(([title, body]) => (
          <section key={title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
            <ShieldCheck className="h-5 w-5 text-petrol" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-semibold text-ink">{title}</h2>
            <p className="mt-3 text-base leading-7 text-ink/70">{body}</p>
          </section>
        ))}

        <div className="rounded-lg bg-marine p-6 text-white">
          <h2 className="text-2xl font-semibold">Formulation claire</h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Nous utilisons des CTA comme "Comparer les prix", "Voir les disponibilites" et "Reserver chez notre partenaire".
            Le partenaire assure la reservation, le paiement, le billet et le service apres-vente.
          </p>
          <Link
            href="/recherche"
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white"
          >
            Comparer les prix
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </div>
  );
}
