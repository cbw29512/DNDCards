import { allCards, rooms } from "./data.js";
import { SLOT_KINDS } from "./schema.js";
import { cardView, emptyView } from "./cardView.js";

export const dmView = state => {
  const room = rooms.find(room => room.id === state.roomId);
  const placed = (state.placedByRoom[state.roomId] || []).map(id => allCards.find(card => card.id === id)).filter(Boolean);
  return `<div class="dm-layout">
    <aside class="rooms"><h2>Build the dungeon</h2>${rooms.map(candidate => `
      <button data-action="room" data-id="${candidate.id}" class="${candidate.id === state.roomId ? "active" : ""}">
        <small>ROOM ${candidate.number}</small><b>${candidate.title}</b></button>`).join("")}</aside>
    <main class="board">
      <header><div><small>ROOM ${room.number}</small><h1>${room.title}</h1></div>
      <span>Private notes stay here. Reveal sends only the player face.</span></header>
      ${SLOT_KINDS.map(kind => {
        const slotCards = placed.filter(card => card.kind === kind);
        return `<section class="slot"><header><div><small>${kind} SLOT</small><h2>${kind}</h2></div>
          <button data-action="open-library" data-id="${kind}">+</button></header>
          <div class="card-row">${slotCards.length ? slotCards.map(card => `
            <div>${cardView(card, { dm: true, action: "reveal", label: state.revealedIds.includes(card.id) ? "Hide from players" : "Reveal player face" })}
            <button class="remove" data-action="remove" data-id="${card.id}">Remove</button></div>`).join("") : emptyView(`Add a ${kind} card`)}</div>
        </section>`;
      }).join("")}
      ${state.roomId === "inn" ? eventView(state) : ""}
    </main>
    <dialog id="library"><header><h2>Card library</h2><button data-action="close-library">Close</button></header>
      <div id="library-cards" class="card-row"></div></dialog>
  </div>`;
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
