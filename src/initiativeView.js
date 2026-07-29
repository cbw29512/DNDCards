import { TURN_RESOURCES } from "./schema.js";

export const initiativeView = state => {
  const active = state.initiative[state.activeTurn];
  return `
    <section class="initiative">
      <header><div><small>COMBAT CLOCK</small><h2>Initiative & rounds</h2></div>
      <button data-action="initiative">Roll initiative</button></header>
      ${state.initiative.length ? `
        <ol>${state.initiative.map((entry, index) => `
          <li class="${index === state.activeTurn ? "active" : ""}">
            <b>${entry.title}</b><span>d20 ${entry.roll} · total ${entry.total}</span>
          </li>`).join("")}</ol>
        <div class="turn">
          <strong>Round ${state.round} · ${active.title}</strong>
          <div>${TURN_RESOURCES.map(resource => `
            <button class="${state.usedResources.includes(resource) ? "used" : ""}"
              data-action="resource" data-id="${resource}">${resource}</button>`).join("")}</div>
          <button data-action="finish-turn">Finish turn →</button>
        </div>` : `<p>Every player and monster rolls from its card. Matching monsters act as a group.</p>`}
    </section>`;
};
