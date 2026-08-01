import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { allCards, characters } from "../src/data.js";
import { deriveCharacter } from "../src/characterEngine.js";
import { library } from "../src/libraryModel.js";
import { libraryCards } from "../src/dmView.js";
import { updateEquipmentState } from "../src/equipmentState.js";
import { heroRoster } from "../src/heroRosterData.js";

try {
  const equipment = library.cards.filter(card => card.subtype === "equipment");
  const conditions = library.cards.filter(card => card.subtype === "condition");
  assert.equal(equipment.length, 161);
  assert.equal(conditions.length, 30);
  assert.equal(characters.length, 331);
  const maraCards = characters.filter(card => card.title.startsWith("Mara Ironjaw · Level "));
  assert.equal(maraCards.length, 20);
  assert.ok(maraCards.every(card => card.art === "assets/heroes/mara-ironjaw.webp"));
  assert.ok(existsSync(new URL("../assets/heroes/mara-ironjaw.webp", import.meta.url)));
  const illustratedHeroes = new Map(heroRoster.map(hero => [hero.name, hero.stem]));
  const starterOnly = new Set([
    "Elowen Mossvale", "Sable Fernwhisper", "Kael Riverstep", "Juno Swiftwater",
    "Veyra Emberborn", "Orryn Scaleheart", "Nyx Cinderveil", "Vale Nightglass"
  ]);
  for (const [name, fileStem] of illustratedHeroes) {
    const heroCards = characters.filter(card => card.title.startsWith(`${name} · Level `));
    const expected = starterOnly.has(name) ? 1 : 20;
    assert.equal(heroCards.length, expected, `${name} should have ${expected} release card(s).`);
    assert.ok(
      heroCards.every(card => card.art === `assets/heroes/${fileStem}.webp`),
      `${name} should use one consistent portrait across all levels.`
    );
    assert.ok(
      existsSync(new URL(`../assets/heroes/${fileStem}.webp`, import.meta.url)),
      `${name}'s optimized portrait should exist.`
    );
  }

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
