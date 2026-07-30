import { characters } from "./data.js?v=character-art-2";
import { cardView } from "./cardView.js?v=npc-lane-1";

const escapeAttribute = value => String(value || "").replace(/[&<>"']/g, char =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[char]);

export const lobbyView = state => {
  const active = state.players.find(player => player.id === state.activePlayerId);
  const claimed = new Set(state.players.map(player => player.characterId).filter(Boolean));
  const terms = String(state.characterQuery || "").toLowerCase().trim()
    .split(/\s+/).filter(Boolean);
  const available = characters.filter(card => !claimed.has(card.id)).filter(card => {
    const text = [
      card.title, card.badge, card.classId, card.level, card.edition,
      card.playerText
    ].join(" ").toLowerCase();
    return terms.every(term => text.includes(term));
  });
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
        <label class="character-search">⌕ <input id="character-search" type="search"
          value="${escapeAttribute(state.characterQuery)}" placeholder="Search class, level, edition, or hero…"></label>
        <p>${available.length} available character cards${available.length > 40 ? " · showing first 40" : ""}</p>
        <div class="card-row">${available.slice(0, 40)
          .map(card => cardView(card, { action: "claim", label: "Claim character" })).join("")}</div></div>` : "" }
    </section>`;
};
