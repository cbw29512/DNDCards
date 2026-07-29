import { allCards } from "./data.js";

const abilityOrder = (a, b) => {
  const left = a.abilities || [0,0,0,0,0,0];
  const right = b.abilities || [0,0,0,0,0,0];
  for (const index of [1,0,2,3,4,5]) {
    if (left[index] !== right[index]) return right[index] - left[index];
  }
  return a.title.localeCompare(b.title);
};

const orderEntries = (a, b) =>
  Number(b.openingTurn) - Number(a.openingTurn)
  || b.total - a.total
  || abilityOrder(a, b);

export const rollInitiative = (state, random = Math.random) => {
  try {
    const playerCards = state.players.map(player => allCards.find(card => card.id === player.characterId)).filter(Boolean);
    const monsters = (state.placedByRoom[state.roomId] || [])
      .map(id => allCards.find(card => card.id === id))
      .filter(card => card?.kind === "monster");
    const groups = [...new Map(monsters.map(card => [card.id, card])).values()];
    const normal = [...playerCards, ...groups].map((card, index) => {
      const roll = Math.floor(random() * 20) + 1;
      return {
        entryId: `${card.id}-normal-${index}`, id: card.id, title: card.title,
        roll, total: roll + (card.initiative || 0), abilities: card.abilities,
        openingTurn: false, groupSize: monsters.filter(monster => monster.id === card.id).length || 1
      };
    }).sort(orderEntries);
    const opening = normal.filter(entry => entry.roll === 20)
      .map(entry => ({ ...entry, entryId: `${entry.id}-opening`, openingTurn: true }))
      .sort(orderEntries);
    return {
      ...state, initiative: [...opening, ...normal], activeTurn: 0,
      round: opening.length ? 0 : 1, usedResources: []
    };
  } catch (error) {
    console.error("[Dungeon Cards] Initiative roll failed.", error);
    return state;
  }
};

export const finishTurn = state => {
  try {
    if (!state.initiative.length) return state;
    const atEnd = state.activeTurn >= state.initiative.length - 1;
    const nextTurn = atEnd ? 0 : state.activeTurn + 1;
    const entersRoundOne = state.round === 0 && !state.initiative[nextTurn]?.openingTurn;
    return {
      ...state, activeTurn: nextTurn,
      round: atEnd ? Math.max(1, state.round + 1) : entersRoundOne ? 1 : state.round,
      usedResources: []
    };
  } catch (error) {
    console.error("[Dungeon Cards] Could not advance the turn.", error);
    return state;
  }
};
