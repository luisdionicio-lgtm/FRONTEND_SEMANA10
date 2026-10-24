import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import type {
  Pokemon,
  PokemonListResponse,
  SimplePokemon,
} from "@/types/pokemon";

const API = "https://pokeapi.co/api/v2/pokemon";
const options = { next: { revalidate: 86400 } };

export async function getPokemons(): Promise<SimplePokemon[]> {
  const response = await fetch(`${API}?limit=151`, options);
  if (!response.ok) throw new Error("Error al cargar la lista de Pokémon");
  const data: PokemonListResponse = await response.json();
  return data.results.map(({ name, url }) => ({
    name,
    id: Number(url.split("/").filter(Boolean).pop()),
  }));
}

// Share the request between the detail page and its metadata.
export const getPokemon = cache(async (name: string): Promise<Pokemon> => {
  if (!/^[a-z0-9-]+$/.test(name)) notFound();
  const response = await fetch(`${API}/${encodeURIComponent(name)}`, options);
  if (response.status === 404) notFound();
  if (!response.ok) throw new Error("Error al cargar el Pokémon");
  return response.json();
});
