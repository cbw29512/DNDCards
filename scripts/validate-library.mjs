import { LIBRARY_KINDS, library } from "../src/libraryModel.js";
import { importedCatalog } from "../src/importedCatalog.js";
import { parseFormula } from "../src/diceEngine.js";

try {
  if (library.rejected.length) throw new Error(`${library.rejected.length} catalog records were rejected.`);
  if (library.cards.length !== 384) throw new Error(`Expected 384 unique cards; found ${library.cards.length}.`);
  const missing = LIBRARY_KINDS.filter(kind =>
    kind !== "all" && !library.cards.some(card => card.kind === kind));
  if (missing.length) throw new Error(`Empty required categories: ${missing.join(", ")}`);
  if (importedCatalog.length !== 286) {
    throw new Error(`Expected 286 imported cards; found ${importedCatalog.length}.`);
  }
  for (const card of importedCatalog) {
    for (const action of card.actions || []) {
      if (action.roll) parseFormula(action.roll);
      if (action.damage) parseFormula(action.damage);
    }
  }
  console.log(`Validated ${library.cards.length} unique cards across ${LIBRARY_KINDS.length - 1} categories.`);
} catch (error) {
  console.error("[Dungeon Cards] Library validation failed.", error);
  process.exitCode = 1;
}
