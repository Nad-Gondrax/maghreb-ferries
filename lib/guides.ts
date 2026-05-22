import type { GuideCardItem } from "@/components/guides/GuideCard";

export type GuideArticle = GuideCardItem & {
  slug: string;
  h1: string;
  sections: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const guideArticles: GuideArticle[] = [
  {
    slug: "quelle-route-choisir",
    href: "/guides/quelle-route-choisir",
    title: "Quelle route choisir pour aller au Maghreb ?",
    h1: "Quelle route choisir pour aller au Maghreb ?",
    tag: "Decision",
    excerpt: "Comparer la route la plus simple selon votre ville de depart, la voiture, les enfants et la saison.",
    sections: [
      { title: "Commencer par la conduite totale", body: "Le meilleur ferry n'est pas toujours le moins cher. Pour une famille avec voiture, additionnez la route avant le port, la traversee, puis la route apres l'arrivee." },
      { title: "Arbitrer prix et fatigue", body: "Les ports espagnols peuvent reduire le prix et le temps en mer, mais augmentent souvent la conduite. Les ports francais reduisent la route et facilitent les bagages." },
      { title: "Regarder l'arrivee", body: "Tanger Med est efficace pour le nord et l'ouest du Maroc. Nador convient mieux au Rif et au Maroc oriental. Tunis, Alger, Oran ou Bejaia se choisissent surtout selon la destination familiale finale." }
    ],
    faqs: [
      { question: "Faut-il privilegier le prix ou le confort ?", answer: "En ete et avec enfants, le confort et les horaires peuvent valoir plus que quelques euros d'ecart." },
      { question: "Les disponibilites affichees sont-elles garanties ?", answer: "Non, les donnees du MVP sont des exemples. La disponibilite reelle doit etre verifiee chez le partenaire." }
    ]
  },
  {
    slug: "quelle-route-maroc-voiture",
    href: "/guides/quelle-route-maroc-voiture",
    title: "Quelle route choisir pour aller au Maroc en voiture ?",
    h1: "Quelle route choisir pour aller au Maroc en voiture ?",
    tag: "Maroc",
    excerpt: "Sete, Marseille, Algesiras, Almeria : les compromis selon votre ville et votre destination.",
    sections: [
      { title: "Depuis la France", body: "Sete -> Nador et Marseille -> Tanger Med sont rassurantes pour limiter la conduite. Elles conviennent bien aux familles chargees." },
      { title: "Depuis l'Espagne", body: "Algesiras -> Tanger Med est tres court en mer. Almeria -> Nador peut etre interessant pour le budget et pour rejoindre le Maroc oriental." },
      { title: "Avec enfants", body: "Sur les longues traversees, une cabine change fortement l'experience. Verifiez aussi les horaires d'embarquement et le temps d'attente au port." }
    ],
    faqs: [
      { question: "Tanger Med ou Nador avec voiture ?", answer: "Nador est plus logique pour le Rif et l'est du Maroc. Tanger Med est souvent plus flexible pour le nord, Rabat, Casablanca et le sud." },
      { question: "Faut-il reserver tot pour l'ete ?", answer: "Oui, surtout avec voiture, cabine ou dates proches des vacances scolaires." }
    ]
  },
  {
    slug: "ferry-maroc-avec-voiture",
    href: "/guides/ferry-maroc-avec-voiture",
    title: "Ferry Maroc avec voiture : conseils pratiques",
    h1: "Ferry Maroc avec voiture : conseils pratiques",
    tag: "Voiture",
    excerpt: "Dimensions du vehicule, bagages, arrivee au port et documents a verifier avant de partir.",
    sections: [
      { title: "Verifier le vehicule", body: "Indiquez le type exact : voiture, utilitaire, moto, remorque ou coffre de toit. Les dimensions peuvent changer le prix." },
      { title: "Preparer l'embarquement", body: "Gardez passeports, billets partenaire, documents du vehicule et affaires essentielles accessibles, pas au fond du coffre." },
      { title: "Penser au retour", body: "Les retours d'ete se remplissent vite. Une alerte prix aide a suivre les ouvertures et les variations." }
    ],
    faqs: [
      { question: "Peut-on dormir dans la voiture ?", answer: "Les regles dependent de la compagnie et du bateau. Pour les longs trajets, une cabine reste le choix le plus confortable." },
      { question: "Le site encaisse-t-il le billet ?", answer: "Non. Maghreb Ferries compare et renvoie vers des partenaires de reservation." }
    ]
  },
  {
    slug: "tanger-med-ou-nador",
    href: "/guides/tanger-med-ou-nador",
    title: "Tanger Med ou Nador : quel port choisir ?",
    h1: "Tanger Med ou Nador : quel port choisir ?",
    tag: "Ports",
    excerpt: "Choisir le bon port marocain selon votre destination finale et votre tolerance a la conduite.",
    sections: [
      { title: "Tanger Med", body: "Tanger Med est souvent le plus flexible pour le nord-ouest du Maroc et les arrivees depuis Algesiras, Sete, Marseille ou Barcelone." },
      { title: "Nador", body: "Nador est tres pertinent pour le Maroc oriental, le Rif et les familles qui veulent arriver plus pres de leur destination finale." },
      { title: "Le bon calcul", body: "Comparez le prix du ferry avec carburant, peages, fatigue et temps de route apres l'arrivee." }
    ],
    faqs: [
      { question: "Quel port est le plus rapide ?", answer: "Algesiras -> Tanger Med est tres court en mer, mais le trajet routier jusqu'a Algesiras doit etre compte." },
      { question: "Quel port choisir pour Oujda ?", answer: "Nador est souvent plus coherent pour l'est du Maroc." }
    ]
  },
  {
    slug: "quand-reserver-ferry-ete",
    href: "/guides/quand-reserver-ferry-ete",
    title: "Quand reserver son ferry pour l'ete ?",
    h1: "Quand reserver son ferry pour l'ete ?",
    tag: "Ete",
    excerpt: "Anticiper les ouvertures, eviter les dates tendues et suivre les prix sans stress.",
    sections: [
      { title: "Les dates sensibles", body: "Les departs de fin juin, juillet, debut aout et les retours de fin aout sont souvent les plus tendus." },
      { title: "Cabine et voiture", body: "Ce sont les deux options qui rendent la reservation plus sensible. Plus vos criteres sont stricts, plus il faut anticiper." },
      { title: "Alertes", body: "Pour le MVP, l'alerte prix enregistre votre demande localement. L'objectif futur est de prevenir quand les partenaires ouvrent les traversees." }
    ],
    faqs: [
      { question: "Les prix baissent-ils toujours ?", answer: "Non. Sur les periodes tres demandees, attendre peut reduire le choix." },
      { question: "Dois-je choisir un aller-retour ?", answer: "Si vos dates sont fixes, l'aller-retour simplifie souvent l'organisation familiale." }
    ]
  },
  {
    slug: "cabine-ou-siege",
    href: "/guides/cabine-ou-siege",
    title: "Cabine ou siege : que choisir ?",
    h1: "Cabine ou siege : que choisir ?",
    tag: "Confort",
    excerpt: "Le bon niveau de confort selon la duree, les enfants, le budget et l'horaire.",
    sections: [
      { title: "Trajet long", body: "Au-dela d'une nuit en mer, une cabine apporte du repos, de l'intimite et une meilleure gestion des enfants." },
      { title: "Trajet court", body: "Sur Algesiras -> Tanger Med ou Tarifa -> Tanger Ville, un siege peut suffire selon l'horaire." },
      { title: "Budget famille", body: "Comparez le surcout cabine avec la fatigue evitee et l'arrivee plus sereine." }
    ],
    faqs: [
      { question: "La cabine est-elle indispensable avec enfants ?", answer: "Pas toujours, mais elle devient tres utile sur les longues traversees de nuit." },
      { question: "Peut-on ajouter une cabine plus tard ?", answer: "Cela depend des disponibilites chez le partenaire. Mieux vaut verifier tot." }
    ]
  }
];

export function getGuide(slug: string) {
  return guideArticles.find((guide) => guide.slug === slug);
}
