import { allCards, rooms } from "./data.js";
import { SLOT_KINDS } from "./schema.js";
import { cardView, emptyView } from "./cardView.js";
import { adventures, findAdventure } from "./adventures.js";

export const dmView = state => {
  if (!state.adventureId) return adventurePicker();
  const adventure = findAdventure(state.adventureId);
  if (state.adventureComplete) return finaleView(adventure);
  const room = rooms.find(room => room.id === state.roomId);
  const roomIndex = adventure.roomIds.indexOf(room.id);
  const placed = (state.placedByRoom[state.roomId] || []).map(id => allCards.find(card => card.id === id)).filter(Boolean);
  return `<div class="dm-layout rpg-workspace">
    <aside class="rooms campaign-rail"><header><small>QUEST PATH</small><h2>Adventure</h2>
      <span>${placed.length} cards in this scene</span></header>${rooms.map(candidate => `
      <button data-action="room" data-id="${candidate.id}" class="${candidate.id === state.roomId ? "active" : ""}">
        <span>${candidate.number}</span><div><small>${candidate.id === state.roomId ? "CURRENT SCENE" : `ROOM ${candidate.number}`}</small>
        <b>${candidate.title}</b></div></button>`).join("")}
      <footer><small>TABLE CODE</small><strong>${state.sessionCode}</strong>
      <span>Share this code with players.</span></footer></aside>
    <main class="board encounter-stage">
      <nav class="adventure-runner" aria-label="Adventure room controls">
        <button data-action="previous-room" ${roomIndex === 0 ? "disabled" : ""}>← Previous</button>
        <div><small>ADVENTURE PROGRESS</small><strong>Room ${roomIndex + 1} of ${adventure.roomIds.length}</strong>
          <span>${adventure.roomIds.map((id, index) => `<i class="${id === room.id ? "current" : state.completedRoomIds.includes(id) ? "complete" : ""}">${index + 1}</i>`).join("")}</span>
        </div>
        <button data-action="complete-room" class="${state.completedRoomIds.includes(room.id) ? "complete" : ""}">
          ${state.completedRoomIds.includes(room.id) ? "✓ Complete" : "Mark complete"}</button>
        <button data-action="next-room">${roomIndex === adventure.roomIds.length - 1 ? "Finish adventure →" : "Next room →"}</button>
      </nav>
      <header class="scene-heading"><div><small>ROOM ${room.number} · ACTIVE SCENE</small><h1>${room.title}</h1>
        <p>Build the encounter, then reveal only what the heroes can see.</p></div>
      <span class="dm-vision">◉ DM VISION</span></header>
      <nav class="card-dock" aria-label="Quick card drawers">${SLOT_KINDS.map(kind => `
        <button data-action="open-library" data-id="${kind}"><span>${kindIcon[kind]}</span>
        <b>${kind}</b><small>${placed.filter(card => card.kind === kind).length} placed</small></button>`).join("")}</nav>
      <div class="encounter-grid">
      ${SLOT_KINDS.map(kind => {
        const slotCards = placed.filter(card => card.kind === kind);
        return `<section class="slot slot--${kind}"><header><div><small>${kindIcon[kind]} ${kind} SLOT</small><h2>${slotTitle[kind]}</h2></div>
          <button data-action="open-library" data-id="${kind}" aria-label="Add ${kind} card">+</button></header>
          <div class="card-row">${slotCards.length ? slotCards.map(card => `
            <div>${cardView(card, { dm: true, health: state.healthByCard[card.id], action: "reveal", label: state.revealedIds.includes(card.id) ? "Hide from players" : "Reveal player face" })}
            <button class="remove" data-action="remove" data-id="${card.id}">Remove</button></div>`).join("") : emptyView(`Add a ${kind} card`)}</div>
        </section>`;
      }).join("")}</div>
      ${state.roomId === "inn" ? eventView(state) : ""}
    </main>
    <dialog id="library" class="card-vault"><header><div><small>DM CARD VAULT</small><h2>Choose a card</h2></div>
      <button data-action="close-library">Close</button></header>
      <div id="library-cards" class="card-row"></div></dialog>
  </div>`;
};

const adventurePicker = () => `<main class="adventure-select">
  <header><small>DM ADVENTURE LIBRARY</small><h1>Choose tonight's adventure</h1>
    <p>Loading a pack prepares every room and its associated cards in play order.</p></header>
  <div>${adventures.map(adventure => `<article>
    <span>${adventure.badge}</span><small>${adventure.estimatedTime}</small>
    <h2>${adventure.title}</h2><p>${adventure.description}</p>
    <ul><li>${adventure.roomIds.length} guided rooms</li><li>Pre-generated heroes</li>
    <li>Rooms, NPCs, monsters, traps, clues and treasure</li></ul>
    <button data-action="load-adventure" data-id="${adventure.id}">Load adventure pack →</button>
  </article>`).join("")}</div>
  <aside><b>＋ Build from your collection</b><span>Homebrew adventure building is the next pack option.</span></aside>
</main>`;

const finaleView = adventure => `<main class="adventure-finale">
  <span>✦</span><small>ADVENTURE COMPLETE</small><h1>${adventure.title}</h1>
  <p>${adventure.finale}</p><div><button data-action="resume-adventure">Return to final room</button>
  <button data-action="logout">Leave the table</button></div>
</main>`;

const kindIcon = { room:"⌂", npc:"♟", monster:"☠", trap:"⚠", treasure:"◆", clue:"⌕" };
const slotTitle = {
  room:"Scene", npc:"Characters", monster:"Enemies",
  trap:"Hazards", treasure:"Rewards", clue:"Discoveries"
};

const eventView = state => {
  const event = allCards.find(card => card.id === state.activeEventId);
  return `<section class="event"><header><div><small>D10 LOCATION EVENT</small><h2>Heartbreak Inn</h2></div>
    <button data-action="event">Roll event</button></header>
    ${event ? cardView(event, { dm: true, action: "reveal", label: state.revealedIds.includes(event.id) ? "Hide from players" : "Reveal event" }) : ""}</section>`;
};

export const libraryCards = (state, kind) => allCards
  .filter(card => card.kind === kind)
  .map(card => cardView(card, { action: "place", label: "Add to room" })).join("");
