import type { Metadata } from "next";
import { Header, Footer } from "@/components/site-shell";
import Explorer from "@/components/explorer";
import { getCharacterPage } from "@/lib/characters";

export const metadata: Metadata = {
  title: "Personajes | Portal 137",
  description:
    "Busca personajes de Rick y Morty por nombre, estado, tipo y género.",
};
export const revalidate = 864000;

// SSG + ISR variant of the catalog; search after hydration uses CSR.
export default async function Characters() {
  const data = await getCharacterPage();
  return (
    <div
      className="portal-site antialiased selection:bg-lime-300 selection:text-black"
      id="top"
    >
      <Header />
      <main className="catalog-main">
        <div className="shell catalog-intro">
          <p className="eyebrow">EXPEDIENTES DEL MULTIVERSO</p>
          <h1>
            Todos tienen <em>una historia.</em>
          </h1>
          <p>Encuentra la tuya entre {data.info.count} personajes.</p>
        </div>
        <Explorer initial={data} />
      </main>
      <Footer />
    </div>
  );
}
