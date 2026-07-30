import assert from "node:assert/strict";
import { executeCardAction, parseFormula, rollFormula } from "../src/diceEngine.js";
import { cardView } from "../src/cardView.js";
import { allCards } from "../src/data.js";

try {
  assert.deepEqual(parseFormula("2d6+3"), { count: 2, sides: 6, modifier: 3 });
  assert.equal(rollFormula("1d20+4", () => 0.95).total, 24);
  assert.deepEqual(rollFormula("1d6+2", () => 0, true).dice, [1, 1]);
  const card = { id: "test", title: "Test", actions: [{ id: "hit", kind: "attack", roll: "1d20+4", damage: "1d6+2" }] };
  const result = executeCardAction(card, "hit", () => 0.99);
  assert.equal(result.critical, true);
  assert.equal(result.damage.dice.length, 2);
  const gremlin = allCards.find(candidate => candidate.id === "monster-gremlin");
  assert.match(cardView(gremlin, { face:"back" }), /data-action="roll-card-action"/);
  assert.match(cardView(gremlin, { face:"back" }), /Berry Splat/);
  console.log("Combat dice tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Combat test failed.", error);
  process.exitCode = 1;
}
