import { LIBRARY_KINDS, library } from "../src/libraryModel.js";
import { importedCatalog } from "../src/importedCatalog.js";
import { parseFormula } from "../src/diceEngine.js";

try {
  const symbolKey = new Set(["♥", "🛡", "➜", "⚔", "➶", "✦", "⬡", "◈", "↻", "⚡", "☕", "☾"]);
  if (library.rejected.length) throw new Error(`${library.rejected.length} catalog records were rejected.`);
  if (library.cards.length !== 1446) throw new Error(`Expected 1,446 unique cards; found ${library.cards.length}.`);
  const missing = LIBRARY_KINDS.filter(kind =>
    kind !== "all" && !library.cards.some(card =>
      card.kind === kind || card.subtype === kind
    ));
  if (missing.length) throw new Error(`Empty required categories: ${missing.join(", ")}`);
  if (importedCatalog.length !== 1348) {
    throw new Error(`Expected 1,348 imported cards; found ${importedCatalog.length}.`);
  }
  for (const card of importedCatalog) {
    for (const action of [...(card.actions || []), ...(card.spellActions || [])]) {
      if (!symbolKey.has(action.icon)) {
        throw new Error(`${card.id} uses action icon "${action.icon}" outside the Symbol Key.`);
      }
    }
  }
  for (const card of importedCatalog) {
    for (const action of [...(card.actions || []), ...(card.spellActions || [])]) {
      if (action.roll) parseFormula(action.roll);
      if (action.damage) parseFormula(action.damage);
    }
  }
  console.log(`Validated ${library.cards.length} unique cards across ${LIBRARY_KINDS.length - 1} categories.`);
} catch (error) {
  console.error("[Dungeon Cards] Library validation failed.", error);
  process.exitCode = 1;
}
