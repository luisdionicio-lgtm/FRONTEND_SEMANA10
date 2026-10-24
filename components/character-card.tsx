import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/character";

export const statusNames = {
  Alive: "Vivo",
  Dead: "Muerto",
  unknown: "Desconocido",
};
export function Status({ value }: { value: Character["status"] }) {
  return (
    <span className={`status status-${value.toLowerCase()}`}>
      <i />
      {statusNames[value]}
    </span>
  );
}
export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      href={`/personajes/${character.id}`}
      className={`character-card character-${character.status.toLowerCase()}`}
      prefetch={false}
    >
      <div className="card-image">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          loading="lazy"
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 23vw"
        />
        <span className="card-scan" aria-hidden="true" />
        <span className="card-id">
          #{String(character.id).padStart(3, "0")}
        </span>
        <span className="card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="card-content">
        <Status value={character.status} />
        <h3>{character.name}</h3>
        <p>
          {character.species} <span>·</span>{" "}
          {character.gender === "Male"
            ? "Masculino"
            : character.gender === "Female"
              ? "Femenino"
              : character.gender === "Genderless"
                ? "Sin género"
                : "Desconocido"}
        </p>
        <div className="card-location">
          <span>ÚLTIMA UBICACIÓN</span>
          <p>{character.location.name}</p>
        </div>
      </div>
    </Link>
  );
}
