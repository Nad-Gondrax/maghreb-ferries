type SupabaseInsertResult<T> = {
  data?: T[];
  error?: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabaseStorage() {
  return Boolean(supabaseUrl && serviceRoleKey);
}

export async function insertSupabaseRow<T extends Record<string, unknown>>(
  table: string,
  row: T
): Promise<T> {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase storage is not configured.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(row),
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => ({}))) as SupabaseInsertResult<T>;
  if (!response.ok) {
    throw new Error(payload.error ?? `Supabase insert failed for ${table}.`);
  }

  return payload.data?.[0] ?? row;
}

export async function listSupabaseRows<T>(table: string, limit = 100): Promise<T[]> {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase storage is not configured.");
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${table}?select=*&order=created_at.desc&limit=${limit}`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Supabase select failed for ${table}.`);
  }

  return (await response.json()) as T[];
}
