import { LIBRARY_KINDS, library } from "../src/libraryModel.js";

try {
  if (library.rejected.length) throw new Error(`${library.rejected.length} catalog records were rejected.`);
  if (library.cards.length !== 98) throw new Error(`Expected 98 unique cards; found ${library.cards.length}.`);
  const missing = LIBRARY_KINDS.filter(kind =>
    kind !== "all" && !library.cards.some(card => card.kind === kind));
  if (missing.length) throw new Error(`Empty required categories: ${missing.join(", ")}`);
  console.log(`Validated ${library.cards.length} unique cards across ${LIBRARY_KINDS.length - 1} categories.`);
} catch (error) {
  console.error("[Dungeon Cards] Library validation failed.", error);
  process.exitCode = 1;
}
