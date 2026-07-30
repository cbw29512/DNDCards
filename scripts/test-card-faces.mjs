import assert from "node:assert/strict";
import { cardView } from "../src/cardView.js";
import { cards } from "../src/data.js";
import { createState } from "../src/schema.js";
import { updateState } from "../src/state.js";
import { libraryView } from "../src/libraryView.js";

globalThis.localStorage = {
  value:null,
  getItem() { return this.value; },
  setItem(_key, value) { this.value = value; }
};

const monster = cards.find(card => card.id === "monster-gremlin");
const front = cardView(monster, { face:"front" });
const back = cardView(monster, { face:"back", dm:true });
assert.match(front, /card--front/);
assert.match(front, /card-slot-band--monster/);
assert.match(front, /Monster slot/);
assert.match(front, /Jam Gremlin/);
assert.match(front, /jam-gremlin-card-art\.webp/);
assert.doesNotMatch(front, /PRIVATE DM INFORMATION/);
assert.match(back, /card--back/);
assert.match(back, /PRIVATE DM INFORMATION/);
assert.match(back, /Two gremlins act as one initiative group/);
assert.match(cardView(monster, { face:"back", flip:true }), /data-action="flip-card"/);

const initial = { ...createState(), identity:{ role:"dm", name:"Test" } };
const flipped = updateState(initial, { type:"flip-card", id:monster.id });
assert.deepEqual(flipped.dmFrontCardIds, [monster.id]);
const restored = updateState(flipped, { type:"flip-card", id:monster.id });
assert.deepEqual(restored.dmFrontCardIds, []);
const libraryBack = updateState(restored, { type:"flip-library-card", id:"LOC-005" });
assert.deepEqual(libraryBack.libraryBackIds, ["LOC-005"]);
assert.match(libraryView("", "room", libraryBack), /library-card--back/);
assert.match(libraryView("", "room", libraryBack), /PRIVATE DM SIDE/);
const references = libraryView("", "reference", libraryBack);
assert.match(references, /SYMBOL KEY/);
assert.match(references, /Strength Saving Throw/);
assert.equal((references.match(/symbol-card--library/g) || []).length, 1);
console.log("Card face tests passed.");
