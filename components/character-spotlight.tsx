"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward, IoPlanetOutline, IoTvOutline } from "react-icons/io5";
import type { Character } from "@/types/character";
import { Status } from "./character-card";

export default function CharacterSpotlight({
  characters,
}: {
  characters: Character[];
}) {
  const [selected, setSelected] = useState(0);
  const character = characters[selected];
  return (
    <section
      className="spotlight-section shell"
      aria-labelledby="spotlight-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / CONOCE A LOS PROTAGONISTAS</p>
          <h2 id="spotlight-title">
            Una familia.
            <br />
            <em>Cero normalidad.</em>
          </h2>
        </div>
        <p>
          Cambia de personaje.
          <br />
          Cada expediente abre otro universo.
        </p>
      </div>
      <div className="spotlight-panel">
        <div className="spotlight-photo" key={character.id}>
          <Image
            src={`/images/crew/${character.id}.jpg`}
            alt={character.name}
            width={600}
            height={600}
            sizes="(max-width: 760px) 90vw, 45vw"
          />
          <span className="spotlight-index">
            0{selected + 1}
            <small> / 0{characters.length}</small>
          </span>
          <span className="spotlight-cross" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="spotlight-content">
          <div className="spotlight-topline">
            <span>EXPEDIENTE #{String(character.id).padStart(3, "0")}</span>
            <Status value={character.status} />
          </div>
          <h3>{character.name}</h3>
          <p className="spotlight-species">
            {character.species} <span> / </span> {character.gender}
          </p>
          <dl>
            <div>
              <dt>
                <IoPlanetOutline /> ÚLTIMA UBICACIÓN
              </dt>
              <dd>{character.location.name}</dd>
            </div>
            <div>
              <dt>
                <IoTvOutline /> APARICIONES REGISTRADAS
              </dt>
              <dd>{character.episode.length} episodios</dd>
            </div>
          </dl>
          <Link
            href={`/personajes/${character.id}`}
            className="button button-lime"
          >
            Abrir expediente <IoArrowForward />
          </Link>
          <div
            className="spotlight-picker"
            role="group"
            aria-label="Elegir protagonista"
          >
            {characters.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelected(index)}
                aria-pressed={index === selected}
                aria-label={`Ver a ${item.name}`}
              >
                <Image
                  src={`/images/crew/${item.id}.jpg`}
                  alt=""
                  width={54}
                  height={54}
                />
                <span>{item.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
