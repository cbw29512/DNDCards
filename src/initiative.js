import { allCards } from "./data.js";

const bonus = card => Number(card?.stats?.find(stat => stat.startsWith("Initiative"))?.match(/[-+]?\d+/)?.[0] || 0);

export const rollInitiative = state => {
  try {
    const playerCards = state.players.map(player => allCards.find(card => card.id === player.characterId)).filter(Boolean);
    const monsterCards = (state.placedByRoom[state.roomId] || [])
      .map(id => allCards.find(card => card.id === id))
      .filter(card => card?.kind === "monster");
    const uniqueMonsters = [...new Map(monsterCards.map(card => [card.id, card])).values()];
    const entries = [...playerCards, ...uniqueMonsters].map(card => {
      const roll = Math.floor(Math.random() * 20) + 1;
      return { id: card.id, title: card.title, roll, total: roll + bonus(card) };
    });
    entries.sort((a, b) => (b.roll === 20) - (a.roll === 20) || b.total - a.total || a.title.localeCompare(b.title));
    return { ...state, initiative: entries, activeTurn: 0, round: 1, usedResources: [] };
  } catch (error) {
    console.error("[Dungeon Cards] Initiative roll failed.", error);
    return state;
  }
};

export const finishTurn = state => {
  try {
    if (!state.initiative.length) return state;
    const atEnd = state.activeTurn >= state.initiative.length - 1;
    return {
      ...state,
      activeTurn: atEnd ? 0 : state.activeTurn + 1,
      round: atEnd ? state.round + 1 : state.round,
      usedResources: []
    };
  } catch (error) {
    console.error("[Dungeon Cards] Could not advance the turn.", error);
    return state;
  }
};
