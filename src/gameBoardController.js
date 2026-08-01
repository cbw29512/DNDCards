import { characters } from "./data.js?v=all-core-classes-1";
import { findCard } from "./state.js?v=all-core-classes-1";
import { rollFormula } from "./diceEngine.js";
import { executeEquippedAttack } from "./characterEngine.js?v=all-core-classes-1";

export const handleGameBoardButton = (state, button) => {
  try {
    const { action, id } = button.dataset;
    if (action === "free-roll") {
      const roll = rollFormula(`1d${id}`);
      state.lastFreeRoll = { sides:Number(id), total:roll.total, dice:roll.dice };
      return true;
    }
    if (action !== "equipped-attack") return false;
    const player = state.players.find(candidate => candidate.id === state.activePlayerId);
    const character = characters.find(candidate => candidate.id === player?.characterId);
    const item = findCard(button.dataset.cardId);
    if (!character || !item) throw new Error("The equipped attack could not find its character or item.");
    const result = executeEquippedAttack(character, item, id);
    state.lastRoll = result;
    state.rollHistory = [result, ...state.rollHistory].slice(0, 10);
    return true;
  } catch (error) {
    console.error("[Dungeon Cards] Game Board control failed.", error);
    throw error;
  }
};
