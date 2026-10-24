import assert from "node:assert/strict";
import fs from "node:fs";
const base = process.env.TEST_BASE_URL || "http://localhost:3001";
const manifest = JSON.parse(
  fs.readFileSync(".next/prerender-manifest.json", "utf8"),
);
const details = Object.entries(manifest.routes).filter(([path]) =>
  /^\/personajes\/\d+$/.test(path),
);
assert.equal(details.length, 826);
assert(details.every(([, route]) => route.initialRevalidateSeconds === 864000));
assert.equal(manifest.routes["/personajes"].initialRevalidateSeconds, 864000);
assert(!manifest.routes["/"], "The home page must use SSR");
for (const path of [
  "/",
  "/personajes",
  "/personajes/1",
  "/personajes/826",
  "/pokemon",
  "/pokemon/pikachu",
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  console.log("OK page", path);
}
for (const query of [
  "name=rick",
  "status=dead",
  "gender=female",
  "type=robot",
  "name=rick&status=alive&gender=male",
  "page=2",
]) {
  const response = await fetch(`${base}/api/characters?${query}`);
  assert.equal(response.status, 200, query);
  const data = await response.json();
  assert(data.results.length > 0, query);
  const params = new URLSearchParams(query);
  for (const character of data.results) {
    for (const key of ["name", "status", "gender", "type"]) {
      if (params.has(key))
        assert(
          character[key].toLowerCase().includes(params.get(key).toLowerCase()),
          `${key}: ${character.name}`,
        );
    }
  }
  console.log("OK search", query, data.info.count);
}
const missing = await fetch(
  `${base}/api/characters?name=zzzz-no-such-character-123`,
);
assert.equal((await missing.json()).results.length, 0);
for (const query of [
  "page=-1",
  "page=abc",
  "status=invalid",
  "gender=invalid",
  `name=${"a".repeat(101)}`,
]) {
  assert.equal(
    (await fetch(`${base}/api/characters?${query}`)).status,
    400,
    query,
  );
}
const notFound = await fetch(`${base}/personajes/999999`);
assert.equal(notFound.status, 404);
console.log(
  "OK empty results, invalid inputs, 404, security headers, SSR and 826 SSG/ISR routes",
);
