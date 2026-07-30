import { parseFormula } from "./diceEngine.js";

const RULES = {
  "OLD-RULE-fireball": { baseLevel: 3, dicePerLevel: 1 },
  "OLD-RULE-cure-wounds": { baseLevel: 1, dicePerLevel: 1 },
  "OLD-RULE-healing-word": { baseLevel: 1, dicePerLevel: 1 },
  "OLD-RULE-magic-missile": { baseLevel: 1, dicePerLevel: 1, modifierPerLevel: 1 },
  "OLD-RULE-scorching-ray": { baseLevel: 2, dicePerLevel: 2 },
  "OLD-RULE-burning-hands": { baseLevel: 1, dicePerLevel: 1 },
  "OLD-RULE-thunderwave": { baseLevel: 1, dicePerLevel: 1 },
  "OLD-RULE-shatter": { baseLevel: 2, dicePerLevel: 1 },
  "OLD-RULE-lightning-bolt": { baseLevel: 3, dicePerLevel: 1 },
  "OLD-RULE-cone-of-cold": { baseLevel: 5, dicePerLevel: 1 },
  "OLD-RULE-call-lightning": { baseLevel: 3, dicePerLevel: 1 },
  "OLD-RULE-moonbeam": { baseLevel: 2, dicePerLevel: 1 },
  "OLD-RULE-blight": { baseLevel: 4, dicePerLevel: 1 },
  "OLD-RULE-guiding-bolt": { baseLevel: 1, dicePerLevel: 1 },
  "OLD-RULE-hellish-rebuke": { baseLevel: 1, dicePerLevel: 1 }
};

export const getUpcastRule = card => RULES[card?.id] || null;

export const normalizeSpellSlot = (card, requestedLevel) => {
  try {
    const rule = getUpcastRule(card);
    if (!rule) return null;
    const level = Number(requestedLevel);
    return Number.isInteger(level)
      ? Math.min(9, Math.max(rule.baseLevel, level))
      : rule.baseLevel;
  } catch (error) {
    console.error("[Dungeon Cards] Spell slot could not be normalized.", error);
    return null;
  }
};

export const upcastFormula = (formula, rule, slotLevel) => {
  try {
    if (!formula || !rule) return formula;
    const parsed = parseFormula(formula);
    const addedLevels = Math.max(0, slotLevel - rule.baseLevel);
    const count = parsed.count + (addedLevels * rule.dicePerLevel);
    const modifier = parsed.modifier + (addedLevels * (rule.modifierPerLevel || 0));
    return `${count}d${parsed.sides}${modifier ? `${modifier > 0 ? "+" : ""}${modifier}` : ""}`;
  } catch (error) {
    console.error("[Dungeon Cards] Upcast formula could not be calculated.", error);
    throw error;
  }
};

export const spellActionAtLevel = (card, action, requestedLevel) => {
  try {
    const rule = getUpcastRule(card);
    if (!rule) return action;
    const slotLevel = normalizeSpellSlot(card, requestedLevel);
    return {
      ...action,
      roll: upcastFormula(action.roll, rule, slotLevel),
      damage: upcastFormula(action.damage, rule, slotLevel),
      slotLevel,
      baseLevel: rule.baseLevel
    };
  } catch (error) {
    console.error("[Dungeon Cards] Spell action could not be upcast.", error);
    throw error;
  }
};

export const spellSlotOptions = (card, selectedLevel) => {
  try {
    const rule = getUpcastRule(card);
    if (!rule) return [];
    const selected = normalizeSpellSlot(card, selectedLevel);
    return Array.from({ length: 10 - rule.baseLevel }, (_, index) => {
      const level = rule.baseLevel + index;
      return { level, selected: level === selected };
    });
  } catch (error) {
    console.error("[Dungeon Cards] Spell slot choices could not be built.", error);
    return [];
  }
};
