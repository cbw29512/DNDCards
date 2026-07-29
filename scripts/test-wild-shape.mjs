import { wildShapeCatalog as cards } from "../src/wildShapeCatalog.js";
import { executeCardAction } from "../src/diceEngine.js";

try {
  if (cards.length !== 61) throw new Error(`Expected 61 forms; found ${cards.length}.`);
  if (new Set(cards.map(card => card.id)).size !== cards.length) throw new Error("Duplicate Wild Shape IDs.");
  if (cards.some(card => card.challenge > 2 || /fly/i.test(card.speed))) {
    throw new Error("The level-6 deck contains an ineligible form.");
  }
  if (cards.some(card => !card.source || card.abilities.length !== 6)) {
    throw new Error("A Wild Shape card is missing source or ability data.");
  }
  const bear = cards.find(card => card.title === "Brown Bear");
  if (bear.actions.map(action => action.label).join(",") !== "Bite,Claws") {
    throw new Error("Brown Bear attacks were not parsed.");
  }
  if (bear.unarmoredArmor !== 13) throw new Error("Brown Bear Unarmored Defense AC is wrong.");
  const spider = cards.find(card => card.title === "Giant Spider");
  if (!spider.actions.some(action => action.label === "Web" && !action.damage)) {
    throw new Error("Giant Spider Web attack was not parsed.");
  }
  const result = executeCardAction(bear, bear.actions[0].id, () => 0.5);
  if (!result.attack || !result.damage) throw new Error("Wild Shape click-to-roll failed.");
  console.log("Validated 61 Wild Shape cards, eligibility, AC, attacks, and card rolls.");
} catch (error) {
  console.error("[Dungeon Cards] Wild Shape validation failed.", error);
  process.exitCode = 1;
}
