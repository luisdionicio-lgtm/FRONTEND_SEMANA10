import Link from "next/link";
export default function NotFound() {
  return (
    <main className="portal-site standalone-state">
      <span className="empty-orbit">404</span>
      <p className="eyebrow">DIMENSIÓN DESCONOCIDA</p>
      <h1>Este portal no lleva a ninguna parte.</h1>
      <p>La página o el personaje que buscas no existe en este universo.</p>
      <Link href="/personajes" className="button button-lime">
        Volver al archivo
      </Link>
    </main>
  );
}
