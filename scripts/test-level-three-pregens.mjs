import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { levelThreePregens } from "../src/levelThreePregens.js";
import { pregenPackPages } from "../src/pregenPackModel.js";
import { pregenPackView } from "../src/pregenPackView.js";
import { executeCardAction } from "../src/diceEngine.js";
import { spellActionAtLevel } from "../src/spellUpcast.js";

const starters = levelThreePregens;
assert.equal(starters.length, 16, "The starter roster must contain 16 level 3 heroes.");
assert.equal(starters.filter(card => card.edition === "2014").length, 8);
assert.equal(starters.filter(card => card.edition === "2024").length, 8);

for (const card of starters) {
  assert.equal(card.starterPack, true);
  assert.equal(card.printableSummaryReady, true);
  assert.ok(card.art && existsSync(new URL(`../${card.art}`, import.meta.url)));
  assert.equal(card.abilities.length, 6);
  assert.ok(card.savingThrowProficiencies.length >= 2);
  assert.ok(card.skillProficiencies.length >= 4);
  assert.ok(card.equipment.length >= 6);
  assert.ok(card.classFeatures.length >= 2);
  assert.ok(card.actions.length >= 2);
  const pages = pregenPackPages(card);
  assert.equal(pages[0].type, "portrait");
  assert.ok(pages.length >= 5);
  const caster = card.spellcasting.kind !== "none";
  assert.equal(pages.at(-1).type, caster ? "spells" : "gear");
  if (caster) {
    assert.ok(card.spellDetails.length >= 3);
    assert.ok(card.spellSaveDc >= 10);
    assert.ok(card.spellActions.length >= 2);
  }
  const html = pregenPackView(card, { usedResources: [], spellSlotByCard: {} });
  assert.equal((html.match(/class="pregen-card /g) || []).length, pages.length);
  assert.match(html, /Print pack/);
}

const tamsin = starters.find(card => card.title.startsWith("Tamsin Lockmere"));
assert.equal(tamsin.initiative, 5, "The 2024 Alert origin feat must add proficiency to initiative.");

const aelar = starters.find(card => card.title.startsWith("Aelar Ashquill"));
const missile = aelar.spellActions.find(action => action.label === "Magic Missile");
assert.equal(missile.roll, "3d4+3");
const rollCard = { ...aelar, actions: [...aelar.actions, ...aelar.spellActions] };
const upcast = executeCardAction(rollCard, missile.id, () => 0, {
  slotLevel: 2,
  transformAction: spellActionAtLevel
});
assert.equal(upcast.roll.formula, "4d4+4");
assert.equal(upcast.roll.total, 8);

console.log("Level 3 pregen pack tests passed.");
