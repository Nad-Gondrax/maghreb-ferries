import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/seo";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {})
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Fil d'Ariane" className="pt-5">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-ink/55">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href} className="transition hover:text-petrol">{item.label}</Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink/75">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
