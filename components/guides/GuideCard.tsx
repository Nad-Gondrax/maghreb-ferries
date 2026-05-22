import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type GuideCardItem = {
  title: string;
  href: string;
  excerpt: string;
  tag: string;
};

export function GuideCard({ guide }: { guide: GuideCardItem }) {
  return (
    <Link href={guide.href} className="group rounded-lg border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-petrol">{guide.tag}</span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{guide.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/65">{guide.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-coral">
        Lire le guide
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
