export const updateGameBoardState = (next, action) => {
  if (action.type === "board-perspective") {
    if (next.identity?.role !== "dm") throw new Error("Only the DM can switch table previews.");
    next.boardPerspective = action.id;
    return true;
  }
  if (action.type === "flip-card") {
    if (next.identity?.role !== "dm") throw new Error("Only the DM can inspect private card backs.");
    next.dmFrontCardIds ||= [];
    next.dmFrontCardIds = next.dmFrontCardIds.includes(action.id)
      ? next.dmFrontCardIds.filter(id => id !== action.id)
      : [...next.dmFrontCardIds, action.id];
    return true;
  }
  if (action.type === "flip-library-card") {
    next.libraryBackIds ||= [];
    next.libraryBackIds = next.libraryBackIds.includes(action.id)
      ? next.libraryBackIds.filter(id => id !== action.id)
      : [...next.libraryBackIds, action.id];
    return true;
  }
  if (action.type !== "preview-character") return false;
  if (next.identity?.role !== "dm") throw new Error("Only the DM can create preview characters.");
  // A preview is presentation-only. It must never claim a hero, enter
  // initiative, receive treasure, or behave like a real connected player.
  next.previewCharacterId = action.id;
  return true;
};
