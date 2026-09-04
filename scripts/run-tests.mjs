import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const rootDir = dirname(scriptsDir);
const tests = readdirSync(scriptsDir)
  .filter(name => /^test-.*\.mjs$/.test(name))
  .sort();

for (const name of tests) {
  console.log(`\n== ${name} ==`);
  const result = spawnSync(process.execPath, [join(scriptsDir, name)], {
    cwd: rootDir,
    stdio: "inherit"
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("\n== validate-library.mjs ==");
const validation = spawnSync(process.execPath, [join(scriptsDir, "validate-library.mjs")], {
  cwd: rootDir,
  stdio: "inherit"
});
if (validation.status !== 0) process.exit(validation.status ?? 1);

console.log(`\nDungeon Cards regression suite passed (${tests.length} tests + library validation).`);
