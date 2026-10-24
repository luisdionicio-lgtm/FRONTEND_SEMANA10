import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = new URLSearchParams();
  for (const key of ["name", "status", "type", "gender"]) {
    const value = request.nextUrl.searchParams.get(key)?.trim() ?? "";
    if (value.length > 100)
      return NextResponse.json(
        { error: "Filtro demasiado largo" },
        { status: 400 },
      );
    if (value) query.set(key, value);
  }
  const page = request.nextUrl.searchParams.get("page") ?? "1";
  if (!/^[1-9]\d{0,4}$/.test(page))
    return NextResponse.json({ error: "Página inválida" }, { status: 400 });
  if (
    query.has("status") &&
    !["alive", "dead", "unknown"].includes(query.get("status")!)
  )
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  if (
    query.has("gender") &&
    !["female", "male", "genderless", "unknown"].includes(query.get("gender")!)
  )
    return NextResponse.json({ error: "Género inválido" }, { status: 400 });
  query.set("page", page);
  try {
    // Fixed upstream: user input can never select a host or a path (SSRF protection).
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?${query}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      },
    );
    if (response.status === 404)
      return NextResponse.json({
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      });
    if (!response.ok)
      return NextResponse.json(
        { error: "Servicio no disponible" },
        { status: 502 },
      );
    return NextResponse.json(await response.json(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con la API" },
      { status: 502 },
    );
  }
}
