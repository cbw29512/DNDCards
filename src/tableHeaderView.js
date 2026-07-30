import { findAdventure } from "./adventures.js";

export const tableHeaderView = state => {
  const isDm = state.identity?.role === "dm";
  const adventure = findAdventure(state.adventureId);
  return `<header class="game-command">
    <a class="game-brand" href="#" aria-label="Dungeon Cards home">
      <span>DC</span><div><b>DUNGEON CARDS</b><small>${adventure?.title || "SHOWCASE · CREATE · PLAY"}</small></div>
    </a>
    <div class="game-status">
      <span class="status-rune">✦</span>
      <div><small>${isDm ? "DUNGEON MASTER" : "ADVENTURER"}</small>
      <strong>${state.identity?.name || (isDm ? "Game Master" : "Player")}</strong></div>
    </div>
    <nav aria-label="Game controls">
      ${isDm ? `<button data-action="table-tab" data-id="adventure" class="${state.tableTab === "adventure" ? "active" : ""}">⚒ Adventure</button>` : ""}
      <button data-action="table-tab" data-id="board" class="${state.tableTab === "board" ? "active" : ""}">⚔ Game Board</button>
      <button data-action="symbols">? Rules key</button>
      ${isDm ? `<button data-action="print" data-id="home">▤ Print</button>` : ""}
      <button data-action="logout">↩ Exit</button>
    </nav>
  </header>`;
};
