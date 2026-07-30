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
  adventureId:"wishing-cake", roomId:"inn",
  completedRoomIds:[],
  activeEventId:"event-1",
  placedByRoom:{ square:["room-square", "npc-wendy"] }, healthByCard:{}
};
dmState.placedByRoom.inn = ["room-inn", "monster-gremlin", "clue-toast"];
const dmBoard = gameBoardView(dmState);
assert.match(dmBoard, />NPCs</);
assert.match(dmBoard, />Clues</);
assert.match(dmBoard, />Events</);
assert.match(dmBoard, /The Forgotten Toast/);
assert.match(dmBoard, /The Forgotten Face/);
assert.match(dmBoard, /ROOM 2 OF 4/);
assert.match(dmBoard, /Next room/);
const hiddenPlayer = { ...dmState, identity:{ role:"player", name:"Hero" }, boardPerspective:"player" };
assert.doesNotMatch(gameBoardView(hiddenPlayer), /The Forgotten Toast/);
assert.doesNotMatch(gameBoardView(hiddenPlayer), /The Forgotten Face/);
const revealedPlayer = {
  ...hiddenPlayer,
  revealedIds:["clue-toast", "event-1"]
};
assert.match(gameBoardView(revealedPlayer), /The Forgotten Toast/);
assert.match(gameBoardView(revealedPlayer), /The Forgotten Face/);
console.log("Game board engine tests passed.");
