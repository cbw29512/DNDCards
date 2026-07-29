const escape = value => String(value || "").replace(/[&<>"']/g, char =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

export const cardView = (card, options = {}) => `
  <article class="card ${options.compact ? "card--compact" : ""}">
    <div class="card__art">
      <span>${escape(card.kind)}${card.room ? ` · ${escape(card.room)}` : ""}</span>
      <b>${escape(card.title)}</b>
    </div>
    <div class="card__body">
      <h3>${escape(card.title)}</h3>
      <p>${escape(card.playerText)}</p>
      ${card.stats?.length ? `<ul>${card.stats.map(stat => `<li>${escape(stat)}</li>`).join("")}</ul>` : ""}
      ${options.health ? `<div class="card-health"><strong>♥ ${options.health.current} / ${options.health.maximum}</strong>
        <div><button data-action="adjust-health" data-id="${card.id}" data-amount="-5">−5</button>
        <button data-action="adjust-health" data-id="${card.id}" data-amount="-1">−1</button>
        <button data-action="adjust-health" data-id="${card.id}" data-amount="1">+1</button>
        <button data-action="adjust-health" data-id="${card.id}" data-amount="5">+5</button></div></div>` : ""}
      ${card.actions?.length ? `<div class="card-actions">${card.actions.map(action => `
        <button data-action="roll-card-action" data-card-id="${card.id}" data-id="${action.id}">
          <b>${escape(action.icon || "◈")} ${escape(action.label)}</b>
          <span>${escape(action.roll || action.save ? action.roll || `DC ${action.save.dc} ${action.save.ability}` : "")}${action.damage ? ` · ${escape(action.damage)}` : ""}</span>
        </button>`).join("")}</div>` : ""}
      ${options.dm && card.dmText ? `<aside><strong>PRIVATE DM CARD</strong>${escape(card.dmText)}</aside>` : ""}
      ${options.action ? `<button data-action="${options.action}" data-id="${card.id}">${escape(options.label)}</button>` : ""}
    </div>
  </article>`;

export const emptyView = text => `<div class="empty">${escape(text)}</div>`;
