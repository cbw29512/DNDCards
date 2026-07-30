/**
 * Runtime schema
 * Card actions use structured dice data:
 * { id, label, icon, kind, roll?, damage?, save?, range?, effect?, cost? }
 * Player: { id, name, characterId, backpackIds[] }
 * State: private DM board + shared reveals + per-player collections.
 */
export const SLOT_KINDS = ["room", "npc", "monster", "trap", "treasure", "clue"];
export const BOARD_KINDS = ["room", "monster", "trap", "treasure"];
export const EQUIPMENT_SLOTS = [
  "head", "neck", "armor", "back", "mainHand", "offHand",
  "hands", "waist", "feet", "ring1", "ring2"
];
export const TURN_RESOURCES = ["Movement", "Action", "Bonus action", "Free/interact", "Reaction"];

export const createState = () => ({
  screen: "landing",
  identity: null,
  lastError: null,
  mode: "dm",
  tableTab: "adventure",
  boardPerspective: "dm",
  adventureId: null,
  adventureComplete: false,
  completedRoomIds: [],
  sessionCode: "HEARTH",
  roomId: "square",
  placedByRoom: {},
  revealedIds: [],
  players: [],
  activePlayerId: null,
  equipmentByPlayer: {},
  pendingItemsByPlayer: {},
  initiative: [],
  activeTurn: 0,
  round: 0,
  usedResources: [],
  activeEventId: null,
  healthByCard: {},
  lastRoll: null,
  rollHistory: []
});
