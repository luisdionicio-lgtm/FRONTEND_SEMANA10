"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoShuffle, IoReload } from "react-icons/io5";
import type { CharacterResponse } from "@/types/character";

export default function PortalJump({ pages }: { pages: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function jump() {
    setBusy(true);
    setError("");
    try {
      const page = 1 + Math.floor(Math.random() * pages);
      const response = await fetch(`/api/characters?page=${page}`, {
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error();
      const data: CharacterResponse = await response.json();
      const character =
        data.results[Math.floor(Math.random() * data.results.length)];
      if (!character) throw new Error();
      router.push(`/personajes/${character.id}`);
    } catch {
      setError("El portal perdió la señal. Prueba otra vez.");
      setBusy(false);
    }
  }
  return (
    <div className="jump-control">
      <button className="button button-outline" disabled={busy} onClick={jump}>
        {busy ? <IoReload className="jump-spinner" /> : <IoShuffle />}
        {busy ? "Localizando dimensión…" : "Sorpréndeme"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
