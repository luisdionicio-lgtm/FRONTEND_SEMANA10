"use client";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export default function Carousel({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState("inicio");
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    element.scrollBy({
      left: direction * Math.max(280, element.clientWidth * 0.75),
      behavior: reduced ? "instant" : "smooth",
    });
  }
  return (
    <section
      className="carousel"
      aria-label={label}
      aria-roledescription="carrusel"
    >
      <div className="carousel-controls">
        <span>DESLIZA PARA DESCUBRIR</span>
        <div>
          <button onClick={() => move(-1)} aria-label={`Anterior en ${label}`}>
            <IoArrowBack />
          </button>
          <button onClick={() => move(1)} aria-label={`Siguiente en ${label}`}>
            <IoArrowForward />
          </button>
        </div>
      </div>
      <div
        className="carousel-track"
        ref={track}
        tabIndex={0}
        onScroll={() =>
          setPosition(
            track.current && track.current.scrollLeft > 10
              ? "desplazado"
              : "inicio",
          )
        }
        aria-label={label}
        data-position={position}
      >
        {children}
      </div>
    </section>
  );
}
