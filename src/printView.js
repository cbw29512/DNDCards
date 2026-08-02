import { allCards, rooms } from "./data.js?v=rules-ui-audit-1";
import { cardView } from "./cardView.js?v=npc-lane-1";
import { symbolCardView } from "./symbolCardView.js";

export const printView = state => `
  <section class="print-pack">
    <header><small>COMPLETE PLAYABLE PACK</small><h1>The First Chime of Hearthglow</h1></header>
    <div class="print-grid">${symbolCardView("symbol-card--print")}${rooms.flatMap(room =>
      (state.placedByRoom[room.id] || []).map(id => {
        const card = allCards.find(card => card.id === id);
        return card ? `<div class="print-pair">${cardView(card)}
          <article class="card card-back"><small>ROOM ${room.number} · DM BACK</small>
          <h2>${card.title}</h2><p>${card.dmText || "No private notes."}</p>
          ${(card.stats || card.quickStats || []).map(stat => `<b>${stat}</b>`).join("")}</article></div>` : "";
      })).join("")}</div>
    <section class="checklist"><small>DM RUN SHEET</small><h1>Dungeon checklist</h1>
      ${rooms.map(room => `<section><h2>Room ${room.number}: ${room.title}</h2><ul>
        ${(state.placedByRoom[room.id] || []).map((id, index) => {
          const card = allCards.find(card => card.id === id);
          return card ? `<li>□ <b>${card.title}${card.copies > 1 ? ` ×${card.copies}` : ""}</b><span>${card.kind} · card ${index + 1}</span></li>` : "";
        }).join("")}</ul></section>`).join("")}
    </section>
  </section>`;
