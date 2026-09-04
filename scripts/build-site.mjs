import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = dirname(scriptsDir);
const outDir = join(rootDir, "_site");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const directory of ["src", "assets"]) {
  const source = join(rootDir, directory);
  if (!existsSync(source)) throw new Error(`Required site directory is missing: ${directory}`);
  cpSync(source, join(outDir, directory), { recursive: true });
}

for (const name of ["index.html", ...readdirSync(rootDir).filter(item => item.endsWith(".css"))]) {
  cpSync(join(rootDir, name), join(outDir, name));
}

const commit = process.env.COMMIT_REF || process.env.GITHUB_SHA || "local";
writeFileSync(join(outDir, "build-info.json"), `${JSON.stringify({ commit }, null, 2)}\n`);

if (!existsSync(join(outDir, "index.html")) || !existsSync(join(outDir, "src", "main.js"))) {
  throw new Error("Production build is missing its entrypoint.");
}

console.log(`Built clean production site at ${outDir}`);
