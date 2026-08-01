import assert from "node:assert/strict";
import { heroRosterView } from "../src/heroRosterView.js";
import { importedPregens } from "../src/importedPregens.js";

try {
  const view = heroRosterView();
  const rosterNames = [
    "Mara Ironjaw",
    "Lyra Silverstring",
    "Bromli Dawnshield",
    "Kara Stoneguard",
    "Seraphina Valebright",
    "Eirwen Greenarrow",
    "Mira Quickstep",
    "Aelar Ashquill"
  ];

  assert.equal((view.match(/<article>/g) || []).length, rosterNames.length);
  assert.equal((view.match(/loading="lazy"/g) || []).length, rosterNames.length);

  for (const name of rosterNames) {
    assert.equal(
      (view.match(new RegExp(name, "g")) || []).length,
      2,
      `${name} should appear once in image alt text and once in its title.`
    );
    assert.equal(
      importedPregens.filter(card =>
        card.title.startsWith(`${name} · Level `) && card.art
      ).length,
      20,
      `${name} should have illustrated cards for levels 1–20.`
    );
  }

  console.log("Hero roster tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Hero roster test failed.", error);
  process.exitCode = 1;
}
