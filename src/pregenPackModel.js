const ABILITY_IDS = ["str", "dex", "con", "int", "wis", "cha"];
const ABILITY_NAMES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const SKILLS = [
  ["Acrobatics","dex"],["Animal Handling","wis"],["Arcana","int"],
  ["Athletics","str"],["Deception","cha"],["History","int"],
  ["Insight","wis"],["Intimidation","cha"],["Investigation","int"],
  ["Medicine","wis"],["Nature","int"],["Perception","wis"],
  ["Performance","cha"],["Persuasion","cha"],["Religion","int"],
  ["Sleight of Hand","dex"],["Stealth","dex"],["Survival","wis"]
];

export const modifier = score => Math.floor((Number(score) - 10) / 2);
export const signed = value => `${value >= 0 ? "+" : ""}${value}`;

const groupsOf = (items, size) => Array.from(
  { length: Math.ceil(items.length / size) },
  (_, index) => items.slice(index * size, (index + 1) * size)
);

const abilityPage = card => ({
  type: "abilities",
  label: "ABILITIES & PROFICIENCIES",
  abilities: ABILITY_IDS.map((id, index) => {
    const score = card.abilities[index];
    const proficient = card.savingThrowProficiencies?.includes(id);
    return {
      id: ABILITY_NAMES[index], score,
      modifier: modifier(score),
      save: modifier(score) + (proficient ? card.proficiencyBonus : 0),
      proficient
    };
  })
});

const expertiseSkills = card => {
  if (card.className === "Bard") return ["Performance", "Persuasion"];
  if (card.className === "Rogue") return card.edition === "2024"
    ? ["Sleight of Hand", "Stealth"] : ["Stealth"];
  if (card.className === "Ranger" && card.edition === "2024") return ["Survival"];
  return [];
};

export const skillRows = card => SKILLS.map(([name, ability]) => {
  const trained = card.skillProficiencies?.includes(name);
  const expertise = expertiseSkills(card).includes(name);
  const abilityIndex = ABILITY_IDS.indexOf(ability);
  return { name, ability:ability.toUpperCase(), trained, expertise,
    bonus:modifier(card.abilities[abilityIndex]) + (trained ? card.proficiencyBonus * (expertise ? 2 : 1) : 0) };
});

const skillPages = card => groupsOf(skillRows(card), 9).map((skills, index) => ({
  type:"skills", label:`SKILLS ${index + 1}/2`, skills,
  passivePerception:10 + skillRows(card).find(skill => skill.name === "Perception").bonus
}));

const training = card => {
  const classic = {
    Barbarian:"Light armor, Medium armor, Shields; Simple and Martial weapons",
    Bard:"Light armor; Simple weapons, hand crossbows, longswords, rapiers, shortswords; 3 instruments",
    Cleric:"Light armor, Medium armor, Shields; Simple weapons",
    Druid:"Light armor, Medium armor, Shields; Druid weapons; Herbalism Kit",
    Fighter:"All armor, Shields; Simple and Martial weapons",
    Monk:"No armor; Simple weapons and shortswords; one artisan tool or instrument",
    Paladin:"All armor, Shields; Simple and Martial weapons",
    Ranger:"Light armor, Medium armor, Shields; Simple and Martial weapons",
    Rogue:"Light armor; Simple weapons, hand crossbows, longswords, rapiers, shortswords; Thieves’ Tools",
    Sorcerer:"Daggers, darts, slings, quarterstaffs, light crossbows",
    Warlock:"Light armor; Simple weapons",
    Wizard:"Daggers, darts, slings, quarterstaffs, light crossbows"
  };
  const revised = {
    Barbarian:"Light armor, Medium armor, Shields; Simple and Martial weapons",
    Bard:"Light armor; Simple weapons; 3 musical instruments",
    Cleric:"Heavy armor and Martial weapons (Protector); Light and Medium armor, Shields, Simple weapons",
    Druid:"Light armor and Shields; Simple weapons; Herbalism Kit",
    Fighter:"All armor, Shields; Simple and Martial weapons",
    Monk:"No armor; Simple weapons and Martial weapons with the Light property; one artisan tool or instrument",
    Paladin:"All armor, Shields; Simple and Martial weapons",
    Ranger:"Light armor, Medium armor, Shields; Simple and Martial weapons",
    Rogue:"Light armor; Simple weapons and Martial weapons with Finesse or Light; Thieves’ Tools",
    Sorcerer:"Simple weapons",
    Warlock:"Light armor; Simple weapons",
    Wizard:"Simple weapons"
  };
  return (card.edition === "2024" ? revised : classic)[card.className] || "See class features";
};

const combatPages = card => groupsOf(card.actions || [], 4)
  .map((attacks, index, pages) => ({
    type: "combat",
    label: pages.length === 1
      ? "COMBAT ACTIONS"
      : `COMBAT ACTIONS ${index + 1}/${pages.length}`,
    attacks
  }));

const featurePages = card => {
  const features = [
    ...(card.classFeatures || []).map(text => ({ label: "CLASS", text })),
    ...(card.subclassFeatures || []).map(text => ({ label: "SUBCLASS", text })),
    ...(card.advancementChoices || []).map(text => ({ label: "BUILD", text }))
  ];
  return groupsOf(features, 2).map((entries, index, pages) => ({
    type: "features",
    label: `FEATURES ${index + 1}/${pages.length}`,
    entries,
    resources: index === 0 ? card.resources || [] : []
  }));
};

const spellPages = card => groupsOf(card.spellDetails || [], 2)
  .map((spells, index, pages) => ({
    type: "spells",
    label: `SPELLS ${index + 1}/${pages.length}`,
    spells,
    final: index === pages.length - 1
  }));

export const pregenPackPages = card => [
  { type: "portrait", label: "HERO FRONT" },
  { type:"status", label:"HEALTH & SURVIVAL" },
  abilityPage(card),
  ...skillPages(card),
  ...combatPages(card),
  ...featurePages(card),
  { type: "gear", label: "EQUIPMENT & NOTES", training:training(card) },
  { type:"rules", label:`${card.edition} TURN REFERENCE` },
  ...spellPages(card)
];

export const maxSpellSlot = card => Math.max(
  0,
  ...Object.keys(card.spellcasting?.slotsByLevel || {}).map(Number)
);

export const spellSlotKey = (card, spell) => `${card.id}:${spell.id}`;

export const findSpellAction = (card, spell) => (card.spellActions || [])
  .find(action => action.spellId === spell.id);
