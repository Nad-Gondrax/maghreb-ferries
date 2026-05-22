import { hasSupabaseStorage, insertSupabaseRow, listSupabaseRows } from "@/lib/storage/supabaseRest";

export type Lead = {
  email: string;
  whatsapp?: string;
  route?: string;
  consent: boolean;
  source?: string;
  createdAt: string;
};

const leads: Lead[] = [];

const toDatabaseLead = (lead: Lead) => ({
  email: lead.email,
  whatsapp: lead.whatsapp ?? null,
  route: lead.route ?? null,
  consent: lead.consent,
  source: lead.source ?? "price_alert",
  created_at: lead.createdAt
});

const fromDatabaseLead = (lead: {
  email: string;
  whatsapp?: string | null;
  route?: string | null;
  consent: boolean;
  source?: string | null;
  created_at: string;
}): Lead => ({
  email: lead.email,
  whatsapp: lead.whatsapp ?? undefined,
  route: lead.route ?? undefined,
  consent: lead.consent,
  source: lead.source ?? undefined,
  createdAt: lead.created_at
});

export async function addLead(lead: Omit<Lead, "createdAt">) {
  const saved = { ...lead, createdAt: new Date().toISOString() };
  if (hasSupabaseStorage()) {
    const databaseLead = await insertSupabaseRow("leads", toDatabaseLead(saved));
    return fromDatabaseLead(databaseLead as Parameters<typeof fromDatabaseLead>[0]);
  }

  leads.push(saved);
  return saved;
}

export async function listLeads() {
  if (hasSupabaseStorage()) {
    const databaseLeads = await listSupabaseRows<Parameters<typeof fromDatabaseLead>[0]>("leads");
    return databaseLeads.map(fromDatabaseLead);
  }

  return leads;
}
