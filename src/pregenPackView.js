import {
  findSpellAction, pregenPackPages, signed, spellSlotKey
} from "./pregenPackModel.js?v=rules-ui-audit-1";
import { resourceRemaining } from "./resourceState.js";
import { allowedSpellSlotLevels, remainingSpellSlots } from "./spellSlotState.js";
import { characterStatus } from "./characterSheetState.js";

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

const controls = (action, card, extra = "") => `<span class="tracker-controls"><button data-action="${action}" data-card-id="${escape(card.id)}" data-amount="-1" ${extra}>−</button><button data-action="${action}" data-card-id="${escape(card.id)}" data-amount="1" ${extra}>+</button></span>`;
const status = (card, page, state) => { const value = characterStatus(state, card); return `<div class="pregen-body">${band(card, page)}<div class="pregen-status-grid">
  <section><small>CURRENT / MAX HP</small><b>♥ ${value.hp.current} / ${value.hp.maximum}</b>${controls("adjust-health", {id:card.id})}</section>
  <section><small>TEMPORARY HP</small><b>♡ ${value.temporaryHp}</b>${controls("adjust-temp-hp", card)}</section>
  <section><small>HIT DICE</small><b>${value.hitDice} / ${card.level}d${card.hitDie}</b>${controls("adjust-hit-die", card)}</section>
  <section><small>INSPIRATION</small><b>${value.inspiration ? "READY" : "EMPTY"}</b><button data-action="toggle-inspiration" data-card-id="${escape(card.id)}">Toggle</button></section>
  </div><div class="death-tracker"><h4>DEATH SAVES</h4><p>Successes <b>${value.deathSuccesses}/3</b>${controls("adjust-death-save", card, 'data-result="successes"')}</p><p>Failures <b>${value.deathFailures}/3</b>${controls("adjust-death-save", card, 'data-result="failures"')}</p><button data-action="reset-death-saves" data-card-id="${escape(card.id)}">Reset</button></div><footer>Long Rest: HP restored · ${card.edition === "2024" ? "all" : "up to half"} spent Hit Dice restored</footer></div>`; };

const skills = (card, page) => `<div class="pregen-body">${band(card, page)}<div class="skill-list">${page.skills.map(skill => `<div><span>${skill.trained ? "●" : "○"}${skill.expertise ? "★" : ""}</span><b>${escape(skill.name)}</b><small>${skill.ability}</small><strong>${signed(skill.bonus)}</strong></div>`).join("")}</div><footer>● proficient · ★ expertise · Passive Perception ${page.passivePerception}</footer></div>`;

const actionSummary = action => action.kind === "attack"
  ? `TO HIT ${action.roll} · ${action.damage} · ${action.range}`
  : action.save
    ? `SAVE DC ${action.save.dc} ${action.save.ability} · ROLL ${action.roll || action.damage || "EFFECT"}`
    : `ROLL ${action.roll || action.damage || "EFFECT"} · ${action.range || action.cost || "Feature"}`;

const combat = (card, page) => `<div class="pregen-body">${band(card, page)}<div class="pregen-action-list">
  ${page.attacks.map(action => `<button data-action="roll-card-action" data-card-id="${escape(card.id)}" data-id="${escape(action.id)}"><b>${escape(action.icon)} ${escape(action.label)}</b><span>${escape(actionSummary(action))}</span><small>${escape(action.effect || "Use this action as listed.")}</small></button>`).join("")}
  </div><footer>Click an action to roll the attack and damage together.</footer></div>`;

const features = (card, page, state) => `<div class="pregen-body">${band(card, page)}
  ${page.resources.length ? `<div class="pregen-resources">${page.resources.map(resource => {
    const remaining = resourceRemaining(state, card, resource);
    return `<section><b>${escape(resource.name)}</b><span>${escape(remaining)} / ${escape(resource.maximum)} · ${escape(resource.refresh)}</span><div>
      <button data-action="adjust-resource" data-card-id="${escape(card.id)}" data-resource-id="${escape(resource.id)}" data-amount="-1" aria-label="Use ${escape(resource.name)}">−</button>
      <button data-action="adjust-resource" data-card-id="${escape(card.id)}" data-resource-id="${escape(resource.id)}" data-amount="1" aria-label="Restore ${escape(resource.name)}">+</button>
    </div></section>`;
  }).join("")}</div>` : ""}
  <div class="pregen-feature-list">${page.entries.map(entry => `<section><small>${entry.label}</small><p>${escape(entry.text)}</p></section>`).join("")}</div></div>`;

const gear = (card, page) => `<div class="pregen-body">${band(card, page)}<section><h4>BACKGROUND</h4><p>${escape(card.background)} · Hit Die d${card.hitDie} · ${card.currencyGp} gp</p></section><section><h4>ARMOR, WEAPON & TOOL TRAINING</h4><p>${escape(page.training)}</p></section>
  <section><h4>STARTING EQUIPMENT</h4><ul class="pregen-gear">${card.equipment.map(item => `<li>${escape(item)}</li>`).join("")}</ul></section>
  <section><h4>PLAY NOTES</h4><p>${escape(card.notes.slice(0, 2).join(" "))}</p></section></div>`;

