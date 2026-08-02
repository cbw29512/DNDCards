const logError = (message, error) => console.error(`[Dungeon Cards] ${message}`, error);

const slotKey = (cardId, level) => `${cardId}:${level}`;
const maximumAt = (card, level) => Number(card.spellcasting?.slotsByLevel?.[level] || 0);
const isPactCaster = card => (card.resources || []).some(resource => resource.id === "pact-slots");

export const remainingSpellSlots = (state, card, level) => {
  try {
    const stored = state.spellSlotsRemainingByCard?.[slotKey(card.id, level)];
    return Number.isFinite(stored) ? stored : maximumAt(card, level);
  } catch (error) {
    logError("Spell slots could not be read.", error);
    return 0;
  }
};

export const allowedSpellSlotLevels = (card, spell) => {
  try {
    const levels = Object.keys(card.spellcasting?.slotsByLevel || {}).map(Number).sort((a,b) => a-b);
    if (!spell.level) return [];
    if (isPactCaster(card)) return levels.filter(level => level >= spell.level);
    return levels.filter(level => level >= spell.level);
  } catch (error) {
    logError("Legal spell levels could not be built.", error);
    return [];
  }
};

export const consumeSpellSlot = (state, card, level) => {
  try {
    const numericLevel = Number(level);
    if (!numericLevel) return;
    const maximum = maximumAt(card, numericLevel);
    if (!maximum) throw new Error(`This hero has no level ${numericLevel} spell slots.`);
    const remaining = remainingSpellSlots(state, card, numericLevel);
    if (remaining < 1) throw new Error(`No level ${numericLevel} spell slots remain.`);
    state.spellSlotsRemainingByCard ||= {};
    state.spellSlotsRemainingByCard[slotKey(card.id, numericLevel)] = remaining - 1;
  } catch (error) {
    logError("Spell slot could not be spent.", error);
    throw error;
  }
};

export const adjustSpellSlotState = (next, action, allCards) => {
  try {
    const card = allCards.find(candidate => candidate.id === action.cardId);
    const level = Number(action.level);
    const maximum = card ? maximumAt(card, level) : 0;
    if (!card || !maximum) throw new Error("That spell slot could not be found.");
    next.spellSlotsRemainingByCard ||= {};
    const key = slotKey(card.id, level);
    const current = remainingSpellSlots(next, card, level);
    next.spellSlotsRemainingByCard[key] = Math.max(0, Math.min(maximum, current + Number(action.amount)));
    return true;
  } catch (error) {
    logError("Spell slot total could not be adjusted.", error);
    throw error;
  }
};

export const recoverSpellSlots = (next, restType, allCards) => {
  try {
    next.spellSlotsRemainingByCard ||= {};
    for (const card of allCards.filter(candidate => candidate.kind === "character")) {
      if (restType === "short" && !isPactCaster(card)) continue;
      for (const [level, maximum] of Object.entries(card.spellcasting?.slotsByLevel || {})) {
        next.spellSlotsRemainingByCard[slotKey(card.id, level)] = Number(maximum);
      }
    }
  } catch (error) {
    logError("Spell slots could not be recovered.", error);
    throw error;
  }
};
