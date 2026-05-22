"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import type { Port, VehicleType } from "@/lib/ferry/types";
import { DateSelector } from "./DateSelector";
import { PortSelector } from "./PortSelector";
import { VehicleSelector } from "./VehicleSelector";

type SearchBoxProps = {
  ports: Port[];
  compact?: boolean;
  defaultFrom?: string;
  defaultTo?: string;
};

export function SearchBox({ ports, compact = false, defaultFrom, defaultTo }: SearchBoxProps) {
  const router = useRouter();
  const gridClass = compact
    ? "grid gap-3 md:grid-cols-2 xl:grid-cols-4"
    : "grid gap-4 sm:grid-cols-2";

  function onSubmit(formData: FormData) {
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      const text = String(value);
      if (text) params.set(key, text);
    }
    router.push(`/recherche?${params.toString()}`);
  }

  return (
    <form
      action={onSubmit}
      className="rounded-lg border border-ink/10 bg-white/95 p-4 shadow-soft md:p-6"
    >
      <div className={gridClass}>
        <PortSelector name="from" label="Depart" placeholder="Marseille, Sete, Algesiras..." ports={ports} defaultValue={defaultFrom} />
        <PortSelector name="to" label="Arrivee" placeholder="Tanger Med, Nador, Alger..." ports={ports} defaultValue={defaultTo} />
        <DateSelector name="departureDate" label="Date aller" required />
        <DateSelector name="returnDate" label="Retour optionnel" />
        <label className="block">
          <span className="text-sm font-medium text-ink/70">Passagers</span>
          <input
            name="passengers"
            type="number"
            min={1}
            defaultValue={4}
            className="focus-ring mt-2 h-12 w-full rounded-lg border border-ink/10 bg-white px-4 text-base text-ink shadow-sm"
          />
        </label>
        <VehicleSelector defaultValue={"car" as VehicleType} />
        <button
          type="submit"
          className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-lg bg-coral px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#df5f3d] sm:col-span-2 xl:col-span-2"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="whitespace-nowrap">Comparer les traversees</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
