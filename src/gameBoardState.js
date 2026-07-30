export const updateGameBoardState = (next, action) => {
  if (action.type === "board-perspective") {
    if (next.identity?.role !== "dm") throw new Error("Only the DM can switch table previews.");
    next.boardPerspective = action.id;
    return true;
  }
  if (action.type === "flip-card") {
    if (next.identity?.role !== "dm") throw new Error("Only the DM can inspect private card backs.");
    next.dmFrontCardIds = next.dmFrontCardIds.includes(action.id)
      ? next.dmFrontCardIds.filter(id => id !== action.id)
      : [...next.dmFrontCardIds, action.id];
    return true;
  }
  if (action.type !== "preview-character") return false;
  if (next.identity?.role !== "dm") throw new Error("Only the DM can create preview characters.");
  let player = next.players.find(candidate => candidate.id === "player-preview");
  if (!player) {
    player = { id:"player-preview", name:"Player Preview", characterId:null, backpackIds:[] };
    next.players.push(player);
  }
  player.characterId = action.id;
  next.activePlayerId = player.id;
  next.equipmentByPlayer[player.id] ||= {};
  next.pendingItemsByPlayer[player.id] ||= [];
  return true;
};
