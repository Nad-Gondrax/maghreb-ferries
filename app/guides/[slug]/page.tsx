import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadCaptureCard } from "@/components/LeadCaptureCard";
import { getGuide, guideArticles } from "@/lib/guides";
import { absoluteUrl, canonical } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guideArticles.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    ...canonical(guide.href),
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url: absoluteUrl(guide.href),
      type: "article"
    }
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <div className="container-page py-10 md:py-14">
      <div className="-mt-10 mb-7 md:-mt-14">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Guides et conseils", href: "/guides" }, { label: guide.h1 }]} />
      </div>
      <article className="mx-auto max-w-4xl space-y-10">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-petrol">{guide.tag}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">{guide.h1}</h1>
          <p className="mt-4 text-base leading-7 text-ink/70">{guide.excerpt}</p>
        </header>
        <div className="space-y-5">
          {guide.sections.map((section) => (
            <section key={section.title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-ink">{section.title}</h2>
              <p className="mt-3 text-base leading-7 text-ink/70">{section.body}</p>
            </section>
          ))}
        </div>
        <FAQ items={guide.faqs} />
        <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-ink">Comparer avant de reserver</h2>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            Verifiez les prix, les cabines et les conditions chez le partenaire de reservation avant toute decision.
          </p>
          <Link
            href="/recherche"
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white"
          >
            Comparer les prix
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <LeadCaptureCard route={guide.slug} />
      </article>
    </div>
  );
}
