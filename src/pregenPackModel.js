const ABILITY_IDS = ["str", "dex", "con", "int", "wis", "cha"];
const ABILITY_NAMES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

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

const featurePages = card => {
  const features = [
    ...(card.classFeatures || []).map(text => ({ label: "CLASS", text })),
    ...(card.subclassFeatures || []).map(text => ({ label: "SUBCLASS", text })),
    ...(card.advancementChoices || []).map(text => ({ label: "BUILD", text }))
  ];
  return groupsOf(features, 3).map((entries, index, pages) => ({
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
  abilityPage(card),
  { type: "combat", label: "COMBAT ACTIONS", attacks: card.actions || [] },
  ...featurePages(card),
  { type: "gear", label: "EQUIPMENT & NOTES" },
  ...spellPages(card)
];

export const maxSpellSlot = card => Math.max(
  0,
  ...Object.keys(card.spellcasting?.slotsByLevel || {}).map(Number)
);

export const spellSlotKey = (card, spell) => `${card.id}:${spell.id}`;

export const findSpellAction = (card, spell) => (card.spellActions || [])
  .find(action => action.spellId === spell.id);
