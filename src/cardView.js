const escape = value => String(value || "").replace(/[&<>"']/g, char =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[char]);

const ICONS = {
  room:"⌂", npc:"♟", monster:"☠", trap:"⚠", treasure:"◆",
  clue:"⌕", event:"✦", character:"♞", "wild-shape":"🐾"
};

const art = card => card.art
  ? `style="background-image:linear-gradient(180deg,transparent 42%,#130b16ee),url('${escape(card.art)}')"`
  : "";

const statList = card => card.stats || card.quickStats || [];

const actionButtons = (card, interactive) => !interactive ? "" : `
  <div class="card-actions">${(card.actions || []).slice(0, 3).map(action => `
    <button data-action="roll-card-action" data-card-id="${escape(card.id)}" data-id="${escape(action.id)}">
      <b>${escape(action.icon || "◈")} ${escape(action.label)}</b>
      <span>${escape(action.roll || (action.save ? `DC ${action.save.dc}` : ""))}${action.damage ? ` · ${escape(action.damage)}` : ""}</span>
    </button>`).join("")}</div>`;

const front = (card, options) => `<div class="card-face card-face--front card-kind--${escape(card.kind)}" ${art(card)}>
  <header><span>${escape(card.kind)}${card.room ? ` · ${escape(card.room)}` : ""}</span><b>${ICONS[card.kind] || "◆"}</b></header>
  <div class="card-front-title"><h3>${escape(card.title)}</h3><p>${escape(card.playerText)}</p></div>
  ${["character","treasure","wild-shape"].includes(card.kind) && statList(card).length
    ? `<ul class="card-front-stats">${statList(card).slice(0, 3).map(stat => `<li>${escape(stat)}</li>`).join("")}</ul>` : ""}
  ${actionButtons(card, options.interactive)}
</div>`;

const back = (card, options) => `<div class="card-face card-face--back">
  <header><small>${escape(card.kind)}${card.room ? ` · ${escape(card.room)}` : ""}</small>
    <h3>${escape(card.title)}</h3><span>DM BACK</span></header>
  ${statList(card).length ? `<ul class="card-back-stats">${statList(card).slice(0, 6).map(stat => `<li>${escape(stat)}</li>`).join("")}</ul>` : ""}
  ${options.health ? `<div class="card-health"><strong>♥ ${options.health.current} / ${options.health.maximum}</strong>
    <div><button data-action="adjust-health" data-id="${card.id}" data-amount="-5">−5</button>
    <button data-action="adjust-health" data-id="${card.id}" data-amount="-1">−1</button>
    <button data-action="adjust-health" data-id="${card.id}" data-amount="1">+1</button>
    <button data-action="adjust-health" data-id="${card.id}" data-amount="5">+5</button></div></div>` : ""}
  ${actionButtons(card, true)}
  <section class="card-dm-notes"><b>PRIVATE DM INFORMATION</b><p>${escape(card.dmText || "Use the player-facing description and card rules.")}</p></section>
</div>`;

export const cardView = (card, options = {}) => {
  const face = options.face === "back" ? "back" : "front";
  return `<article class="card card--${face} ${options.compact ? "card--compact" : ""}">
    ${face === "back" ? back(card, options) : front(card, options)}
  </article>
  ${options.action ? `<button class="card-primary-action" data-action="${options.action}" data-id="${card.id}">${escape(options.label)}</button>` : ""}`;
};

export const emptyView = text => `<div class="empty">${escape(text)}</div>`;
