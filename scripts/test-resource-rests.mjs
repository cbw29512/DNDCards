import assert from "node:assert/strict";
import { levelThreePregens } from "../src/levelThreePregens.js";
import { adjustResourceState, recoverResources, resourceRemaining } from "../src/resourceState.js";
import { consumeSpellSlot, recoverSpellSlots, remainingSpellSlots } from "../src/spellSlotState.js";

try {
  const sable = levelThreePregens.find(card => card.title.startsWith("Sable Fernwhisper"));
  const vale = levelThreePregens.find(card => card.title.startsWith("Vale Nightglass"));
  const wildShape = sable.resources.find(resource => resource.id === "wild-shape");
  const state = { resourceRemainingById:{}, spellSlotsRemainingByCard:{} };

  adjustResourceState(state, { cardId:sable.id, resourceId:"wild-shape", amount:-2 }, levelThreePregens);
  assert.equal(resourceRemaining(state, sable, wildShape), 0);
  recoverResources(state, "short", levelThreePregens);
  assert.equal(resourceRemaining(state, sable, wildShape), 1, "2024 Wild Shape regains one use on a Short Rest.");
  recoverResources(state, "long", levelThreePregens);
  assert.equal(resourceRemaining(state, sable, wildShape), 2);

  consumeSpellSlot(state, vale, 2);
  assert.equal(remainingSpellSlots(state, vale, 2), 1);
  recoverSpellSlots(state, "short", levelThreePregens);
  assert.equal(remainingSpellSlots(state, vale, 2), 2, "Pact slots return on a Short Rest.");

  const elowen = levelThreePregens.find(card => card.title.startsWith("Elowen Mossvale"));
  assert.equal(elowen.speed, 35, "A 2014 Wood Elf has a 35-foot walking speed.");
  console.log("Resource and rest tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Resource/rest test failed.", error);
  process.exitCode = 1;
}
