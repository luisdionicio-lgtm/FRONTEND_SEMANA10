"use client";
import { useEffect, useState } from "react";
import {
  IoSearchOutline,
  IoClose,
  IoArrowBack,
  IoArrowForward,
  IoRefresh,
} from "react-icons/io5";
import type { CharacterResponse } from "@/types/character";
import CharacterCard from "./character-card";

type Filters = { name: string; status: string; type: string; gender: string };
const empty: Filters = { name: "", status: "", type: "", gender: "" };

export default function Explorer({
  initial,
  showHeading = true,
}: {
  initial: CharacterResponse;
  showHeading?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>(empty);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const query = new URLSearchParams({
    ...filters,
    page: String(page),
  }).toString();

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      if (
        query === new URLSearchParams({ ...empty, page: "1" }).toString() &&
        retry === 0
      ) {
        setResult(initial);
        setError("");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/characters?${query}`, {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error("El portal no pudo conectar. Intenta nuevamente.");
        const data: CharacterResponse = await response.json();
        if (!controller.signal.aborted) setResult(data);
      } catch (cause) {
        if (!controller.signal.aborted)
          setError(
            cause instanceof Error ? cause.message : "Ocurrió un error.",
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, initial, retry]);

  function update(key: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }
  function reset() {
    setFilters(empty);
    setPage(1);
  }
  const active = Object.values(filters).some(Boolean);

  return (
    <section
      id="explorar"
      className="explorer shell"
      aria-labelledby={showHeading ? "explore-title" : undefined}
      aria-label={showHeading ? undefined : "Explorar personajes"}
    >
      {showHeading && (
        <div className="section-heading">
          <div>
            <p className="eyebrow">ARCHIVO INTERDIMENSIONAL</p>
            <h2 id="explore-title">
              Encuentra tu próximo <em>personaje.</em>
            </h2>
          </div>
          <p>
            De la Tierra a los rincones más extraños
            <br className="desktop-break" /> del multiverso. Todos están aquí.
          </p>
        </div>
      )}
      <form
        className="filter-panel"
        onSubmit={(event) => event.preventDefault()}
        role="search"
        aria-label="Buscar personajes"
      >
        <label className="search-field">
          <IoSearchOutline aria-hidden="true" />
          <span className="sr-only">Nombre del personaje</span>
          <input
            value={filters.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Busca a Rick, Morty, Summer…"
            maxLength={100}
          />
          {filters.name && (
            <button
              type="button"
              onClick={() => update("name", "")}
              aria-label="Borrar nombre"
            >
              <IoClose />
            </button>
          )}
        </label>
        <div className="filter-row">
          <label>
            ESTADO
            <select
              value={filters.status}
              onChange={(e) => update("status", e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </select>
          </label>
          <label>
            GÉNERO
            <select
              value={filters.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">Todos los géneros</option>
              <option value="female">Femenino</option>
              <option value="male">Masculino</option>
              <option value="genderless">Sin género</option>
              <option value="unknown">Desconocido</option>
            </select>
          </label>
          <label>
            TIPO
            <input
              value={filters.type}
              onChange={(e) => update("type", e.target.value)}
              placeholder="Ej. Robot, Parasite…"
              maxLength={100}
            />
          </label>
          <button
            type="button"
            className="reset-button"
            onClick={reset}
            disabled={!active}
          >
            <IoRefresh /> Limpiar filtros
          </button>
        </div>
      </form>
      <div className="results-meta" aria-live="polite" role="status">
        <span>
          {loading ? (
            "Buscando en el multiverso…"
          ) : error ? (
            "Conexión interrumpida"
          ) : (
            <>
              <strong>{result.info.count}</strong> personajes{" "}
              {active ? "encontrados" : "por descubrir"}
            </>
          )}
        </span>
        <span>
          PÁGINA {page} / {Math.max(1, result.info.pages)}
        </span>
      </div>
      {error ? (
        <div className="empty-state" role="alert">
          <h3>Houston, tenemos un portal cerrado.</h3>
          <p>{error}</p>
          <button
            className="button button-lime"
            onClick={() => setRetry((n) => n + 1)}
          >
            Reintentar
          </button>
        </div>
      ) : result.results.length === 0 ? (
        <div className="empty-state">
          <span className="empty-orbit" aria-hidden="true">
            ◎
          </span>
          <h3>Sin señales de vida por aquí.</h3>
          <p>
            Prueba otro nombre o cambia los filtros para abrir un nuevo portal.
          </p>
          <button className="button button-lime" onClick={reset}>
            Ver todos los personajes
          </button>
        </div>
      ) : (
        <div
          className={`character-grid ${loading ? "is-loading" : ""}`}
          aria-busy={loading}
        >
          {result.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
      {!error && result.info.pages > 1 && (
        <nav className="pagination" aria-label="Páginas de personajes">
          <button
            disabled={loading || page <= 1}
            onClick={() => setPage((n) => n - 1)}
          >
            <IoArrowBack /> Anterior
          </button>
          <span>
            <strong>{page}</strong> de {result.info.pages}
          </span>
          <button
            disabled={loading || page >= result.info.pages}
            onClick={() => setPage((n) => n + 1)}
          >
            Siguiente <IoArrowForward />
          </button>
        </nav>
      )}
    </section>
  );
}
