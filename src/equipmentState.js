export const updateEquipmentState = (next, action, allCards) => {
  if (action.type === "send-item") {
    const player = next.players.find(candidate => candidate.id === next.activePlayerId);
    const item = allCards.find(card => card.id === action.id);
    if (!player) throw new Error("Choose an active player before sending an item.");
    if (!item || item.kind !== "treasure") throw new Error("Only treasure cards can be sent.");
    const pending = next.pendingItemsByPlayer[player.id] ||= [];
    if (!pending.includes(item.id) && !player.backpackIds.includes(item.id)) pending.push(item.id);
    return true;
  }
  if (action.type === "accept-item") {
    const player = next.players.find(candidate => candidate.id === next.activePlayerId);
    if (!player) throw new Error("No active player was found.");
    const pending = next.pendingItemsByPlayer[player.id] ||= [];
    if (!pending.includes(action.id)) throw new Error("The DM has not sent that item.");
    if (!player.backpackIds.includes(action.id)) player.backpackIds.push(action.id);
    next.pendingItemsByPlayer[player.id] = pending.filter(id => id !== action.id);
    return true;
  }
  if (action.type === "equip-item") {
    const player = next.players.find(candidate => candidate.id === next.activePlayerId);
    const item = allCards.find(card => card.id === action.id);
    if (!player || !item) throw new Error("The character or item could not be found.");
    if (!player.backpackIds.includes(item.id)) throw new Error("That item is not in your backpack.");
    if (!item.equipSlots?.includes(action.slot)) throw new Error("That item cannot use this equipment slot.");
    const equipment = next.equipmentByPlayer[player.id] ||= {};
    const replaced = equipment[action.slot];
    if (replaced && !player.backpackIds.includes(replaced)) player.backpackIds.push(replaced);
    equipment[action.slot] = item.id;
    player.backpackIds = player.backpackIds.filter(id => id !== item.id);
    return true;
  }
  if (action.type !== "unequip-item") return false;
  const player = next.players.find(candidate => candidate.id === next.activePlayerId);
  if (!player) throw new Error("No active player was found.");
  const equipment = next.equipmentByPlayer[player.id] ||= {};
  const itemId = equipment[action.id];
  if (!itemId) throw new Error("That equipment slot is empty.");
  if (!player.backpackIds.includes(itemId)) player.backpackIds.push(itemId);
  delete equipment[action.id];
  return true;
};
