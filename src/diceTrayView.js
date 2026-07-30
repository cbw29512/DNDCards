const DICE = [4, 6, 8, 10, 12, 20, 100];

export const diceTrayView = state => `<section class="free-dice" aria-label="Free dice rolls">
  <div><small>FREE ROLLS</small><strong>Dice tray</strong></div>
  <div class="free-dice__buttons">${DICE.map(sides => `
    <button data-action="free-roll" data-id="${sides}" aria-label="Roll a d${sides}">
      <span>d${sides}</span><b>${sides === 20 ? "◆" : "●"}</b>
    </button>`).join("")}</div>
  <output aria-live="polite">
    ${state.lastFreeRoll ? `<small>LAST ROLL · D${state.lastFreeRoll.sides}</small><b>${state.lastFreeRoll.total}</b>` : `<small>CLICK ANY DIE</small><b>—</b>`}
  </output>
</section>`;
