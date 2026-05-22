"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

export function LeadCaptureCard({ route }: { route?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        whatsapp: formData.get("whatsapp"),
        route,
        consent: formData.get("consent") === "on"
      })
    });
    setStatus(response.ok ? "success" : "error");
  }

  return (
    <section className="rounded-lg border border-ink/10 bg-marine p-5 text-white shadow-soft md:p-7">
      <div className="flex items-start gap-3">
        <span className="rounded-lg bg-white/10 p-2">
          <Bell className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold">Recevoir une alerte prix</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Nous vous prevenons quand les prix baissent ou quand les traversees d'ete ouvrent.
          </p>
        </div>
      </div>
      <form action={onSubmit} className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="focus-ring h-12 rounded-lg border border-white/15 bg-white px-4 text-ink placeholder:text-ink/35"
        />
        <input
          name="whatsapp"
          type="tel"
          placeholder="WhatsApp optionnel"
          className="focus-ring h-12 rounded-lg border border-white/15 bg-white px-4 text-ink placeholder:text-ink/35"
        />
        <button
          type="submit"
          className="focus-ring h-12 rounded-lg bg-coral px-5 text-sm font-semibold text-white"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi..." : "Creer l'alerte"}
        </button>
        <label className="flex gap-3 text-xs leading-5 text-white/75 md:col-span-3">
          <input name="consent" required type="checkbox" className="mt-1 h-4 w-4 accent-coral" />
          J'accepte d'etre contacte pour cette alerte prix. Aucune reservation ni paiement n'est effectue sur Maghreb Ferries.
        </label>
      </form>
      {status === "success" && <p className="mt-3 text-sm font-medium text-white">Alerte enregistree pour le MVP.</p>}
      {status === "error" && <p className="mt-3 text-sm font-medium text-white">Impossible d'enregistrer l'alerte pour le moment.</p>}
    </section>
  );
}
