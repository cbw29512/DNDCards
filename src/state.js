import { allCards, cards, rooms } from "./data.js";
import { createState } from "./schema.js";

const STORAGE_KEY = "dungeon-cards-standalone-v1";
const logError = (message, error) => console.error(`[Dungeon Cards] ${message}`, error);

export const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    const state = { ...createState(), ...(saved || {}) };
    for (const room of rooms) {
      state.placedByRoom[room.id] ||= cards.filter(card => card.room === room.id).map(card => card.id);
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

export const updateState = (state, action) => {
  try {
    const next = structuredClone(state);
    next.lastError = null;
    if (action.type === "login-dm") {
      next.screen = "table";
      next.mode = "dm";
      next.identity = { role: "dm", name: action.name.trim() };
    }
    if (action.type === "login-player") {
      if (action.code.trim().toUpperCase() !== next.sessionCode) throw new Error("The table code does not match.");
      const id = `player-${Date.now()}`;
      next.players.push({ id, name: action.name.trim(), characterId: null, backpackIds: [] });
      next.activePlayerId = id;
      next.screen = "table";
      next.mode = "player";
      next.identity = { role: "player", name: action.name.trim(), playerId: id };
    }
    if (action.type === "logout") {
      next.screen = "landing";
      next.identity = null;
    }
    if (action.type === "mode") next.mode = action.value;
    if (action.type === "room") {
      next.roomId = action.id;
      next.revealedIds = [];
      next.activeEventId = null;
    }
    if (action.type === "reveal") {
      next.revealedIds = next.revealedIds.includes(action.id)
        ? next.revealedIds.filter(id => id !== action.id)
        : [...next.revealedIds, action.id];
    }
    if (action.type === "place") {
      const placed = next.placedByRoom[next.roomId] ||= [];
      if (!placed.includes(action.id)) placed.push(action.id);
    }
    if (action.type === "remove") {
      next.placedByRoom[next.roomId] = next.placedByRoom[next.roomId].filter(id => id !== action.id);
      next.revealedIds = next.revealedIds.filter(id => id !== action.id);
    }
    if (action.type === "join") {
      const id = `player-${Date.now()}`;
      next.players.push({ id, name: action.name.trim(), characterId: null, backpackIds: [] });
      next.activePlayerId = id;
    }
    if (action.type === "select-player") next.activePlayerId = action.id;
    if (action.type === "claim") {
      const player = next.players.find(player => player.id === next.activePlayerId);
      if (player && !next.players.some(other => other.characterId === action.id)) player.characterId = action.id;
    }
    if (action.type === "event") next.activeEventId = `event-${Math.floor(Math.random() * 10) + 1}`;
    saveState(next);
    return next;
  } catch (error) {
    logError(`Action "${action.type}" failed.`, error);
    return { ...state, lastError: error instanceof Error ? error.message : "The action could not be completed." };
  }
};

export const findCard = id => allCards.find(card => card.id === id);
