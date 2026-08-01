import { rawLibraryCatalog } from "./libraryCatalog.js?v=level-3-pregens-1";

export const LIBRARY_KINDS = [
  "all", "room", "npc", "monster", "wild-shape", "trap", "treasure",
  "equipment", "condition", "clue", "event", "character", "weapon", "spell", "reference"
];

const fingerprint = card => [card.kind, card.title, card.playerText, card.edition]
  .join("|").toLowerCase().replace(/[^a-z0-9]+/g, "");

export const buildLibrary = cards => {
  const ids = new Set();
  const fingerprints = new Set();
  const accepted = [];
  const rejected = [];
  for (const card of cards) {
    try {
      if (!card.id || !card.title || !card.kind || !card.playerText) throw new Error("Missing required card data.");
      const mark = fingerprint(card);
      if (ids.has(card.id)) throw new Error(`Duplicate ID: ${card.id}`);
      if (fingerprints.has(mark)) throw new Error(`Duplicate content: ${card.title}`);
      ids.add(card.id);
      fingerprints.add(mark);
      accepted.push(Object.freeze({ ...card }));
    } catch (error) {
      console.error(`[Dungeon Cards] Rejected library card ${card?.id || "unknown"}.`, error);
      rejected.push({ card, reason: error.message });
    }
  }
  return { cards: accepted, rejected };
};

export const library = buildLibrary(rawLibraryCatalog);

export const filterLibrary = (cards, query, kind) => {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return cards.filter(card => {
    const inKind = kind === "all"
      || card.kind === kind
      || kind === "equipment" && card.subtype === "equipment"
      || kind === "condition" && card.subtype === "condition";
    const text = [
      card.id, card.title, card.badge, card.kind, card.subtype, card.equipmentType,
      card.roomNumber ? `room ${card.roomNumber}` : "",
      card.playerText, card.dmText, card.source, card.edition,
      card.speed, card.challengeLabel ? `CR ${card.challengeLabel}` : "",
      ...(card.quickStats || [])
    ].join(" ").toLowerCase();
    return inKind && terms.every(term => text.includes(term));
  });
};
