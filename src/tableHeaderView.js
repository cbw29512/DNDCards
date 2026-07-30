export const tableHeaderView = state => {
  const isDm = state.identity?.role === "dm";
  return `<header class="game-command">
    <a class="game-brand" href="#" aria-label="Dungeon Cards home">
      <span>DC</span><div><b>DUNGEON CARDS</b><small>THE HEARTHGLOW WISH</small></div>
    </a>
    <div class="game-status">
      <span class="status-rune">✦</span>
      <div><small>${isDm ? "DUNGEON MASTER" : "ADVENTURER"}</small>
      <strong>${state.identity?.name || (isDm ? "Game Master" : "Player")}</strong></div>
    </div>
    <nav aria-label="Game controls">
      ${isDm ? `<button data-action="mode" data-id="dm" class="${state.mode === "dm" ? "active" : ""}">⚒ Build</button>
        <button data-action="mode" data-id="player" class="${state.mode === "player" ? "active" : ""}">◉ Player preview</button>` : ""}
      <button data-action="symbols">? Rules key</button>
      ${isDm ? `<button data-action="print" data-id="home">▤ Print</button>` : ""}
      <button data-action="logout">↩ Exit</button>
    </nav>
  </header>`;
};
