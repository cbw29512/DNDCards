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

  assert.equal((view.match(/<article role="button"/g) || []).length, rosterNames.length);
  assert.equal((view.match(/data-action="open-pregen-pack"/g) || []).length, rosterNames.length);
  assert.equal((view.match(/tabindex="0"/g) || []).length, rosterNames.length);
  assert.equal((view.match(/loading="lazy"/g) || []).length, rosterNames.length);
  assert.equal((view.match(/data-action="launch-starter"/g) || []).length, 1);
  assert.match(view, /The First Chime of Hearthglow/);

  for (const name of rosterNames) {
    const starter = characters.find(card => card.title === `${name} · Level 3`);
    assert.ok(starter, `${name} should have a Level 3 starter card.`);
    assert.match(view, new RegExp(`data-id="${starter.id}"`));
    assert.match(view, new RegExp(`<h3>${name}</h3>`));
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
