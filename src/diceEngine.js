const FORMULA = /^(\d+)d(\d+)([+-]\d+)?$/i;

export const parseFormula = formula => {
  try {
    const match = String(formula).replace(/\s+/g, "").match(FORMULA);
    if (!match) throw new Error(`Invalid dice formula: ${formula}`);
    const count = Number(match[1]);
    const sides = Number(match[2]);
    const modifier = Number(match[3] || 0);
    if (count < 1 || count > 100 || sides < 2 || sides > 1000) throw new Error("Dice formula is outside safe limits.");
    return { count, sides, modifier };
  } catch (error) {
    console.error("[Dungeon Cards] Dice formula could not be parsed.", error);
    throw error;
  }
};

export const rollFormula = (formula, random = Math.random, critical = false) => {
  try {
    const parsed = parseFormula(formula);
    const diceCount = critical ? parsed.count * 2 : parsed.count;
    const dice = Array.from({ length: diceCount }, () => Math.floor(random() * parsed.sides) + 1);
    return { formula, dice, modifier: parsed.modifier, total: dice.reduce((sum, die) => sum + die, parsed.modifier) };
  } catch (error) {
    console.error("[Dungeon Cards] Dice roll failed.", error);
    throw error;
  }
};

export const executeCardAction = (card, actionId, random = Math.random, options = {}) => {
  try {
    const baseAction = card.actions?.find(candidate => candidate.id === actionId);
    if (!baseAction) throw new Error(`Unknown action ${actionId} on ${card.title}.`);
    const action = options.transformAction
      ? options.transformAction(card, baseAction, options.slotLevel)
      : baseAction;
    if (action.kind === "attack") {
      const attack = rollFormula(action.roll, random);
      const critical = attack.dice[0] === 20;
      const damage = action.damage ? rollFormula(action.damage, random, critical) : null;
      return { cardId: card.id, cardTitle: card.title, action, attack, damage, critical };
    }
    const roll = action.roll ? rollFormula(action.roll, random) : null;
    const damage = action.damage ? rollFormula(action.damage, random) : null;
    return { cardId: card.id, cardTitle: card.title, action, roll, damage, critical: false };
  } catch (error) {
    console.error("[Dungeon Cards] Card action failed.", error);
    throw error;
  }
};
