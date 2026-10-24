"use client";

import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";

export default function PokemonError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <main
      className="mx-auto max-w-xl px-6 py-24 text-center text-white"
      role="alert"
    >
      <IoWarningOutline
        className="mx-auto mb-6 text-yellow-300"
        size={64}
        aria-hidden
      />
      <h1 className="mb-4 text-3xl font-bold">No pudimos cargar los Pokémon</h1>
      <p className="mb-8 text-purple-100">
        Hubo un problema al consultar la PokéAPI. Inténtalo nuevamente.
      </p>
      <button
        onClick={retry}
        className="rounded-lg bg-white px-6 py-3 font-bold text-purple-950 hover:bg-purple-100"
      >
        Reintentar
      </button>
      <Link href="/pokemon" className="mt-6 block underline">
        Volver al Pokédex
      </Link>
    </main>
  );
}
