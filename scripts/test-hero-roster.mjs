import assert from "node:assert/strict";
import { heroRosterView } from "../src/heroRosterView.js";
import { characters } from "../src/data.js";
import { heroRoster } from "../src/heroRosterData.js";

try {
  const view = heroRosterView();
  const rosterNames = heroRoster.map(hero => hero.name);
  const starterOnly = new Set([
    "Elowen Mossvale", "Sable Fernwhisper", "Kael Riverstep", "Juno Swiftwater",
    "Veyra Emberborn", "Orryn Scaleheart", "Nyx Cinderveil", "Vale Nightglass"
  ]);

  assert.equal((view.match(/<article>/g) || []).length, rosterNames.length);
  assert.equal((view.match(/loading="lazy"/g) || []).length, rosterNames.length);

  for (const name of rosterNames) {
    assert.equal(
      (view.match(new RegExp(name, "g")) || []).length,
      2,
      `${name} should appear once in image alt text and once in its title.`
    );
    assert.equal(
      characters.filter(card =>
        card.title.startsWith(`${name} · Level `) && card.art
      ).length,
      starterOnly.has(name) ? 1 : 20,
      `${name} should have the expected illustrated release cards.`
    );
  }

  console.log("Hero roster tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Hero roster test failed.", error);
  process.exitCode = 1;
}
