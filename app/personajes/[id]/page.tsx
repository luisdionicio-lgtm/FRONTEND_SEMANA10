import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/site-shell";
import { Status } from "@/components/character-card";
import Carousel from "@/components/carousel";
import { getAllCharacters, getCharacter, getEpisodes } from "@/lib/characters";

export const revalidate = 864000;
export async function generateStaticParams() {
  const [characters] = await Promise.all([getAllCharacters(), getEpisodes()]);
  return characters.map(({ id }) => ({ id: String(id) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const character = await getCharacter((await params).id);
  return {
    title: `${character.name} | Portal 137`,
    description: `Conoce a ${character.name}: ${character.species}, ${character.origin.name}.`,
  };
}
export default async function CharacterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const character = await getCharacter((await params).id);
  const all = await getAllCharacters();
  const episodeData = await getEpisodes();
  const episodes = character.episode.map(
    (url) =>
      episodeData.find((item) => item.url === url) ?? {
        id: Number(url.split("/").pop()),
        name: "Información adicional no disponible",
        air_date: "Fecha no disponible",
        episode: "EPISODIO",
        url,
      },
  );
  const index = all.findIndex((item) => item.id === character.id);
  const previous = all[index - 1];
  const next = all[index + 1];
  const fields = [
    ["Especie", character.species],
    ["Género", character.gender],
    ["Tipo / subespecie", character.type || "Sin tipo especificado"],
    ["Origen", character.origin.name],
    ["Última ubicación", character.location.name],
    ["Apariciones", `${character.episode.length} episodios`],
  ];
  return (
    <div
      className="portal-site portal-v2 antialiased selection:bg-lime-300 selection:text-black"
      id="top"
    >
      <Header />
      <main className="detail-main shell">
        <Link className="text-link" href="/personajes">
          ← Volver a personajes
        </Link>
        <div className="detail-grid">
          <div className="detail-portrait">
            <Image
              src={character.image}
              alt={character.name}
              width={600}
              height={600}
              loading="eager"
              sizes="(max-width: 800px) 90vw, 45vw"
            />
            <span className="portrait-stamp">
              ARCHIVO #{String(character.id).padStart(3, "0")} · MULTIVERSO
            </span>
          </div>
          <section className="detail-copy">
            <p className="eyebrow">
              EXPEDIENTE INTERDIMENSIONAL #{character.id}
            </p>
            <Status value={character.status} />
            <h1>{character.name}</h1>
            <p className="detail-subtitle">
              Cada dimensión tiene sus protagonistas. Este es uno de ellos.
            </p>
            <dl className="detail-facts">
              {fields.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
        <section className="episode-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HUELLAS EN EL MULTIVERSO</p>
              <h2>
                Sus <em>apariciones.</em>
              </h2>
            </div>
            <p>{character.episode.length} registros en el archivo</p>
          </div>
          <Carousel label="Episodios del personaje">
            {episodes.map((episode) => (
              <a
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="episode-card"
                key={episode.id}
              >
                <span>
                  {episode.episode} · EPISODIO {episode.id}
                </span>
                <strong>{String(episode.id).padStart(2, "0")}</strong>
                <h3>{episode.name}</h3>
                <small>{episode.air_date}</small>
                <p>
                  Consultar episodio <span aria-hidden="true">↗</span>
                </p>
              </a>
            ))}
          </Carousel>
        </section>
        <details className="technical-data">
          <summary>Ver todos los datos del expediente</summary>
          <dl>
            <div>
              <dt>ID</dt>
              <dd>{character.id}</dd>
            </div>
            <div>
              <dt>Fecha de creación del registro</dt>
              <dd>
                {new Date(character.created).toLocaleString("es-PE", {
                  timeZone: "UTC",
                })}{" "}
                UTC
              </dd>
            </div>
            {[
              ["URL del personaje", character.url],
              ["Imagen original", character.image],
              ["URL de origen", character.origin.url],
              ["URL de ubicación", character.location.url],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {value ? (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    "No disponible en la API"
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </details>
        <nav
          className="detail-navigation"
          aria-label="Navegar entre personajes"
        >
          {previous ? (
            <Link href={`/personajes/${previous.id}`} prefetch={false}>
              ← {previous.name}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/personajes/${next.id}`} prefetch={false}>
              {next.name} →
            </Link>
          )}
        </nav>
      </main>
      <Footer />
    </div>
  );
}
