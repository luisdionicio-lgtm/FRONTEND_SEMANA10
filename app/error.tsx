"use client";
import Link from "next/link";
export default function ErrorPage({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <main className="portal-site standalone-state">
      <span className="empty-orbit">◎</span>
      <p className="eyebrow">SEÑAL INTERRUMPIDA</p>
      <h1>El portal necesita un respiro.</h1>
      <p>
        No pudimos conectar con el archivo. Vuelve a intentarlo en un momento.
      </p>
      <button className="button button-lime" onClick={retry}>
        Reintentar conexión
      </button>
      <Link href="/pokemon" className="text-link">
        Visitar la Pokédex
      </Link>
    </main>
  );
}
