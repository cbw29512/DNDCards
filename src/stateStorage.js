import { allCards, cards, rooms } from "./data.js";
import { createState } from "./schema.js";

const STORAGE_KEY = "dungeon-cards-standalone-v1";
const logError = (message, error) => console.error(`[Dungeon Cards] ${message}`, error);

export const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    const state = { ...createState(), ...(saved || {}) };
    state.equipmentByPlayer ||= {};
    state.pendingItemsByPlayer ||= {};
    state.dmFrontCardIds ||= [];
    state.libraryBackIds ||= [];
    for (const room of rooms) {
      state.placedByRoom[room.id] ||= cards.filter(card => card.room === room.id).map(card => card.id);
    }
    state.healthByCard ||= {};
    for (const card of allCards) {
      const maximum = Number(card.stats?.find(stat => stat.startsWith("♥"))?.match(/\d+/)?.[0]);
      if (maximum && !state.healthByCard[card.id]) state.healthByCard[card.id] = { current:maximum, maximum };
    }
    return state;
  } catch (error) {
    logError("Could not load the table; a fresh table was created.", error);
    return createState();
  }
};

export const saveState = state => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    logError("Could not save the table.", error);
  }
};
