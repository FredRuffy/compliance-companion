export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  return Response.json({ ok: true, echo: body?.message ?? null });
}

