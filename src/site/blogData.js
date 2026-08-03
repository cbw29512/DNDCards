export const blogPosts = [
  {
    id: "choose-first-rpg",
    title: "So You Want to Play a Tabletop Roleplaying Game",
    excerpt: "Choose by the experience your group wants—not by the size of the rulebook or the loudest fandom.",
    date: "2026-08-03",
    tags: ["Beginners", "System choice"],
    sections: [
      ["Start with the desired story", ["Heroic tactical fantasy points toward D&D or Pathfinder.", "Collaborative cinematic fantasy points toward Daggerheart.", "Investigation and vulnerability point toward Call of Cthulhu.", "Personal and political horror point toward Vampire."]],
      ["Match the rules load", ["D&D is broadly supported and moderately structured.", "Pathfinder rewards players who enjoy detailed tactical choices.", "Daggerheart shifts more authority into shared narrative play.", "Horror games require especially clear consent and tone-setting."]],
      ["Choose a first session", ["Use pre-generated characters.", "Run a published quick-start or beginner adventure.", "Schedule a clear ending time.", "Debrief what the group liked before committing to a campaign."]]
    ]
  },
  {
    id: "dnd-2014-vs-2024",
    title: "D&D 2014 or 2024: Pick a Baseline Before You Build",
    excerpt: "Both fifth-edition rulesets are usable, but same-named features and spells may not work identically.",
    date: "2026-08-03",
    tags: ["D&D", "Editions"],
    sections: [
      ["Use visible edition labels", ["Mark every character, spell, monster, feat, item, and card as 2014 or 2024.", "Use SRD 5.1 for the 2014 open baseline and SRD 5.2.1 for the revised baseline.", "Do not copy D&D Beyond Basic Rules into creator products; use the SRD."]],
      ["Write conversion notes", ["State what changed and why.", "Preserve the player’s concept even when mechanics change.", "Test mixed-edition interactions instead of assuming compatibility."]]
    ]
  },
  {
    id: "pathfinder-three-actions",
    title: "Why Pathfinder’s Three Actions Change Everything",
    excerpt: "The important shift is not merely getting three actions—it is choosing among movement, attacks, defense, knowledge, and teamwork.",
    date: "2026-08-03",
    tags: ["Pathfinder", "Combat"],
    sections: [
      ["Stop attacking by default", ["Repeated attacks become less accurate through the multiple attack penalty.", "Raise a Shield, Step, Demoralize, Recall Knowledge, and movement can be stronger than a low-accuracy third Strike.", "Traits reveal which actions contribute to penalties or trigger reactions."]],
      ["Build teamwork", ["Small bonuses and penalties can change both hits and critical hits.", "Create off-guard, frightened, aided, and positioned advantages together.", "Plan the party’s sequence rather than four isolated turns."]]
    ]
  },
  {
    id: "mysteries-without-dead-ends",
    title: "Run Mysteries Without Dead-End Clue Rolls",
    excerpt: "The mystery should continue when a roll fails; the cost should be danger, time, trust, or incomplete understanding.",
    date: "2026-08-03",
    tags: ["GM advice", "Horror"],
    sections: [
      ["Separate clues from complications", ["Give an essential clue when investigators use a sensible approach in the correct place.", "Roll to learn more, avoid danger, preserve evidence, or act before the opposition.", "Provide several clues for every conclusion the players must reach."]],
      ["Advance the opposition", ["Maintain a timeline of what the antagonist does without interference.", "Use failure to move that timeline forward.", "Let players recover through a different clue source rather than repeating the same roll."]]
    ]
  }
];

export const blogPostById = id => blogPosts.find(post => post.id === id);