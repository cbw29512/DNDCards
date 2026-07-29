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
      ${options.dm && card.dmText ? `<aside><strong>PRIVATE DM CARD</strong>${escape(card.dmText)}</aside>` : ""}
      ${options.action ? `<button data-action="${options.action}" data-id="${card.id}">${escape(options.label)}</button>` : ""}
    </div>
  </article>`;

export const emptyView = text => `<div class="empty">${escape(text)}</div>`;
