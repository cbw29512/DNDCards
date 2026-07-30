import assert from "node:assert/strict";
import { deriveCharacter, executeEquippedAttack } from "../src/characterEngine.js";
import { characters, cards } from "../src/data.js";

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
console.log("Game board engine tests passed.");
