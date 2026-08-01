import {
  findSpellAction, maxSpellSlot, pregenPackPages, signed, spellSlotKey
} from "./pregenPackModel.js?v=all-core-classes-1";

const escape = value => String(value ?? "").replace(/[&<>"']/g, character =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[character]
);
const summary = text => String(text || "").split(/(?<=[.!?])\s+/)[0];
const band = (card, page) => `<header><span>♞</span><div><small>${escape(page.label)}</small><b>${escape(card.title)}</b></div></header>`;

const portrait = card => `<div class="pregen-portrait" style="background-image:url('${escape(card.art)}')">
  <div><small>${escape(card.edition)} RULES · LEVEL 3</small><h3>${escape(card.title.replace(" · Level 3", ""))}</h3>
  <p>${escape(card.species)} ${escape(card.className)} · ${escape(card.subclassName)}</p>
  <section><b>♥ ${card.quickStats[0]?.replace(/^♥\s*/, "")}</b><b>🛡 ${card.baseArmorClass}</b><b>➜ ${card.speed} ft.</b></section></div></div>`;

const abilities = (card, page) => `<div class="pregen-body">${band(card, page)}
  <div class="pregen-abilities">${page.abilities.map(ability => `<div><b>${ability.id}</b><strong>${ability.score}</strong><span>${signed(ability.modifier)}</span><small>SAVE ${signed(ability.save)}${ability.proficient ? " ●" : ""}</small></div>`).join("")}</div>
  <section><h4>PROFICIENCY +${card.proficiencyBonus} · INITIATIVE ${signed(card.initiative)}</h4><p><b>Skills:</b> ${escape(card.skillProficiencies.join(", "))}</p><p><b>Senses:</b> ${escape(card.senses.join(", "))}</p><p><b>Languages:</b> ${escape(card.languages.join(", "))}</p><p><b>Tools:</b> ${escape(card.toolProficiencies.join(", ") || "None")}</p></section></div>`;

const actionSummary = action => action.kind === "attack"
  ? `TO HIT ${action.roll} · ${action.damage} · ${action.range}`
  : action.save
    ? `SAVE DC ${action.save.dc} ${action.save.ability} · ROLL ${action.roll || action.damage || "EFFECT"}`
    : `ROLL ${action.roll || action.damage || "EFFECT"} · ${action.range || action.cost || "Feature"}`;

const combat = (card, page) => `<div class="pregen-body">${band(card, page)}<div class="pregen-action-list">
  ${page.attacks.map(action => `<button data-action="roll-card-action" data-card-id="${escape(card.id)}" data-id="${escape(action.id)}"><b>${escape(action.icon)} ${escape(action.label)}</b><span>${escape(actionSummary(action))}</span><small>${escape(action.effect || "Use this action as listed.")}</small></button>`).join("")}
  </div><footer>Click an action to roll the attack and damage together.</footer></div>`;

const features = (card, page, state) => `<div class="pregen-body">${band(card, page)}
  ${page.resources.length ? `<div class="pregen-resources">${page.resources.map(resource => { const id = `${card.id}:${resource.id}`; return `<button class="${state.usedResources.includes(id) ? "used" : ""}" data-action="resource" data-id="${escape(id)}"><b>${escape(resource.name)}</b><span>${escape(resource.maximum)} · ${escape(resource.refresh)}</span></button>`; }).join("")}</div>` : ""}
  <div class="pregen-feature-list">${page.entries.map(entry => `<section><small>${entry.label}</small><p>${escape(entry.text)}</p></section>`).join("")}</div></div>`;

const gear = (card, page) => `<div class="pregen-body">${band(card, page)}<section><h4>BACKGROUND</h4><p>${escape(card.background)} · Hit Die d${card.hitDie} · ${card.currencyGp} gp</p></section>
  <section><h4>STARTING EQUIPMENT</h4><ul class="pregen-gear">${card.equipment.map(item => `<li>${escape(item)}</li>`).join("")}</ul></section>
  <section><h4>PLAY NOTES</h4><p>${escape(card.notes.slice(0, 2).join(" "))}</p></section></div>`;

const spell = (card, detail, state) => {
  const action = findSpellAction(card, detail);
  const max = maxSpellSlot(card);
  const key = spellSlotKey(card, detail);
  const selected = Number(state.spellSlotByCard?.[key] || detail.level);
  const options = detail.level && max > detail.level ? `<select data-action="select-spell-slot" data-card-id="${escape(key)}">${Array.from({ length:max - detail.level + 1 }, (_, i) => detail.level + i).map(level => `<option value="${level}" ${level === selected ? "selected" : ""}>Slot ${level}</option>`).join("")}</select>` : "";
  return `<section class="pregen-spell"><h4><span>${detail.level ? `L${detail.level}` : "CANTRIP"}</span>${escape(detail.name)}</h4><small>${escape(detail.castingTime)} · ${escape(detail.range)} · ${escape(detail.duration)}</small><p>${escape(summary(detail.description))}</p>${action ? `<div>${options}<button data-action="roll-card-action" data-card-id="${escape(card.id)}" data-id="${escape(action.id)}" data-slot-key="${escape(key)}">${action.save ? `DC ${action.save.dc}` : action.damage || action.roll || "USE"} · ROLL</button></div>` : ""}</section>`;
};

const slotSummary = card => Object.entries(card.spellcasting?.slotsByLevel || {})
  .sort(([left], [right]) => Number(left) - Number(right))
  .map(([level, count]) => `L${level} ×${count}`).join(" · ");

const spells = (card, page, state) => `<div class="pregen-body pregen-body--spells">${band(card, page)}<p class="pregen-slot-row"><b>SPELL SLOTS</b> ${escape(slotSummary(card) || "Cantrips / at-will")}</p><div>${page.spells.map(detail => spell(card, detail, state)).join("")}</div><footer>Spell attack ${signed(card.spellAttackBonus)} · Save DC ${card.spellSaveDc} · ${page.final ? "FINAL ACCORDION CARD" : "CONTINUE →"}</footer></div>`;

const pageView = (card, page, state) => `<article class="pregen-card pregen-card--${page.type}">${({ portrait, abilities, combat, features, gear, spells })[page.type](card, page, state)}</article>`;

const latestRoll = (card, state) => {
  const result = state.lastRoll;
  if (!result || result.cardId !== card.id) return "";
  const attack = result.attack?.total;
  const roll = result.roll?.total;
  const damage = result.damage?.total;
  return `<aside class="pregen-latest-roll"><b>${escape(result.action.label)}</b>${attack !== undefined ? `<span>TO HIT <strong>${attack}</strong></span>` : ""}${result.action.save ? `<span>SAVE <strong>DC ${result.action.save.dc}</strong></span>` : ""}${roll !== undefined ? `<span>${escape(result.action.kind).toUpperCase()} <strong>${roll}</strong></span>` : ""}${damage !== undefined ? `<span>DAMAGE <strong>${damage}</strong></span>` : ""}<button data-action="close-roll">×</button></aside>`;
};

export const pregenPackView = (card, state) => `<div class="pregen-pack-shell"><header><div><small>COMPLETE LEVEL 3 PRE-GENERATED HERO</small><h2>${escape(card.title)}</h2><p>${escape(card.badge)} · ${pregenPackPages(card).length} printable cards</p></div><div><button data-action="print-pregen-pack">Print pack</button><button data-action="close-pregen-pack">Close</button></div></header>${latestRoll(card, state)}<div class="pregen-pack-row">${pregenPackPages(card).map(page => pageView(card, page, state)).join("")}</div></div>`;
