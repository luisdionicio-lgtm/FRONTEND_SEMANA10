import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import type { Character, CharacterResponse } from "@/types/character";

export const CHARACTER_API = "https://rickandmortyapi.com/api/character";
export const TEN_DAYS = 864000;

// Persistent data cache; independent of whether the consuming page uses SSR or SSG.
export async function getCharacterPage(page = 1): Promise<CharacterResponse> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(`${CHARACTER_API}?page=${page}`, {
      cache: "force-cache",
      next: { revalidate: TEN_DAYS },
      signal: AbortSignal.timeout(20000),
    });
    if (response.ok) return response.json();
    if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 4) {
      throw new Error(
        `No se pudo consultar el archivo (HTTP ${response.status}, página ${page}).`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
  }
  throw new Error("Servicio temporalmente no disponible.");
}

// Bounded parallelism avoids sending hundreds of requests during static generation.
export const getAllCharacters = unstable_cache(
  async (): Promise<Character[]> => {
    const first = await getCharacterPage();
    const characters = [...first.results];
    for (let page = 2; page <= first.info.pages; page += 2) {
      const batch = await Promise.all(
        Array.from(
          { length: Math.min(2, first.info.pages - page + 1) },
          (_, index) => getCharacterPage(page + index),
        ),
      );
      characters.push(...batch.flatMap(({ results }) => results));
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    return characters;
  },
  ["rick-morty-all-characters-v1"],
  { revalidate: TEN_DAYS },
);

export const getCharacter = cache(async (id: string): Promise<Character> => {
  if (!/^[1-9]\d{0,6}$/.test(id)) notFound();
  const characters = await getAllCharacters();
  const character = characters.find((character) => character.id === Number(id));
  if (!character) notFound();
  return character;
});

export const getEpisodes = unstable_cache(
  async (): Promise<import("@/types/character").Episode[]> => {
    const episodes: import("@/types/character").Episode[] = [];
    let page = 1;
    let pages = 1;
    do {
      let data:
        | {
            info: { pages: number };
            results: import("@/types/character").Episode[];
          }
        | undefined;
      for (let attempt = 0; attempt < 5; attempt++) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode?page=${page}`,
          {
            cache: "force-cache",
            next: { revalidate: TEN_DAYS },
            signal: AbortSignal.timeout(20000),
          },
        );
        if (response.ok) {
          data = await response.json();
          break;
        }
        // Episode enrichment must not prevent access to the character's own data.
        if (attempt === 4) return [];
        await new Promise((resolve) =>
          setTimeout(resolve, 800 * (attempt + 1)),
        );
      }
      if (!data) throw new Error("No se pudieron cargar los episodios.");
      pages = data.info.pages;
      episodes.push(...data.results);
      page++;
    } while (page <= pages);
    return episodes;
  },
  ["rick-morty-episodes-v1"],
  { revalidate: TEN_DAYS },
);