const rules = (card, page) => { const actions = card.edition === "2024" ? "Attack, Dash, Disengage, Dodge, Help, Hide, Influence, Magic, Ready, Search, Study, or Utilize." : "Attack, Cast a Spell, Dash, Disengage, Dodge, Help, Hide, Ready, Search, or Use an Object."; return `<div class="pregen-body">${band(card, page)}<div class="rules-list"><section><h4>ON YOUR TURN</h4><p>Move up to Speed; take one Action; take one Bonus Action only when a feature grants it; use one free object interaction; one Reaction resets at the start of your turn.</p></section><section><h4>COMMON ACTIONS</h4><p>${actions} Ready states a trigger and uses your Reaction.</p></section><section><h4>CONCENTRATION</h4><p>One concentration spell at a time. After damage, make a Constitution save: DC 10 or half the damage, whichever is higher.</p></section><section><h4>AT 0 HP</h4><p>Roll a death save at each turn start. 10+ is a success. Three successes stabilize; three failures kill. A natural 20 restores 1 HP; a natural 1 causes two failures.</p></section></div><footer>Card summary · use the ${card.edition} rules for uncommon situations</footer></div>`; };

const spell = (card, detail, state) => {
  const action = findSpellAction(card, detail);
  const key = spellSlotKey(card, detail);
  const levels = allowedSpellSlotLevels(card, detail);
  const selected = Number(state.spellSlotByCard?.[key] || levels[0] || detail.level);
  const options = levels.length > 1 ? `<select data-action="select-spell-slot" data-card-id="${escape(key)}">${levels.map(level => `<option value="${level}" ${level === selected ? "selected" : ""}>Slot ${level}</option>`).join("")}</select>` : "";
  const actionType = action ? "roll-card-action" : "cast-spell";
  const actionId = action?.id || detail.id;
  const buttonText = action ? `${action.save ? `DC ${action.save.dc}` : action.damage || action.roll || "USE"} · ROLL` : "CAST / USE SLOT";
  return `<section class="pregen-spell"><h4><span>${detail.level ? `L${detail.level}` : "CANTRIP"}</span>${escape(detail.name)}</h4><small>${escape(detail.castingTime)} · ${escape(detail.range)} · ${escape(detail.duration)}</small><small>${escape(detail.school)} · ${escape(detail.components || "No components listed")}${detail.duration?.toLowerCase().includes("concentration") ? " · ◆ CONCENTRATION" : ""}</small><p>${escape(summary(detail.description))}</p>${detail.higherLevels ? `<p class="spell-upcast-note"><b>UPCAST:</b> ${escape(summary(detail.higherLevels.replace(/^At Higher Levels\.\s*/i, "")))}</p>` : ""}<div>${options}<button data-action="${actionType}" data-card-id="${escape(card.id)}" data-id="${escape(actionId)}" data-spell-level="${selected}" data-slot-key="${escape(key)}">${buttonText}</button></div></section>`;
};

const slotSummary = (card, state) => Object.entries(card.spellcasting?.slotsByLevel || {})
  .sort(([left], [right]) => Number(left) - Number(right))
  .map(([level, count]) => `<span>L${level} <b>${remainingSpellSlots(state, card, level)}/${count}</b><button data-action="adjust-spell-slot" data-card-id="${escape(card.id)}" data-level="${level}" data-amount="-1">−</button><button data-action="adjust-spell-slot" data-card-id="${escape(card.id)}" data-level="${level}" data-amount="1">+</button></span>`).join("");

const spells = (card, page, state) => `<div class="pregen-body pregen-body--spells">${band(card, page)}<div class="pregen-slot-row"><b>SPELL SLOTS</b>${slotSummary(card, state) || "Cantrips / at-will"}</div><div>${page.spells.map(detail => spell(card, detail, state)).join("")}</div><footer>Spell attack ${signed(card.spellAttackBonus)} · Save DC ${card.spellSaveDc} · ${page.final ? "FINAL ACCORDION CARD" : "CONTINUE →"}</footer></div>`;

const pageView = (card, page, state) => `<article class="pregen-card pregen-card--${page.type}">${({ portrait, status, abilities, skills, combat, features, gear, rules, spells })[page.type](card, page, state)}</article>`;

const latestRoll = (card, state) => {
  const result = state.lastRoll;
  if (!result || result.cardId !== card.id) return "";
  const attack = result.attack?.total;
  const roll = result.roll?.total;
  const damage = result.damage?.total;
  return `<aside class="pregen-latest-roll"><b>${escape(result.action.label)}</b>${attack !== undefined ? `<span>TO HIT <strong>${attack}</strong></span>` : ""}${result.action.save ? `<span>SAVE <strong>DC ${result.action.save.dc}</strong></span>` : ""}${roll !== undefined ? `<span>${escape(result.action.kind).toUpperCase()} <strong>${roll}</strong></span>` : ""}${damage !== undefined ? `<span>DAMAGE <strong>${damage}</strong></span>` : ""}<button data-action="close-roll">×</button></aside>`;
};

export const pregenPackView = (card, state) => `<div class="pregen-pack-shell"><header><div><small>COMPLETE LEVEL 3 PRE-GENERATED HERO</small><h2>${escape(card.title)}</h2><p>${escape(card.badge)} · ${pregenPackPages(card).length} printable cards</p></div><div><button data-action="print-pregen-pack">Print pack</button><button data-action="close-pregen-pack">Close</button></div></header>${latestRoll(card, state)}<div class="pregen-pack-row">${pregenPackPages(card).map(page => pageView(card, page, state)).join("")}</div></div>`;
