import { findAdventure } from "./adventures.js";
import { cards } from "./data.js?v=rules-ui-audit-1";

export const loadAdventureIntoState = (state, adventureId) => {
  const adventure = findAdventure(adventureId);
  if (!adventure) throw new Error("That adventure pack could not be found.");

  state.adventureId = adventure.id;
  state.adventureComplete = false;
  state.completedRoomIds = [];
  state.roomId = adventure.roomIds[0];
  state.placedByRoom ||= {};
  for (const roomId of adventure.roomIds) {
    state.placedByRoom[roomId] = cards.filter(card => card.room === roomId).map(card => card.id);
  }
  state.revealedIds = [];
  state.activeEventId = null;
  state.tableTab = "board";
  return adventure;
};
