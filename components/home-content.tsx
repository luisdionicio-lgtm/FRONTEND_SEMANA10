import Image from "next/image";
import Link from "next/link";
import { IoArrowForward, IoSparklesOutline } from "react-icons/io5";
import type { CharacterResponse } from "@/types/character";
import { Header, Footer } from "./site-shell";
import Explorer from "./explorer";
import Carousel from "./carousel";
import CharacterCard from "./character-card";

export default function HomeContent({ data }: { data: CharacterResponse }) {
  return (
    <div
      className="portal-site antialiased selection:bg-lime-300 selection:text-black"
      id="top"
    >
      <Header />
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="live-dot" /> TRANSMISIÓN DESDE LA DIMENSIÓN C-137
            </p>
            <h1>
              El multiverso.
              <br />
              Ahora, <em>a tu alcance.</em>
            </h1>
            <p className="hero-description">
              Conoce a las mentes brillantes, criaturas extrañas y héroes
              improbables de Rick y Morty. Tu próximo viaje empieza con un
              personaje.
            </p>
            <div className="hero-actions">
              <a className="button button-lime" href="#explorar">
                Explorar personajes <IoArrowForward />
              </a>
              <Link className="button button-outline" href="/personajes/1">
                Conoce a Rick <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="hero-caption">
              <IoSparklesOutline />
              <span>Sin nave espacial. Sin límites. Solo curiosidad.</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Personajes de Rick y Morty">
            <div className="portal-ring ring-one" />
            <div className="portal-ring ring-two" />
            <span className="orbit-label">COORDENADAS · C-137</span>
            <div className="hero-portrait portrait-rick">
              <Image
                src={data.results[0].image}
                alt="Rick Sanchez"
                width={300}
                height={300}
                loading="eager"
              />
            </div>
            <div className="hero-portrait portrait-morty">
              <Image
                src={data.results[1].image}
                alt="Morty Smith"
                width={300}
                height={300}
              />
            </div>
            <div className="dimension-tag">
              <i />
              <div>
                <small>DESTINO ACTUAL</small>
                <strong>Earth · C-137</strong>
              </div>
              <span>↗</span>
            </div>
            <span className="hero-star star-one">✳</span>
            <span className="hero-star star-two">+</span>
          </div>
        </section>
        <div className="metrics-band">
          <div className="shell metrics">
            <div>
              <strong>
                {data.info.count}
                <span>+</span>
              </strong>
              <p>PERSONAJES ÚNICOS</p>
            </div>
            <div>
              <strong>∞</strong>
              <p>UNIVERSOS POR EXPLORAR</p>
            </div>
            <div>
              <strong>01</strong>
              <p>PORTAL PARA DESCUBRIRLOS</p>
            </div>
            <p className="metrics-note">
              Lo normal es relativo.
              <br />
              <em>Lo extraordinario está aquí.</em>
            </p>
          </div>
        </div>
        <section className="featured shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LOS DE SIEMPRE. NUNCA COMO SIEMPRE.</p>
              <h2>
                El equipo <em>original.</em>
              </h2>
            </div>
            <a href="#explorar" className="text-link">
              Ver el archivo completo <IoArrowForward />
            </a>
          </div>
          <Carousel label="Personajes destacados">
            {data.results.slice(0, 7).map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </Carousel>
        </section>
        <Explorer initial={data} />
        <section className="closing-banner shell">
          <div>
            <p className="eyebrow">HAY OTRO UNIVERSO ESPERANDO</p>
            <h2>
              ¿Y si tu próxima aventura
              <br />
              empieza en una <em>Pokédex?</em>
            </h2>
          </div>
          <Link href="/pokemon" className="button button-lime">
            Explorar Pokémon <IoArrowForward />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
