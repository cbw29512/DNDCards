import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = dirname(scriptsDir);
const html = readFileSync(join(rootDir, "index.html"), "utf8");

assert.match(html, /<div id="app"><\/div>/, "index.html must expose the app mount point");
assert.match(html, /src="src\/main\.js[^\"]*"/, "index.html must load src/main.js");

const references = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)]
  .map(match => match[1])
  .filter(value => !/^(?:https?:|data:|mailto:|tel:)/.test(value))
  .map(value => value.split(/[?#]/, 1)[0])
  .filter(Boolean);

const missing = references.filter(reference => !existsSync(join(rootDir, reference)));
assert.deepEqual(missing, [], `index.html references missing local assets: ${missing.join(", ")}`);

console.log(`Static entrypoint contract passed (${references.length} local assets checked).`);
