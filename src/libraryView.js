import { filterLibrary, LIBRARY_KINDS, library } from "./libraryModel.js";
import { symbolCardView } from "./symbolCardView.js";

const labels = {
  all: "All cards", room: "Rooms", npc: "NPCs", monster: "Monsters",
  trap: "Traps", treasure: "Treasure", clue: "Clues", event: "Events",
  character: "Pre-gen heroes", reference: "Reference", "wild-shape": "Wild Shapes"
};

const icons = {
  room: "⌂", npc: "♟", monster: "☠", trap: "⚠", treasure: "◆",
  clue: "⌕", event: "✦", character: "♞", reference: "?", "wild-shape": "🐾"
};

const escapeAttribute = value => String(value).replace(/[&<>"']/g, char =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

const libraryCard = card => {
  if (card.kind === "reference") return symbolCardView("symbol-card--library");
  const abilityNames = ["STR","DEX","CON","INT","WIS","CHA"];
  const abilityRow = card.abilities?.length === 6
    ? `<div class="wild-abilities">${card.abilities.map((score, index) =>
      `<span><small>${abilityNames[index]}</small><b>${score}</b></span>`).join("")}</div>` : "";
  const actionButtons = card.actions?.length
    ? `<div class="wild-actions">${card.actions.map(action => `<button data-action="roll-card-action"
        data-card-id="${card.id}" data-id="${action.id}">
        <b>${action.icon} ${action.label}</b><small>${action.roll}${action.damage ? ` · ${action.damage}` : ""}</small>
      </button>`).join("")}</div>` : "";
  return `<article class="library-card library-card--${card.kind}">
    <div class="library-card__art">
      <span>${card.roomNumber ? `ROOM ${card.roomNumber}` : card.kind.toUpperCase()}</span>
      <b>${icons[card.kind]}</b><small>${card.badge || card.kind}</small>
    </div>
    <div class="library-card__body"><small>${card.id} · ${card.source}</small><h3>${card.title}</h3>
      <p>${card.playerText}</p>
      ${card.quickStats.length ? `<ul>${card.quickStats.map(stat => `<li>${stat}</li>`).join("")}</ul>` : ""}
      ${abilityRow}${actionButtons}
      ${card.dmText ? `<details><summary>View private DM side</summary><p>${card.dmText}</p></details>` : ""}
    </div>
  </article>`;
};

export const libraryView = (query = "", kind = "all") => {
  const matches = filterLibrary(library.cards, query, kind);
  const countFor = target => target === "all"
    ? library.cards.length : library.cards.filter(card => card.kind === target).length;
  return `<main class="catalog-page">
    <header class="catalog-topbar"><a class="brand" href="#"><span>DC</span><div><b>DUNGEON CARDS</b><small>OFFICIAL CARD LIBRARY</small></div></a>
      <button data-action="close-card-library">← Back to home</button></header>
    <section class="catalog-hero"><small>SEARCH THE COLLECTION</small><h1>Every card. One growing library.</h1>
      <p>Browse verified cards by the exact role they play on the table—including a complete level-6 Moon Druid Wild Shape deck.</p>
      <label><span>⌕</span><input id="card-search" type="search" value="${escapeAttribute(query)}" placeholder="Search title, card ID, room, CR, effect, or keyword…"></label>
    </section>
    <nav class="catalog-filters" aria-label="Card categories">${LIBRARY_KINDS.map(item => `
      <button data-action="filter-cards" data-id="${item}" class="${item === kind ? "active" : ""}">
        <span>${item === "all" ? "▦" : icons[item]}</span><b>${labels[item]}</b><small>${countFor(item)}</small>
      </button>`).join("")}</nav>
    <section class="catalog-results">
      <header><div><small>${labels[kind].toUpperCase()}</small><h2>${matches.length} card${matches.length === 1 ? "" : "s"}</h2></div>
        <p>${library.rejected.length === 0 ? "✓ Catalog validation passed · No duplicates" : `${library.rejected.length} rejected records`}</p></header>
      <div class="catalog-grid">${matches.length ? matches.map(libraryCard).join("") : `
        <div class="catalog-empty"><b>No cards found.</b><span>Try another word or category.</span></div>`}</div>
      ${kind === "wild-shape" ? `<footer class="catalog-license">Creature statistics are from the SRD 5.1,
        licensed under CC BY 4.0. Wild Shape eligibility shown here is configured for a level-6
        Legacy Circle of the Moon Druid: CR 2 or lower, swimming allowed, flying forms locked,
        and the form must be one the character has seen.</footer>` : ""}
    </section>
  </main>`;
};
