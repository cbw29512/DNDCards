import { allCards, characters } from "./data.js";
import { cardView, emptyView } from "./cardView.js";
import { deriveCharacter } from "./characterEngine.js";
import { diceTrayView } from "./diceTrayView.js";

const LANES = [
  { kind:"room", title:"Location", icon:"⌂" },
  { kind:"monster", title:"Monsters", icon:"☠" },
  { kind:"trap", title:"Traps", icon:"⚠" },
  { kind:"treasure", title:"Treasure", icon:"◆" }
];
const SLOTS = [
  ["head","Head"], ["neck","Neck"], ["armor","Armor"], ["back","Back"],
  ["mainHand","Main hand"], ["offHand","Off hand"], ["hands","Hands"],
  ["waist","Waist"], ["feet","Feet"], ["ring1","Ring I"], ["ring2","Ring II"]
];

const lane = (state, kind, title, icon, isDm) => {
  const ids = state.placedByRoom[state.roomId] || [];
  const laneCards = ids.map(id => allCards.find(card => card.id === id))
    .filter(card => card?.kind === kind)
    .filter(card => isDm || state.revealedIds.includes(card.id));
  return `<section class="board-lane board-lane--${kind}">
    <header><span>${icon}</span><div><small>${kind === "room" ? "ACTIVE SCENE" : "ENCOUNTER LANE"}</small><h2>${title}</h2></div>
      ${isDm ? `<button data-action="open-library" data-id="${kind}" aria-label="Add ${title}">＋ Add</button>` : ""}</header>
    <div class="board-lane__cards">${laneCards.length ? laneCards.map(card => `
      <div class="board-card">${cardView(card, isDm ? {
        dm:true, face:state.dmFrontCardIds.includes(card.id) ? "front" : "back",
        health:state.healthByCard[card.id]
      } : { face:"front" })}
      ${isDm ? `<div class="board-card-controls">
        <button data-action="flip-card" data-id="${card.id}">${state.dmFrontCardIds.includes(card.id) ? "View DM back" : "View player front"}</button>
        <button data-action="reveal" data-id="${card.id}">${state.revealedIds.includes(card.id) ? "Hide from players" : "Reveal to players"}</button>
      </div>` : ""}
      ${isDm && card.kind === "treasure" ? `<button class="send-item" data-action="send-item" data-id="${card.id}">Send to active player</button>` : ""}
      </div>`).join("") : emptyView(isDm ? `Add a ${kind} card` : `No ${title.toLowerCase()} revealed`)}</div>
  </section>`;
};

const playerRail = state => {
  const player = state.players.find(candidate => candidate.id === state.activePlayerId);
  if (!player?.characterId) return `<aside class="character-sheet character-picker">
    <header><small>PRE-GENERATED HEROES</small><h2>Choose a hero</h2>
      <p>${state.identity?.role === "dm" ? "Select a character to inspect the complete player screen." : "Claim an available hero from the party panel."}</p></header>
    ${state.identity?.role === "dm" ? characters.map(character => `<button data-action="preview-character" data-id="${character.id}">
      <b>${character.title}</b><span>${character.playerText}</span></button>`).join("") : ""}</aside>`;
  const character = characters.find(card => card.id === player.characterId);
  const equipment = state.equipmentByPlayer[player.id] || {};
  const equipped = Object.values(equipment).map(id => allCards.find(card => card.id === id)).filter(Boolean);
  const derived = deriveCharacter(character, equipped);
  const backpack = (player.backpackIds || []).map(id => allCards.find(card => card.id === id)).filter(Boolean);
  const pending = (state.pendingItemsByPlayer[player.id] || []).map(id => allCards.find(card => card.id === id)).filter(Boolean);
  return `<aside class="character-sheet">
    <header><small>YOUR CHARACTER</small><h2>${player.name}</h2></header>
    ${state.identity?.role === "dm" ? `<nav class="hero-switcher" aria-label="Preview another pre-generated hero">
      ${characters.map(hero => `<button data-action="preview-character" data-id="${hero.id}" class="${hero.id === character.id ? "active" : ""}">${hero.title.split(" ")[0]}</button>`).join("")}</nav>` : ""}
    ${cardView(character, { face:"front", interactive:true })}
    <div class="derived-stats"><span><b>🛡 ${derived.armorClass}</b><small>Armor Class</small></span>
      <span><b>⚡ ${derived.initiative >= 0 ? "+" : ""}${derived.initiative}</b><small>Initiative</small></span>
      <span><b>➟ ${derived.speed}</b><small>Speed</small></span></div>
    ${pending.length ? `<section class="item-inbox"><h3>DM sent you</h3>${pending.map(item => `
      <div><b>${item.title}</b><button data-action="accept-item" data-id="${item.id}">Put in backpack</button></div>`).join("")}</section>` : ""}
    <section class="paper-doll"><h3>Equipment</h3>${SLOTS.map(([id,label]) => {
      const item = allCards.find(card => card.id === equipment[id]);
      return `<button class="${item ? "equipped" : ""}" ${item ? `data-action="unequip-item" data-id="${id}"` : ""}>
        <small>${label}</small><b>${item?.title || "Empty"}</b></button>`;
    }).join("")}</section>
    <section class="board-backpack"><h3>Backpack</h3>${backpack.length ? backpack.map(item => `
      <article><b>${item.title}</b><span>${(item.equipSlots || []).map(slot => `<button data-action="equip-item" data-id="${item.id}" data-slot="${slot}">Equip ${SLOTS.find(([id]) => id === slot)?.[1]}</button>`).join("")}</span></article>`).join("") : "<p>Your backpack is empty.</p>"}</section>
    ${equipped.flatMap(item => item.actions || []).filter(action => action.kind === "equippedAttack").map(action => {
      const item = equipped.find(candidate => candidate.actions?.includes(action));
      return `<button class="equipped-attack" data-action="equipped-attack" data-id="${action.id}" data-card-id="${item.id}">
        <b>${action.icon} ${action.label}</b><span>Roll to hit + all damage</span></button>`;
    }).join("")}
  </aside>`;
};

export const gameBoardView = state => {
  const isDm = state.identity?.role === "dm" && state.boardPerspective !== "player";
  return `<main class="game-board">
    ${diceTrayView(state)}
    <div class="game-board__layout">
      <section class="encounter-board">
        <header><div><small>LIVE CARD TABLE</small><h1>Game Board</h1></div>
          <span class="${isDm ? "dm-vision" : "player-vision"}">◉ ${isDm ? "DM CONTROL" : "PLAYER VIEW"}</span></header>
        <div class="board-lanes">${LANES.map(item => lane(state, item.kind, item.title, item.icon, isDm)).join("")}</div>
      </section>
      ${playerRail(state)}
    </div>
    ${isDm ? `<dialog id="library" class="card-vault"><header><div><small>DM CARD VAULT</small><h2>Choose a card</h2></div>
      <button data-action="close-library">Close</button></header><div id="library-cards" class="card-row"></div></dialog>` : ""}
  </main>`;
};
