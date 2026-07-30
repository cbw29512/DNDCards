import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { allCards, characters } from "../src/data.js";
import { deriveCharacter } from "../src/characterEngine.js";
import { library } from "../src/libraryModel.js";
import { libraryCards } from "../src/dmView.js";
import { updateEquipmentState } from "../src/equipmentState.js";

try {
  const equipment = library.cards.filter(card => card.subtype === "equipment");
  const conditions = library.cards.filter(card => card.subtype === "condition");
  assert.equal(equipment.length, 161);
  assert.equal(conditions.length, 30);
  assert.equal(characters.length, 323);
  const maraCards = characters.filter(card => card.title.startsWith("Mara Ironjaw · Level "));
  assert.equal(maraCards.length, 20);
  assert.ok(maraCards.every(card => card.art === "assets/heroes/mara-ironjaw.webp"));
  assert.ok(existsSync(new URL("../assets/heroes/mara-ironjaw.webp", import.meta.url)));

  const plate = allCards.find(card =>
    card.id === "OLD-EQUIPMENT-srd-5.2.1-2024-plate"
  );
  const leather = allCards.find(card =>
    card.id === "OLD-EQUIPMENT-srd-5.2.1-2024-leather"
  );
  const hero = characters.find(card => card.id === "pc-wendy");
  assert.ok(plate?.equipSlots.includes("armor"));
  assert.equal(deriveCharacter(hero, [plate]).armorClass, 18);
  assert.equal(deriveCharacter(hero, [leather]).armorClass, 14);

  const state = {
    players:[{ id:"player-1", backpackIds:[plate.id] }],
    activePlayerId:"player-1",
    equipmentByPlayer:{ "player-1":{} }
  };
  assert.equal(updateEquipmentState(
    state,
    { type:"equip-item", id:plate.id, slot:"armor" },
    allCards
  ), true);
  assert.equal(state.equipmentByPlayer["player-1"].armor, plate.id);

  const vault = libraryCards(
    { dmFrontCardIds:[] },
    "monster",
    "adult red dragon 2024"
  );
  assert.match(vault, /Adult Red Dragon/);
  assert.match(vault, /1 monster card/);

  console.log("Expanded playable-card tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Expanded card test failed.", error);
  process.exitCode = 1;
}
