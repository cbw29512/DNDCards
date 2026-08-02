import assert from "node:assert/strict";
import { deriveCharacter, executeEquippedAttack } from "../src/characterEngine.js";
import { characters, cards } from "../src/data.js";
import { createState } from "../src/schema.js";
import { gameBoardView } from "../src/gameBoardView.js";

const bob = characters.find(card => card.id === "pc-bob");
const blade = cards.find(card => card.id === "treasure-emberblade");
const stats = deriveCharacter(bob, [blade]);
assert.deepEqual(stats, { armorClass:14, initiative:2, speed:30 });

const rolls = [0.95, 0.25, 0.5, 0, 0];
const result = executeEquippedAttack(bob, blade, "ember-slash", () => rolls.shift());
assert.equal(result.attack.total, 26, "d20 20 + STR 3 + proficiency 2 + item 1");
assert.equal(result.critical, true);
assert.equal(result.damageComponents.length, 2);
assert.equal(result.damageComponents[0].roll.dice.length, 2, "critical doubles sword dice");
assert.equal(result.damageComponents[0].roll.modifier, 4, "fixed modifiers are not doubled");
assert.equal(result.damageComponents[1].damageType, "fire");
assert.equal(result.damageTotal, 14);
const dmState = {
  ...createState(), identity:{ role:"dm", name:"DM" }, tableTab:"board",
  adventureId:"first-chime-hearthglow", roomId:"heartbreak-inn",
  completedRoomIds:[],
  activeEventId:"EVENT-01",
  placedByRoom:{ lanternhome:["LOC-005", "NPC-001"] }, healthByCard:{}
};
dmState.placedByRoom["heartbreak-inn"] = ["LOC-001", "MON-002", "CLUE-003"];
const dmBoard = gameBoardView(dmState);
assert.match(dmBoard, />NPCs</);
assert.match(dmBoard, />Clues</);
assert.match(dmBoard, />Events</);
assert.match(dmBoard, /The Missing Third Verse/);
assert.match(dmBoard, /A Forgotten Face/);
assert.match(dmBoard, /ROOM 2 OF 6/);
assert.match(dmBoard, /Next room/);
const hiddenPlayer = { ...dmState, identity:{ role:"player", name:"Hero" }, boardPerspective:"player" };
assert.doesNotMatch(gameBoardView(hiddenPlayer), /The Missing Third Verse/);
assert.doesNotMatch(gameBoardView(hiddenPlayer), /A Forgotten Face/);
const revealedPlayer = {
  ...hiddenPlayer,
  revealedIds:["CLUE-003", "EVENT-01"]
};
assert.match(gameBoardView(revealedPlayer), /The Missing Third Verse/);
assert.match(gameBoardView(revealedPlayer), /A Forgotten Face/);
console.log("Game board engine tests passed.");
