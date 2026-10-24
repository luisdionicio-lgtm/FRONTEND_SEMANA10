import Link from "next/link";
import { IoPlanetOutline, IoArrowUpOutline } from "react-icons/io5";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell nav-inner">
        <Link href="/" className="brand" aria-label="Portal 137 — inicio">
          <span className="brand-mark">
            <IoPlanetOutline />
          </span>{" "}
          PORTAL<span className="brand-number">137</span>
        </Link>
        <nav aria-label="Navegación principal">
          <Link href="/#explorar">Explorar</Link>
          <Link href="/personajes">Personajes</Link>
          <Link href="/pokemon">
            Pokédex <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <span className="nav-status">
          <i /> Multiverso conectado
        </span>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer shell">
      <div>
        <Link href="/" className="brand">
          PORTAL<span className="brand-number">137</span>
        </Link>
        <p>Un universo de personajes. Infinitas historias.</p>
        <small>
          Proyecto educativo · Datos de{" "}
          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Rick and Morty API
          </a>
          . Sin afiliación oficial.
        </small>
      </div>
      <a href="#top" className="back-top" aria-label="Volver arriba">
        <IoArrowUpOutline />
      </a>
    </footer>
  );
}
