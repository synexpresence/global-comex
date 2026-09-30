import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const output = new URL("../.output/public/", import.meta.url);
// Pointers remain in the Lovable project; copy the identical immutable bytes for external hosting.
const pointers = [
  "global-comex-logo-nova.png", "global-comex-cover-home.jpg",
  "caminhao-containers.png", "seguranca-corporativa.png",
  "atendimento-aperto-de-maos.png", "agilidade-navio-aviao.png",
  "banner-global-comex.png", "orientacao-documental.png", "fluxo-acompanhado.png",
];
for (const filename of pointers) {
  const pointer = JSON.parse(await readFile(new URL(`../src/assets/${filename}.asset.json`, import.meta.url), "utf8")) as { url: string; size: number };
  if (!/^\/__l5e\/assets-v1\/[a-f\d-]+\/[\w.-]+$/.test(pointer.url)) throw new Error(`Unexpected asset path: ${filename}`);
  const response = await fetch(`https://global-comex.lovable.app${pointer.url}`);
  if (!response.ok) throw new Error(`Cannot include ${filename}: HTTP ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length !== pointer.size) throw new Error(`Unexpected byte count for ${filename}`);
  const destination = join(output.pathname, pointer.url.slice(1));
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, bytes);
}
console.log(`Packaged ${pointers.length} original images in ${output.pathname}`);
