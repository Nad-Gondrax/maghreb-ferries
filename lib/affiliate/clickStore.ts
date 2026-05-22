import { hasSupabaseStorage, insertSupabaseRow, listSupabaseRows } from "@/lib/storage/supabaseRest";

export type AffiliateClick = {
  route: string;
  provider: string;
  href: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  createdAt: string;
};

const clicks: AffiliateClick[] = [];

const toDatabaseClick = (click: AffiliateClick) => ({
  route: click.route,
  provider: click.provider,
  href: click.href,
  referrer: click.referrer ?? null,
  user_agent: click.userAgent ?? null,
  ip: click.ip ?? null,
  created_at: click.createdAt
});

const fromDatabaseClick = (click: {
  route: string;
  provider: string;
  href: string;
  referrer?: string | null;
  user_agent?: string | null;
  ip?: string | null;
  created_at: string;
}): AffiliateClick => ({
  route: click.route,
  provider: click.provider,
  href: click.href,
  referrer: click.referrer ?? undefined,
  userAgent: click.user_agent ?? undefined,
  ip: click.ip ?? undefined,
  createdAt: click.created_at
});

export async function trackAffiliateClick(click: Omit<AffiliateClick, "createdAt">) {
  const saved = { ...click, createdAt: new Date().toISOString() };

  if (hasSupabaseStorage()) {
    const databaseClick = await insertSupabaseRow("affiliate_clicks", toDatabaseClick(saved));
    return fromDatabaseClick(databaseClick as Parameters<typeof fromDatabaseClick>[0]);
  }

  clicks.push(saved);
  return saved;
}

export async function listAffiliateClicks() {
  if (hasSupabaseStorage()) {
    const databaseClicks =
      await listSupabaseRows<Parameters<typeof fromDatabaseClick>[0]>("affiliate_clicks");
    return databaseClicks.map(fromDatabaseClick);
  }

  return clicks;
}
