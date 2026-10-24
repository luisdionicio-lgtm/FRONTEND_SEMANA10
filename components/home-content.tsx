import Image from "next/image";
import Link from "next/link";
import { IoArrowForward, IoArrowDown, IoPlanetOutline } from "react-icons/io5";
import type { CharacterResponse } from "@/types/character";
import { Header, Footer } from "./site-shell";
import Explorer from "./explorer";
import Carousel from "./carousel";
import CharacterCard from "./character-card";
import CharacterSpotlight from "./character-spotlight";
import PortalJump from "./portal-jump";

export default function HomeContent({ data }: { data: CharacterResponse }) {
  return (
    <div
      className="portal-site portal-v2 antialiased selection:bg-lime-300 selection:text-black"
      id="top"
    >
      <Header />
      <main>
        <section className="cinema-hero" aria-labelledby="hero-title">
          <div className="cosmic-scene" aria-hidden="true">
            <Image
              src="/images/portal-universe.webp"
              alt=""
              fill
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className="cosmic-image"
            />
            <div className="cosmic-shade" />
            <div className="portal-halo" />
            <div className="cosmic-grain" />
          </div>
          <div className="shell cinema-content">
            <div className="hero-signal">
              <span className="live-dot" />
              <span>SEÑAL ESTABLE</span>
              <span className="signal-divider" /> DIMENSIÓN C-137
            </div>
            <p className="hero-kicker">RICK & MORTY / ARCHIVO DEL MULTIVERSO</p>
            <h1 id="hero-title">
              Fuera de
              <br />
              lo{" "}
              <span className="hero-word">
                normal
                <span className="word-star" aria-hidden="true">
                  ✳
                </span>
              </span>
              <span className="hero-period">.</span>
            </h1>
            <p className="cinema-description">
              Un científico. Un nieto. Infinitas formas de romper la realidad.
              Cruza el portal y descubre a quienes habitan el caos.
            </p>
            <div className="hero-actions">
              <a href="#explorar" className="button button-lime">
                Entrar al multiverso <IoArrowForward />
              </a>
              <PortalJump pages={data.info.pages} />
            </div>
            <div className="hero-proof">
              <div className="proof-avatars">
                {data.results.slice(0, 4).map((character) => (
                  <Image
                    key={character.id}
                    src={`/images/crew/${character.id}.jpg`}
                    alt=""
                    width={36}
                    height={36}
                  />
                ))}
              </div>
              <p>
                <strong>{data.info.count} historias por descubrir.</strong>
                <span>La tuya empieza aquí.</span>
              </p>
            </div>
          </div>
          <div className="portal-coordinate">
            <span>↗</span>
            <div>
              <small>PORTAL ACTIVO</small>
              <strong>DESTINO: DESCONOCIDO</strong>
            </div>
            <i />
          </div>
          <div className="hero-bottom shell">
            <a href="#protagonistas">
              SCROLL PARA EXPLORAR <IoArrowDown />
            </a>
            <span>
              35° 12′ N · 137° 00′ E <span aria-hidden="true">✦</span> MÁS ALLÁ
              DE LO POSIBLE
            </span>
          </div>
        </section>
        <div className="dimension-marquee" aria-hidden="true">
          <div>
            {[0, 1].map((index) => (
              <span key={index}>
                WUBBA LUBBA DUB DUB <b>✳</b> NO HAY UN PLANETA B <b>✳</b>{" "}
                EXPLORA LO IMPOSIBLE <b>✳</b>{" "}
              </span>
            ))}
          </div>
        </div>
        <section className="universe-intro shell" id="protagonistas">
          <div>
            <span className="section-number">/ ARCHIVO 137</span>
            <h2>
              El universo es enorme.
              <br />
              <span>Tu curiosidad, también.</span>
            </h2>
          </div>
          <div className="universe-stats">
            <div>
              <strong>
                {data.info.count}
                <em>+</em>
              </strong>
              <span>PERSONAJES</span>
            </div>
            <div>
              <strong>∞</strong>
              <span>POSIBILIDADES</span>
            </div>
            <div>
              <strong>01</strong>
              <span>PUNTO DE PARTIDA</span>
            </div>
          </div>
        </section>
        <CharacterSpotlight characters={data.results.slice(0, 5)} />
        <section className="featured shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / ENCUENTROS INESPERADOS</p>
              <h2>
                No todos los héroes
                <br />
                <em>son de este planeta.</em>
              </h2>
            </div>
            <a href="#explorar" className="text-link">
              Ver todos los personajes <IoArrowForward />
            </a>
          </div>
          <Carousel label="Personajes destacados">
            {data.results.slice(5, 13).map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </Carousel>
        </section>
        <Explorer initial={data} />
        <section className="universe-crossover shell">
          <div className="crossover-orbit" aria-hidden="true">
            <IoPlanetOutline />
            <span>
              OTRO UNIVERSO
              <br />
              TE ESTÁ ESPERANDO
            </span>
          </div>
          <div>
            <p className="eyebrow">LA AVENTURA NO TERMINA AQUÍ</p>
            <h2>
              Un portal.
              <br />
              <em>Otro mundo.</em>
            </h2>
            <p>
              Del multiverso a Kanto. Descubre los 151 Pokémon originales en
              nuestro segundo archivo.
            </p>
            <Link href="/pokemon" className="button button-lime">
              Abrir la Pokédex <IoArrowForward />
            </Link>
          </div>
          <span className="crossover-star" aria-hidden="true">
            ✳
          </span>
        </section>
      </main>
      <Footer />
    </div>
  );
}
