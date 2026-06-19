import type { Country } from "./types";

export type CountryLandingPage = {
  slug: string;
  country: Extract<Country, "Maroc" | "Algerie" | "Tunisie">;
  title: string;
  description: string;
  ports: string;
  introduction: string;
  drivingAdvice: string;
  familyAdvice: string;
};

export const countryLandingPages: CountryLandingPage[] = [
  {
    slug: "bateau-maroc",
    country: "Maroc",
    title: "Bateau Maroc avec voiture : routes, ports et comparaison",
    description:
      "Comparez les routes en bateau vers le Maroc depuis la France et l'Espagne : Tanger Med, Nador, voiture, famille et traversees d'ete.",
    ports: "Tanger Med, Tanger Ville et Nador",
    introduction:
      "Pour aller au Maroc en bateau, le meilleur port depend de votre ville de depart et de votre destination finale. Une traversee depuis la France limite la conduite, tandis qu'un depart du sud de l'Espagne raccourcit le temps passe en mer.",
    drivingAdvice:
      "Calculez le trajet complet : carburant, peages, nuits sur la route et kilometres restants apres Tanger Med ou Nador. Le billet le moins cher n'est pas toujours le voyage le moins couteux.",
    familyAdvice:
      "Avec des enfants, une traversee longue avec une option de repos peut etre plus confortable. Depuis l'Espagne, la traversee est courte mais la conduite avant le port est plus importante."
  },
  {
    slug: "bateau-algerie",
    country: "Algerie",
    title: "Bateau Algerie avec voiture : routes depuis France et Espagne",
    description:
      "Comparez les routes en bateau vers l'Algerie : Alger, Oran, Bejaia, Mostaganem, voiture, famille et departs depuis Marseille ou l'Espagne.",
    ports: "Alger, Oran, Bejaia et Mostaganem",
    introduction:
      "Les routes vers l'Algerie permettent de choisir un port proche de votre destination familiale. Marseille propose plusieurs liaisons directes, tandis qu'Alicante et Valence peuvent etre utiles pour l'ouest algerien.",
    drivingAdvice:
      "Choisissez le port d'arrivee en fonction des kilometres a parcourir en Algerie. Pour Oran ou Mostaganem, un depart depuis l'Espagne peut reduire le temps en mer selon votre point de depart.",
    familyAdvice:
      "Sur ces traversees longues, comparez les horaires d'embarquement, les options de repos et la duree totale. Prevoyez aussi une marge d'arrivee au port pendant les periodes d'ete."
  },
  {
    slug: "bateau-tunisie",
    country: "Tunisie",
    title: "Bateau Tunisie avec voiture : routes vers Tunis et Zarzis",
    description:
      "Comparez les routes en bateau vers la Tunisie depuis Marseille et l'Italie : Tunis, Zarzis, voiture, famille et options de confort.",
    ports: "Tunis et Zarzis",
    introduction:
      "Pour rejoindre la Tunisie en bateau, Marseille est souvent le depart le plus lisible depuis la France. Genes et Civitavecchia offrent des alternatives depuis l'Italie selon votre trajet routier.",
    drivingAdvice:
      "Tunis convient a de nombreuses destinations du nord et du centre. Zarzis peut limiter la route a l'arrivee si vous rejoignez le sud tunisien, malgre une traversee maritime plus longue.",
    familyAdvice:
      "La duree rend le confort important : repas, espace de repos et cabine selon le bateau. Comparez ces options apres avoir choisi la traversee et la date."
  }
];

export function getCountryLandingPage(slug: string) {
  return countryLandingPages.find((page) => page.slug === slug);
}
