import { characters } from "./data.js";
import { cardView } from "./cardView.js?v=card-click-1";

export const lobbyView = state => {
  const active = state.players.find(player => player.id === state.activePlayerId);
  const claimed = new Set(state.players.map(player => player.characterId).filter(Boolean));
  return `
    <section class="lobby party-panel">
      <header><div><small>TABLE CODE</small><strong>${state.sessionCode}</strong></div>
      <span>${state.mode === "dm" ? "♟ PARTY ROSTER · DM VIEW" : "♟ YOUR PARTY"}</span></header>
      <form id="join-form">
        <label>Player name <input name="name" required maxlength="30" placeholder="Enter a name"></label>
        <button>Join table</button>
      </form>
      <div class="seats">${state.players.map(player => `
        <button data-action="select-player" data-id="${player.id}" class="${player.id === state.activePlayerId ? "active" : ""}">
          <b>${player.name}</b><span>${characters.find(card => card.id === player.characterId)?.title || "Choosing character"}</span>
        </button>`).join("")}</div>
      ${state.mode === "player" && active && !active.characterId ? `
        <div class="claim"><h2>Claim an available character</h2>
        <div class="card-row">${characters.filter(card => !claimed.has(card.id))
          .map(card => cardView(card, { action: "claim", label: "Claim character" })).join("")}</div></div>` : "" }
    </section>`;
};
