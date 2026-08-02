const maximumHp = card => Number(card.quickStats?.find(value => value.startsWith("♥"))?.match(/\d+/)?.[0] || 1);

export const characterStatus = (state, card) => ({
  hp: state.healthByCard?.[card.id] || { current:maximumHp(card), maximum:maximumHp(card) },
  temporaryHp: Number(state.temporaryHpByCard?.[card.id] || 0),
  hitDice: Number(state.hitDiceByCard?.[card.id] ?? card.level),
  deathSuccesses: Number(state.deathSavesByCard?.[card.id]?.successes || 0),
  deathFailures: Number(state.deathSavesByCard?.[card.id]?.failures || 0),
  inspiration: Boolean(state.inspirationByCard?.[card.id])
});

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));

export const updateCharacterSheetState = (state, action, cards) => {
  const card = cards.find(candidate => candidate.id === action.cardId);
  if (!card || card.kind !== "character") return;
  if (action.type === "adjust-temp-hp") {
    state.temporaryHpByCard[card.id] = clamp(Number(state.temporaryHpByCard[card.id] || 0) + action.amount, 0, 999);
  }
  if (action.type === "adjust-hit-die") {
    const current = Number(state.hitDiceByCard[card.id] ?? card.level);
    state.hitDiceByCard[card.id] = clamp(current + action.amount, 0, card.level);
  }
  if (action.type === "adjust-death-save") {
    const saves = state.deathSavesByCard[card.id] ||= { successes:0, failures:0 };
    saves[action.result] = clamp(Number(saves[action.result] || 0) + action.amount, 0, 3);
  }
  if (action.type === "reset-death-saves") state.deathSavesByCard[card.id] = { successes:0, failures:0 };
  if (action.type === "toggle-inspiration") state.inspirationByCard[card.id] = !state.inspirationByCard[card.id];
};

export const recoverCharacterSheets = (state, cards) => {
  for (const card of cards.filter(candidate => candidate.kind === "character")) {
    const spent = card.level - Number(state.hitDiceByCard[card.id] ?? card.level);
    const regained = card.edition === "2024" ? spent : Math.min(spent, Math.max(1, Math.floor(card.level / 2)));
    state.hitDiceByCard[card.id] = clamp(Number(state.hitDiceByCard[card.id] ?? card.level) + regained, 0, card.level);
    state.temporaryHpByCard[card.id] = 0;
    state.deathSavesByCard[card.id] = { successes:0, failures:0 };
  }
};
