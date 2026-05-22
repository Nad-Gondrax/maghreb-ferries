export function isAdminRequest(request: Request) {
  const adminToken = process.env.ADMIN_API_TOKEN;
  if (!adminToken) return true;

  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : undefined;

  return bearerToken === adminToken || request.headers.get("x-admin-token") === adminToken;
}
