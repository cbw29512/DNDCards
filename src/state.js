import { allCards, cards } from "./data.js";
import { findAdventure } from "./adventures.js";
import { updateEquipmentState } from "./equipmentState.js";
import { loadState, saveState } from "./stateStorage.js";
import { updateGameBoardState } from "./gameBoardState.js";

const logError = (message, error) => console.error(`[Dungeon Cards] ${message}`, error);
export { loadState, saveState };
export const updateState = (state, action) => {
  try {
    const next = structuredClone(state);
    next.lastError = null;
    if (action.type === "login-dm") {
      next.screen = "table";
      next.mode = "dm";
      next.tableTab = next.adventureId ? "board" : "adventure";
      next.boardPerspective = "dm";
      next.identity = { role: "dm", name: action.name.trim() };
    }
    if (action.type === "login-player") {
      if (action.code.trim().toUpperCase() !== next.sessionCode) throw new Error("The table code does not match.");
      const id = `player-${Date.now()}`;
      next.players.push({ id, name: action.name.trim(), characterId: null, backpackIds: [] });
      next.activePlayerId = id;
      next.screen = "table";
      next.mode = "player";
      next.tableTab = "board";
      next.boardPerspective = "player";
      next.identity = { role: "player", name: action.name.trim(), playerId: id };
    }
    if (action.type === "logout") {
      next.screen = "landing";
      next.identity = null;
    }
    if (action.type === "mode") {
      if (next.identity?.role !== "dm" && action.value === "dm") {
        throw new Error("Only the Dungeon Master can open the private build screen.");
      }
      next.mode = action.value;
    }
    if (action.type === "table-tab") next.tableTab = action.id;
    updateGameBoardState(next, action);
    if (action.type === "load-adventure") {
      const adventure = findAdventure(action.id);
      if (!adventure) throw new Error("That adventure pack could not be found.");
      next.adventureId = adventure.id;
      next.adventureComplete = false;
      next.completedRoomIds = [];
      next.roomId = adventure.roomIds[0];
      for (const roomId of adventure.roomIds) {
        next.placedByRoom[roomId] = cards.filter(card => card.room === roomId).map(card => card.id);
      }
      next.revealedIds = [];
      next.activeEventId = null;
      next.tableTab = "board";
    }
    if (action.type === "next-room" || action.type === "previous-room") {
      const adventure = findAdventure(next.adventureId);
      if (!adventure) throw new Error("Load an adventure before changing rooms.");
      const current = adventure.roomIds.indexOf(next.roomId);
      const offset = action.type === "next-room" ? 1 : -1;
      if (action.type === "next-room" && !next.completedRoomIds.includes(next.roomId)) {
        next.completedRoomIds.push(next.roomId);
      }
      const target = current + offset;
      if (target >= adventure.roomIds.length) {
        next.adventureComplete = true;
      } else if (target >= 0) {
        next.roomId = adventure.roomIds[target];
        next.revealedIds = [];
        next.activeEventId = null;
      }
    }
    if (action.type === "complete-room" && !next.completedRoomIds.includes(next.roomId)) {
      next.completedRoomIds.push(next.roomId);
    }
    if (action.type === "resume-adventure") next.adventureComplete = false;
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
      next.equipmentByPlayer[id] = {};
      next.pendingItemsByPlayer[id] = [];
    }
    if (action.type === "select-player") next.activePlayerId = action.id;
    if (action.type === "claim") {
      const player = next.players.find(player => player.id === next.activePlayerId);
      if (player && !next.players.some(other => other.characterId === action.id)) {
        player.characterId = action.id;
        next.equipmentByPlayer[player.id] ||= {};
        next.pendingItemsByPlayer[player.id] ||= [];
      }
    }
    updateEquipmentState(next, action, allCards);
    if (action.type === "event") next.activeEventId = `event-${Math.floor(Math.random() * 10) + 1}`;
    if (action.type === "adjust-health") {
      const health = next.healthByCard[action.id];
      if (!health) throw new Error("This card does not track health.");
      health.current = Math.max(0, Math.min(health.maximum, health.current + action.amount));
    }
    if (action.type === "rest") {
      next.usedResources = [];
      if (action.restType === "long") {
        for (const card of allCards.filter(candidate => candidate.kind === "character")) {
          const health = next.healthByCard[card.id];
          if (health) health.current = health.maximum;
        }
      }
    }
    saveState(next);
    return next;
  } catch (error) {
    logError(`Action "${action.type}" failed.`, error);
    return { ...state, lastError: error instanceof Error ? error.message : "The action could not be completed." };
  }
};

export const findCard = id => allCards.find(card => card.id === id);
