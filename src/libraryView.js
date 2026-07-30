import { filterLibrary, LIBRARY_KINDS, library } from "./libraryModel.js?v=character-art-2";
import { symbolCardView } from "./symbolCardView.js";
import { spellActionAtLevel, spellSlotOptions } from "./spellUpcast.js";

const labels = {
  all: "All cards", room: "Rooms", npc: "NPCs", monster: "Monsters",
  trap: "Traps", treasure: "Treasure", clue: "Clues", event: "Events",
  equipment: "Equipment", condition: "Conditions",
  character: "Pre-gen heroes", weapon: "Weapons & rolls", spell: "Spells",
  reference: "Reference", "wild-shape": "Wild Shapes"
};

const icons = {
  room: "⌂", npc: "♟", monster: "☠", trap: "⚠", treasure: "◆",
  equipment: "◆", condition: "◈",
  clue: "⌕", event: "✦", character: "♞", weapon: "⚔", spell: "✦",
  reference: "?", "wild-shape": "🐾"
};
const slotNames = {
  room:"Location slot", npc:"NPC slot", monster:"Monster slot", trap:"Trap slot",
  treasure:"Treasure slot", clue:"Clue slot", event:"Event slot",
  equipment:"Treasure slot", condition:"Reference card",
  character:"Character slot", weapon:"Action card", spell:"Spell card",
  "wild-shape":"Wild Shape slot"
};

const escapeAttribute = value => String(value).replace(/[&<>"']/g, char =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

const spellSlotControl = (card, selectedLevel) => {
  const options = spellSlotOptions(card, selectedLevel);
  if (!options.length) return "";
  return `<label class="spell-slot-picker"><span>CAST USING</span>
    <select data-action="select-spell-slot" data-card-id="${card.id}"
      aria-label="Spell slot for ${escapeAttribute(card.title)}">
      ${options.map(option => `<option value="${option.level}" ${option.selected ? "selected" : ""}>
        Level ${option.level}${option.level === options[0].level ? " (base)" : ""}
      </option>`).join("")}
    </select></label>`;
};

const libraryCard = (card, backIds, spellSlotByCard) => {
  if (card.id === "REF-001") return symbolCardView("symbol-card--library");
  const isBack = backIds.includes(card.id);
  const hasArt = !isBack && Boolean(card.art);
  const artStyle = hasArt
    ? `style="background-image:linear-gradient(180deg,transparent 38%,#140b17f2 82%),url('${escapeAttribute(card.art)}')"`
    : "";
  const abilityNames = ["STR","DEX","CON","INT","WIS","CHA"];
  const abilityRow = card.abilities?.length === 6
    ? `<div class="wild-abilities">${card.abilities.map((score, index) =>
      `<span><small>${abilityNames[index]}</small><b>${score}</b></span>`).join("")}</div>` : "";
  const selectedSlot = spellSlotByCard?.[card.id];
  const actionButtons = card.actions?.length
    ? `<div class="wild-actions">${card.actions.map(baseAction => {
      const action = spellActionAtLevel(card, baseAction, selectedSlot);
      return `<button data-action="roll-card-action"
        data-card-id="${card.id}" data-id="${action.id}">
        <b>${action.icon} ${action.label}</b><small>${action.roll}${action.damage ? ` · ${action.damage}` : ""}</small>
      </button>`;
    }).join("")}</div>` : "";
  return `<article class="library-card library-card--${card.kind} library-card--${isBack ? "back" : "front"} ${hasArt ? "library-card--has-art" : ""}"
    ${artStyle}
    data-action="flip-library-card" data-id="${card.id}" role="button" tabindex="0"
    aria-label="Flip ${escapeAttribute(card.title)} to its ${isBack ? "player front" : "DM back"}">
    <div class="library-card__band">
      <b>${icons[card.kind]}</b><span><small>${slotNames[card.kind] || card.kind}</small>
      <strong class="${card.title.length > 24 ? "card-title--long" : ""}">${card.title}</strong></span>
    </div>
    <div class="library-card__body"><small>${isBack ? "PRIVATE DM SIDE" : "PLAYER SIDE"} · ${card.roomNumber ? `ROOM ${card.roomNumber} · ` : ""}${card.id}</small>
      <p>${isBack ? card.dmText || "Use the player-facing description and the listed card rules." : card.playerText}</p>
      ${card.quickStats?.length ? `<ul>${card.quickStats.map(stat => `<li>${stat}</li>`).join("")}</ul>` : ""}
      ${isBack ? `${spellSlotControl(card, selectedSlot)}${abilityRow}${actionButtons}` : ""}
      <footer>↻ Click card to view ${isBack ? "player front" : "DM back"}</footer>
    </div>
  </article>`;
};

export const libraryView = (query = "", kind = "all", state = {}) => {
  const matches = filterLibrary(library.cards, query, kind);
  const visibleMatches = matches.slice(0, 120);
  const backIds = state.libraryBackIds || [];
  const countFor = target => target === "all"
    ? library.cards.length
    : target === "equipment" || target === "condition"
      ? library.cards.filter(card => card.subtype === target).length
      : library.cards.filter(card => card.kind === target).length;
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
      ${matches.length > visibleMatches.length
        ? `<p class="catalog-limit">Showing the first ${visibleMatches.length} matches. Use search or a category to narrow the library.</p>`
        : ""}
      <div class="catalog-grid">${visibleMatches.length ? visibleMatches.map(card =>
        libraryCard(card, backIds, state.spellSlotByCard || {})).join("") : `
        <div class="catalog-empty"><b>No cards found.</b><span>Try another word or category.</span></div>`}</div>
      ${kind === "wild-shape" ? `<footer class="catalog-license">Creature statistics are from the SRD 5.1,
        licensed under CC BY 4.0. Wild Shape eligibility shown here is configured for a level-6
        Legacy Circle of the Moon Druid: CR 2 or lower, swimming allowed, flying forms locked,
        and the form must be one the character has seen.</footer>` : ""}
      ${["character","weapon","spell","reference","monster","trap","treasure","equipment","condition"].includes(kind)
        ? `<footer class="catalog-license">Imported cards identify their 2014 SRD 5.1,
          2024 SRD 5.2.1, or homebrew source. SRD material is used under CC BY 4.0.
          Edition labels remain visible so rules from different editions are not mixed accidentally.</footer>`
        : ""}
    </section>
  </main>`;
};
