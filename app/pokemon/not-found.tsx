import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";

export default function PokemonNotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center text-white">
      <IoSearchOutline
        size={64}
        className="mx-auto mb-6 text-purple-300"
        aria-hidden
      />
      <p className="mb-3 font-mono text-purple-300">404</p>
      <h1 className="mb-4 text-3xl font-bold">Pokémon no encontrado</h1>
      <p className="mb-8 text-purple-100">
        No existe un Pokémon con ese nombre. Vuelve a la lista para elegir uno.
      </p>
      <Link
        href="/pokemon"
        className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-purple-950 hover:bg-purple-100"
      >
        Volver al Pokédex
      </Link>
    </main>
  );
}
