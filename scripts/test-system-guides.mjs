import assert from "node:assert/strict";
import { systems, systemById } from "../src/site/catalog.js";
import { blogPosts } from "../src/site/blogData.js";
import { communitySchema, sampleListings } from "../src/site/communityData.js";
import { routeStateFromHash, siteView } from "../src/site/siteView.js";

try {
  assert.equal(systems.length, 6);
  assert.equal(new Set(systems.map(system => system.id)).size, systems.length, "System IDs must be unique.");
  for (const system of systems) {
    assert.ok(system.player.length >= 6, `${system.id} needs a complete player path.`);
    assert.ok(system.gm.length >= 6, `${system.id} needs a complete GM path.`);
    assert.ok(system.sources.length >= 2, `${system.id} needs official sources.`);
    assert.ok(system.legal.basis && system.legal.attribution, `${system.id} needs legal guidance.`);
    assert.match(siteView(`system/${system.id}`), new RegExp(system.shortName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.equal(systemById("dnd-2014").licenseTone, "open");
  assert.equal(systemById("call-of-cthulhu-7e").licenseTone, "restricted");
  assert.equal(systemById("vampire-v5").licenseTone, "restricted");
  assert.ok(blogPosts.length >= 4);
  assert.ok(sampleListings.every(item => item.system && item.role && item.region));
  assert.ok(communitySchema.privacy.includes("No public email or phone number"));
  assert.deepEqual(routeStateFromHash("#/community?system=daggerheart&role=gm"), {
    route:"community",
    communityFilters:{ system:"daggerheart", role:"gm" },
    section:""
  });
  assert.deepEqual(routeStateFromHash("#/system/dnd-2024?section=gm-guide"), {
    route:"system/dnd-2024",
    communityFilters:{ system:"all", role:"all" },
    section:"gm-guide"
  });
  assert.match(siteView("system/dnd-2024"), /section=gm-guide/);
  assert.match(siteView("home"), /So you want to play a/);
  assert.match(siteView("community", null, { communityFilters:{ system:"daggerheart", role:"gm" } }), /Seeking a GM/);
  console.log("Multi-system guide tests passed.");
} catch (error) {
  console.error("[Find Your Table] Multi-system guide test failed.", error);
  process.exitCode = 1;
}
