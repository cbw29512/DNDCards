import assert from "node:assert/strict";
import { library } from "../src/libraryModel.js";
import { executeCardAction } from "../src/diceEngine.js";
import {
  getUpcastRule,
  normalizeSpellSlot,
  spellActionAtLevel,
  spellSlotOptions
} from "../src/spellUpcast.js";
import { libraryView } from "../src/libraryView.js";

try {
  const fireball = library.cards.find(card => card.id === "OLD-RULE-fireball");
  const missile = library.cards.find(card => card.id === "OLD-RULE-magic-missile");
  const blink = library.cards.find(card => card.id === "OLD-RULE-blink");

  assert.ok(fireball, "Fireball card must exist.");
  assert.equal(getUpcastRule(fireball).baseLevel, 3);
  assert.equal(normalizeSpellSlot(fireball, 99), 9);
  assert.equal(spellSlotOptions(fireball, 5).length, 7);
  assert.equal(spellActionAtLevel(fireball, fireball.actions[0], 9).roll, "14d6");
  assert.equal(spellActionAtLevel(missile, missile.actions[0], 9).roll, "11d4+11");
  assert.equal(spellSlotOptions(blink, 9).length, 0);

  const result = executeCardAction(fireball, fireball.actions[0].id, () => 0, {
    slotLevel: 9,
    transformAction: spellActionAtLevel
  });
  assert.equal(result.action.slotLevel, 9);
  assert.equal(result.roll.dice.length, 14);
  assert.equal(result.roll.total, 14);

  const rendered = libraryView("Fireball Damage", "spell", {
    libraryBackIds: [fireball.id],
    spellSlotByCard: { [fireball.id]: 9 }
  });
  assert.match(rendered, /CAST USING/);
  assert.match(rendered, /value="9" selected/);
  assert.match(rendered, /14d6/);

  console.log("Spell upcasting tests passed.");
} catch (error) {
  console.error("Spell upcasting tests failed.", error);
  process.exitCode = 1;
}
