import { TURN_RESOURCES } from "./schema.js";
import { escapeHtml } from "./html.js";

export const initiativeView = state => {
  const active = state.initiative[state.activeTurn];
  const heldActions = Object.values(state.readyByEntryId || {});
  return `
    <section class="initiative">
      <header><div><small>COMBAT CLOCK</small><h2>Initiative & rounds</h2></div>
      <div><button data-action="initiative">Roll initiative</button>
      ${state.mode === "dm" ? `<button data-action="rest" data-id="short">Issue short rest</button><button data-action="rest" data-id="long">Issue long rest</button>` : ""}</div></header>
      ${state.initiative.length ? `
        <ol>${state.initiative.map((entry, index) => `
          <li class="${index === state.activeTurn ? "active" : ""}">
            <b>${escapeHtml(entry.title)}</b><span>d20 ${entry.roll} · total ${entry.total}</span>
            ${state.readyByEntryId?.[entry.entryId] ? `<em>⏳ Holding action</em>` : ""}
            ${(state.reactionSpentCardIds || []).includes(entry.id) ? `<em>⚡ Reaction spent</em>` : ""}
          </li>`).join("")}</ol>
        <div class="turn">
          <strong>${state.round === 0 ? "Natural 20 opening turn" : `Round ${state.round}`} · ${escapeHtml(active.title)}${active.groupSize > 1 ? ` ×${active.groupSize}` : ""}</strong>
          <div>${TURN_RESOURCES.map(resource => `
            <button class="${state.usedResources.includes(resource) ? "used" : ""}"
              data-action="resource" data-id="${resource}">${resource}</button>`).join("")}</div>
          <button data-action="open-ready-action"
            ${state.usedResources.includes("Action") ? "disabled" : ""}>⏳ Hold / Ready action</button>
          <button data-action="finish-turn">Finish turn →</button>
        </div>
        ${heldActions.length ? `<aside class="ready-actions"><header><b>HELD ACTIONS</b><small>Trigger before that creature’s next turn</small></header>
          ${heldActions.map(held => `<article><div><strong>${escapeHtml(held.title)}</strong>
            <span><b>When:</b> ${escapeHtml(held.trigger)}</span><span><b>Then:</b> ${escapeHtml(held.response)}</span></div>
            <button data-action="trigger-ready-action" data-id="${held.entryId}">⚡ Trigger reaction</button></article>`).join("")}
        </aside>` : ""}
        <dialog id="ready-action-dialog" class="ready-action-dialog">
          <form id="ready-action-form">
            <header><div><small>READY ACTION</small><h3>${escapeHtml(active.title)}</h3></div>
              <button type="button" data-action="close-ready-action" aria-label="Close">×</button></header>
            <p>Spend your Action now. If the stated trigger happens before your next turn, spend your Reaction to perform the response. Readying a spell casts it now, expends its slot, and requires Concentration while held.</p>
            <label>Perceivable trigger<input name="trigger" required maxlength="140"
              placeholder="Example: When the ogre enters the doorway"></label>
            <label>Readied response<input name="response" required maxlength="140"
              placeholder="Example: I attack it with my longbow"></label>
            <button type="submit">Hold this action</button>
          </form>
        </dialog>` : `<p>Every player and monster rolls from its card. Matching monsters act as a group.</p>`}
    </section>`;
};
