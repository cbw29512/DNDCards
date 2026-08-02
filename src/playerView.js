import { allCards, characters } from "./data.js?v=rules-ui-audit-1";
import { cardView, emptyView } from "./cardView.js?v=npc-lane-1";

const zone = (title, icon, cards, empty, state) => `<section class="zone"><header><span>${icon}</span><h2>${title}</h2>
  <small>${cards.length} active</small></header>
  <div class="card-row">${cards.length ? cards.map(card => cardView(card, { health: state.healthByCard[card.id] })).join("") : emptyView(empty)}</div></section>`;

export const playerView = state => {
  const player = state.players.find(player => player.id === state.activePlayerId);
  if (!player?.characterId) return `<section class="waiting"><h1>Join and claim a character to begin</h1></section>`;
  const character = characters.find(card => card.id === player.characterId);
  const visible = allCards.filter(card => state.revealedIds.includes(card.id));
  const backpack = allCards.filter(card => player.backpackIds.includes(card.id));
  return `<div class="player-layout rpg-workspace">
    <aside class="character hero-rail"><header><small>PLAYER CHARACTER</small><h2>${player.name}</h2></header>
      ${cardView(character, { health: state.healthByCard[character.id] })}
      <div class="hero-shortcuts"><button data-action="open-pregen-pack" data-id="${character.id}">◈ Full hero pack</button><button data-action="open-pregen-pack" data-id="${character.id}">✦ Spells</button><button>◆ Backpack</button></div>
    </aside>
    <main class="combat player-stage">
      <header class="scene-heading"><div><small>PLAYER COMBAT VIEW</small>
      <h1>${visible.find(card => card.kind === "room")?.title || "Waiting for the DM"}</h1>
      <p>Revealed cards, active threats, and your possessions appear here.</p></div>
      <span class="player-vision">◉ HERO VISION</span></header>
      <div class="player-zones">
      ${zone("Current room", "⌂", visible.filter(card => card.kind === "room"), "The room has not been revealed.", state)}
      ${zone("Enemies", "☠", visible.filter(card => card.kind === "monster"), "No enemies revealed.", state)}
      ${zone("Hazards", "⚠", visible.filter(card => card.kind === "trap"), "No hazards revealed.", state)}
      ${zone("Discoveries", "✦", visible.filter(card => ["npc","clue","treasure","event"].includes(card.kind)), "No discoveries yet.", state)}
      ${zone("Backpack", "◆", backpack, "DM-approved treasure appears here.", state)}</div>
    </main>
  </div>`;
};
