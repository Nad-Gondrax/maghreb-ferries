import Link from "next/link";

export function MobileBottomCTA({ href = "/recherche", label = "Comparer les traversees" }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 shadow-soft backdrop-blur md:hidden">
      <Link
        href={href}
        className="focus-ring block rounded-lg bg-coral px-5 py-3 text-center text-sm font-semibold text-white"
      >
        {label}
      </Link>
    </div>
  );
}
