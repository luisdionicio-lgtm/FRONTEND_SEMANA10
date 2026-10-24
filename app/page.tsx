import { connection } from "next/server";
import { getCharacterPage } from "@/lib/characters";
import HomeContent from "@/components/home-content";

// SSR HTML on each request, with a force-cache request for the API data.
export default async function Home() {
  await connection();
  const data = await getCharacterPage();
  return <HomeContent data={data} />;
}
