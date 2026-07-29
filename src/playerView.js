import { allCards, characters } from "./data.js";
import { cardView, emptyView } from "./cardView.js";

const zone = (title, cards, empty) => `<section class="zone"><h2>${title}</h2>
  <div class="card-row">${cards.length ? cards.map(card => cardView(card)).join("") : emptyView(empty)}</div></section>`;

export const playerView = state => {
  const player = state.players.find(player => player.id === state.activePlayerId);
  if (!player?.characterId) return `<section class="waiting"><h1>Join and claim a character to begin</h1></section>`;
  const character = characters.find(card => card.id === player.characterId);
  const visible = allCards.filter(card => state.revealedIds.includes(card.id));
  const backpack = allCards.filter(card => player.backpackIds.includes(card.id));
  return `<div class="player-layout">
    <aside class="character"><small>MY CHARACTER</small>${cardView(character)}</aside>
    <main class="combat">
      <header><small>PLAYER COMBAT SCREEN</small><h1>${visible.find(card => card.kind === "room")?.title || "Waiting for the DM"}</h1>
      <p>Only player-facing cards revealed by the DM appear here.</p></header>
      ${zone("Current room", visible.filter(card => card.kind === "room"), "The room has not been revealed.")}
      ${zone("Enemies", visible.filter(card => card.kind === "monster"), "No enemies revealed.")}
      ${zone("Hazards", visible.filter(card => card.kind === "trap"), "No hazards revealed.")}
      ${zone("Discoveries", visible.filter(card => ["npc","clue","treasure","event"].includes(card.kind)), "No discoveries yet.")}
      ${zone("Backpack", backpack, "DM-approved treasure appears here.")}
    </main>
  </div>`;
};
