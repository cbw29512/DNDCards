/**
 * Runtime schema
 * Card: { id, kind, title, room, playerText, dmText, stats[] }
 * Player: { id, name, characterId, backpackIds[] }
 * State: private DM board + shared reveals + per-player collections.
 */
export const SLOT_KINDS = ["room", "npc", "monster", "trap", "treasure", "clue"];
export const TURN_RESOURCES = ["Movement", "Action", "Bonus action", "Free/interact", "Reaction"];

export const createState = () => ({
  screen: "landing",
  identity: null,
  lastError: null,
  mode: "dm",
  sessionCode: "HEARTH",
  roomId: "square",
  placedByRoom: {},
  revealedIds: [],
  players: [],
  activePlayerId: null,
  initiative: [],
  activeTurn: 0,
  round: 0,
  usedResources: [],
  activeEventId: null
});
