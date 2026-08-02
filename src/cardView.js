import { spellActionAtLevel, spellSlotOptions } from "./spellUpcast.js";

const escape = value => String(value || "").replace(/[&<>"']/g, char =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[char]);

const ICONS = {
  room:"⌂", npc:"♟", monster:"☠", trap:"⚠", treasure:"◆",
  clue:"⌕", event:"✦", character:"♞", "wild-shape":"🐾"
};
const SLOT_NAMES = {
  room:"Location slot", npc:"NPC slot", monster:"Monster slot", trap:"Trap slot",
  treasure:"Treasure slot", clue:"Clue slot", event:"Event slot",
  character:"Character slot", "wild-shape":"Wild Shape slot"
};

const art = card => card.art
  ? `style="background-image:linear-gradient(180deg,transparent 42%,#130b16ee),url('${escape(card.art)}')"`
  : "";

const statList = card => card.stats || card.quickStats || [];

const actionButtons = (card, interactive, selectedLevel) => !interactive ? "" : `
  <div class="card-actions">${(card.actions || []).slice(0, 3).map(baseAction => {
    const action = spellActionAtLevel(card, baseAction, selectedLevel);
    const componentDamage = (action.damageComponents || []).map(component => component.formula).join(" + ");
    return `
    <button data-action="roll-card-action" data-card-id="${escape(card.id)}" data-id="${escape(action.id)}">
      <b>${escape(action.icon || "◈")} ${escape(action.label)}</b>
      <span>${escape(action.roll || (action.save ? `DC ${action.save.dc}` : ""))}${action.damage || componentDamage ? ` · ${escape(action.damage || componentDamage)}` : ""}</span>
    </button>`;
  }).join("")}</div>`;

const spellSlotControl = (card, selectedLevel) => {
  const options = spellSlotOptions(card, selectedLevel);
  if (!options.length) return "";
  return `<label class="spell-slot-picker"><span>CAST USING</span>
    <select data-action="select-spell-slot" data-card-id="${escape(card.id)}">
      ${options.map(option => `<option value="${option.level}" ${option.selected ? "selected" : ""}>
        Level ${option.level}${option.level === options[0].level ? " (base)" : ""}
      </option>`).join("")}
    </select></label>`;
};

const cardBand = (card, dm = false) => `<header class="card-slot-band card-slot-band--${escape(card.kind)}">
  <i>${ICONS[card.kind] || "◆"}</i><span><small>${SLOT_NAMES[card.kind] || "Card slot"}${dm ? " · DM BACK" : ""}</small>
  <b>${escape(card.title)}</b></span></header>`;

const front = (card, options) => `<div class="card-face card-face--front card-kind--${escape(card.kind)}" ${art(card)}>
  ${cardBand(card)}
  <div class="card-player-copy"><small>PLAYER INFORMATION</small><p>${escape(card.playerText)}</p></div>
  ${["character","treasure","wild-shape"].includes(card.kind) && statList(card).length
    ? `<ul class="card-front-stats">${statList(card).slice(0, 3).map(stat => `<li>${escape(stat)}</li>`).join("")}</ul>` : ""}
  ${spellSlotControl(card, options.spellSlot)}${actionButtons(card, options.interactive, options.spellSlot)}
</div>`;

const back = (card, options) => `<div class="card-face card-face--back">
  ${cardBand(card, true)}
  ${statList(card).length ? `<ul class="card-back-stats">${statList(card).slice(0, 6).map(stat => `<li>${escape(stat)}</li>`).join("")}</ul>` : ""}
  ${options.health ? `<div class="card-health"><strong>♥ ${options.health.current} / ${options.health.maximum}</strong>
    <div><button data-action="adjust-health" data-id="${card.id}" data-amount="-5">−5</button>
    <button data-action="adjust-health" data-id="${card.id}" data-amount="-1">−1</button>
    <button data-action="adjust-health" data-id="${card.id}" data-amount="1">+1</button>
    <button data-action="adjust-health" data-id="${card.id}" data-amount="5">+5</button></div></div>` : ""}
  ${spellSlotControl(card, options.spellSlot)}${actionButtons(card, true, options.spellSlot)}
  <section class="card-dm-notes"><b>PRIVATE DM INFORMATION</b><p>${escape(card.dmText || "Use the player-facing description and card rules.")}</p></section>
</div>`;

export const cardView = (card, options = {}) => {
  const face = options.face === "back" ? "back" : "front";
  const flip = options.flip ? `data-action="flip-card" data-id="${escape(card.id)}" role="button" tabindex="0"
    aria-label="Flip ${escape(card.title)} to its ${face === "back" ? "player front" : "DM back"}"` : "";
  return `<article class="card card--${face} ${options.compact ? "card--compact" : ""}" ${flip}>
    ${face === "back" ? back(card, options) : front(card, options)}
  </article>
  ${options.action ? `<button class="card-primary-action" data-action="${options.action}" data-id="${card.id}">${escape(options.label)}</button>` : ""}`;
};

export const emptyView = text => `<div class="empty">${escape(text)}</div>`;
