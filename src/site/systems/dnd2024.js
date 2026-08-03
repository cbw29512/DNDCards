export const dnd2024 = {
  id: "dnd-2024",
  name: "D&D Fifth Edition — 2024 rules",
  shortName: "D&D 5E (2024)",
  kicker: "Revised fifth edition · d20 · heroic fantasy",
  summary: "The revised fifth-edition framework represented by SRD 5.2.1, with updated character creation, rules glossary, classes, feats, monsters, equipment, and weapon mastery.",
  audience: "Best for groups entering D&D now or wanting the current revised core rules.",
  licenseStatus: "Open rules available",
  licenseTone: "open",
  legal: {
    basis: "Use material from SRD 5.2.1 under CC BY 4.0, with its required attribution.",
    safe: ["Original teaching text", "SRD 5.2.1 mechanics with attribution", "Original adventures and compatible rules content"],
    avoid: ["Copying D&D Beyond Basic Rules instead of the SRD", "Official settings, logos, art, and trade dress", "Treating every 2014 option as automatically updated"],
    attribution: "This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode."
  },
  sources: [
    ["Official SRD 5.2.1", "https://www.dndbeyond.com/srd"],
    ["Official creator FAQ", "https://www.dndbeyond.com/creator-faq"]
  ],
  player: [
    ["Build a character", ["Choose a class, species, background, ability scores, skills, equipment, and motivation.", "Backgrounds connect ability-score choices and an Origin feat to the character’s past; species supplies innate traits.", "Use one rules version consistently and mark imported legacy options for GM review."]],
    ["Make a test", ["Roll d20 + the relevant modifier and add proficiency when the rule says you are proficient.", "Attack rolls compare with Armor Class; ability checks and saving throws compare with a Difficulty Class.", "Advantage and disadvantage remain core tools and normally cancel one another."]],
    ["Use your turn", ["Move and take one action; a feature may enable a bonus action, and a trigger may enable a reaction.", "The rules glossary defines actions and conditions precisely, so check the glossary when wording matters.", "Weapon Mastery can give trained martial characters additional tactical effects with selected weapons."]],
    ["Cast spells", ["Spell slots, prepared spells, concentration, components, range, and duration remain central.", "Use the 2024 spell text: familiar spell names may have revised timing, targets, damage, or effects.", "Track which features recover on a short rest, long rest, or another stated trigger."]],
    ["Damage and recovery", ["Hit points measure your ability to remain in the fight; 0 hit points invokes the current dying rules.", "Rest rules and class recovery are defined by the revised text and can differ from 2014 details.", "Heroic Inspiration, conditions, and glossary terms should be recorded where the whole table can see them."]],
    ["Advance", ["Levels add class features, feats, spell access, hit points, and other improvements.", "Plan the character around a play style rather than a single damage combination.", "When using legacy material, document the source and the GM’s compatibility ruling."]]
  ],
  gm: [
    ["Prepare with the glossary", ["Use SRD 5.2.1 as the rules baseline and link directly to the current version.", "Write rulings in the language of the current glossary to reduce edition confusion.", "Maintain an edition tag on every card, article, monster, spell, and pre-generated character."]],
    ["Adjudicate checks", ["Call for a test only when uncertainty and consequence are both present.", "Choose the ability, proficiency, DC, and consequence before the die lands.", "Use advantage or disadvantage for meaningful situational edges rather than stacking small modifiers."]],
    ["Build encounters", ["Balance action economy, terrain, objectives, monster roles, and expected resources.", "Create alternatives to total defeat: retreat, capture, negotiation, alarms, or changing objectives.", "Test encounter math with the exact 2024 stat blocks and character options being used."]],
    ["Design creatures", ["Give the creature a readable purpose, defenses, attacks, movement, and one signature behavior.", "Audit recharge abilities, repeated saving throws, control effects, and burst damage.", "Keep lore original unless the specific material is licensed for reuse."]],
    ["Design magic items", ["State category, rarity, attunement, activation, charges, recharge, duration, and edge cases.", "Compare against SRD 5.2.1 items in the same rarity and intended tier.", "Test interactions with weapon mastery, class resources, concentration, and repeated bonus actions."]],
    ["Run a mixed-edition table", ["Declare the campaign baseline in session zero.", "Do not combine same-named features from different editions without a written ruling.", "Create a conversion note instead of silently changing a player’s character."]]
  ]
};