import { allCards, cards, rooms } from "./data.js?v=character-art-2";
import { createState } from "./schema.js?v=character-art-2";

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
    state.spellSlotByCard ||= {};
    state.readyByEntryId ||= {};
    state.reactionSpentCardIds ||= [];
    state.readyHistory ||= [];
    const legacyPreview = state.players.find(player => player.id === "player-preview");
    if (legacyPreview) {
      // Older builds stored the DM preview as a real player. Migrate that
      // presentation choice without letting it claim a hero or enter combat.
      state.previewCharacterId ||= legacyPreview.characterId;
      state.players = state.players.filter(player => player.id !== "player-preview");
      if (state.activePlayerId === "player-preview") {
        state.activePlayerId = state.players[0]?.id || null;
      }
      delete state.equipmentByPlayer["player-preview"];
      delete state.pendingItemsByPlayer["player-preview"];
    }
    for (const room of rooms) {
      state.placedByRoom[room.id] ||= cards.filter(card => card.room === room.id).map(card => card.id);
    }
    state.healthByCard ||= {};
    for (const card of allCards) {
      const statistics = card.stats || card.quickStats || [];
      const maximum = Number(statistics.find(stat => stat.startsWith("♥"))?.match(/\d+/)?.[0]);
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
