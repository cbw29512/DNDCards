import { allCards } from "./data.js?v=rules-ui-audit-1";
import { libraryCards } from "./dmView.js?v=rules-ui-audit-1";
import {
  rollInitiative,
  finishTurn,
  readyAction,
  triggerReadyAction
} from "./initiative.js?v=rules-ui-audit-1";
import { landingView } from "./landingView.js?v=rules-ui-audit-1";
import { libraryView } from "./libraryView.js?v=rules-ui-audit-1";
import { loadState, saveState, updateState, findCard } from "./state.js?v=rules-ui-audit-1";
import { executeCardAction } from "./diceEngine.js";
import { rollResultView } from "./rollResultView.js";
import { library } from "./libraryModel.js?v=rules-ui-audit-1";
import { spellActionAtLevel } from "./spellUpcast.js";
import { tableView } from "./tableView.js?v=rules-ui-audit-1";
import { handleGameBoardButton } from "./gameBoardController.js?v=rules-ui-audit-1";
import { pregenPackView } from "./pregenPackView.js?v=rules-ui-audit-1";
import { consumeSpellSlot } from "./spellSlotState.js";

let state = loadState();
let libraryKind = null;
let boardLibraryQuery = "";
let catalogKind = "all";
let catalogQuery = "";
let openPregenId = null;
const root = document.querySelector("#app");

const render = () => {
  try {
    if (state.screen === "library") {
      root.innerHTML = `${libraryView(catalogQuery, catalogKind, state)}${rollResultView(state)}`;
      return;
    }
    if (state.screen !== "table") {
      root.innerHTML = landingView(state.lastError);
      return;
    }
    root.innerHTML = tableView(state);
    if (libraryKind) openLibrary(libraryKind);
    if (openPregenId) openPregenPack(openPregenId);
  } catch (error) {
    console.error("[Dungeon Cards] Interface render failed.", error);
    root.innerHTML = "<h1>Dungeon Cards could not load. Refresh to try again.</h1>";
  }
};

const dispatch = action => {
  state = updateState(state, action);
  render();
};

const openLibrary = kind => {
  libraryKind = kind;
  const dialog = document.querySelector("#library");
  if (!dialog) return;
  dialog.querySelector("#library-cards").innerHTML = libraryCards(state, kind, boardLibraryQuery);
  const search = dialog.querySelector("#board-library-search");
  if (search) search.value = boardLibraryQuery;
  if (!dialog.open) dialog.showModal();
};

const openPregenPack = id => {
  const card = findCard(id);
  const dialog = document.querySelector("#pregen-pack-dialog");
  if (!card || card.kind !== "character" || !dialog) return;
  openPregenId = id;
  dialog.innerHTML = pregenPackView(card, state);
  if (!dialog.open) dialog.showModal();
};

root.addEventListener("click", event => {
  try {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action, id } = button.dataset;
    if (handleGameBoardButton(state, button)) { saveState(state); return render(); }
    if (action === "roll-card-action") {
      const card = findCard(button.dataset.cardId)
        || library.cards.find(candidate => candidate.id === button.dataset.cardId);
      if (!card) throw new Error(`Card ${button.dataset.cardId} was not found.`);
      const rollCard = card.spellActions?.some(action => action.id === id)
        ? { ...card, actions: [...(card.actions || []), ...card.spellActions] }
        : card;
      const baseAction = rollCard.actions?.find(candidate => candidate.id === id);
      const slotLevel = Number(state.spellSlotByCard?.[button.dataset.slotKey || card.id]
        || button.dataset.spellLevel || baseAction?.baseLevel || 0);
      const result = executeCardAction(rollCard, id, Math.random, {
        slotLevel,
        transformAction: spellActionAtLevel
      });
      if (baseAction?.spellId && Number(baseAction.baseLevel) > 0) consumeSpellSlot(state, card, slotLevel);
      state.lastRoll = result;
      state.rollHistory = [result, ...state.rollHistory].slice(0, 10);
      if (result.action.cost && !state.usedResources.includes(result.action.cost)) state.usedResources.push(result.action.cost);
      saveState(state);
      return render();
    }
    if (action === "cast-spell") {
      const card = findCard(button.dataset.cardId);
      const spell = card?.spellDetails?.find(candidate => candidate.id === id);
      const slotLevel = Number(state.spellSlotByCard?.[button.dataset.slotKey]
        || button.dataset.spellLevel || spell?.level || 0);
      if (!card || !spell) throw new Error("That spell card could not be found.");
      consumeSpellSlot(state, card, slotLevel);
      state.lastRoll = {
        cardId:card.id, cardTitle:card.title,
        action:{ label:spell.name, kind:"spell", range:spell.range, effect:spell.description },
        critical:false
      };
      state.rollHistory = [state.lastRoll, ...state.rollHistory].slice(0, 10);
      saveState(state); return render();
    }
    if (action === "close-roll") { state.lastRoll = null; saveState(state); return render(); }
    if (action === "clear-error") { state.lastError = null; saveState(state); return render(); }
    if (action === "select-spell-slot") return;
    if (action === "adjust-health") return dispatch({ type:"adjust-health", id:id || button.dataset.cardId, amount:Number(button.dataset.amount) });
    if (["adjust-temp-hp", "adjust-hit-die", "adjust-death-save", "reset-death-saves", "toggle-inspiration"].includes(action)) return dispatch({
      type:action, cardId:button.dataset.cardId, result:button.dataset.result,
      amount:Number(button.dataset.amount || 0)
    });
    if (action === "rest") return dispatch({ type:"rest", restType:id });
    if (action === "adjust-resource") return dispatch({
      type:"adjust-resource", cardId:button.dataset.cardId,
      resourceId:button.dataset.resourceId, amount:Number(button.dataset.amount)
    });
    if (action === "adjust-spell-slot") return dispatch({
      type:"adjust-spell-slot", cardId:button.dataset.cardId,
      level:Number(button.dataset.level), amount:Number(button.dataset.amount)
    });
    if (action === "open-card-library") {
      state.screen = "library"; saveState(state); return render();
    }
    if (action === "close-card-library") { state.screen = "landing"; saveState(state); return render(); }
    if (action === "filter-cards") { catalogKind = id; return render(); }
    if (action === "symbols") return document.querySelector("#symbol-dialog").showModal();
    if (action === "close-symbols") return button.closest("dialog").close();
    if (action === "open-pregen-pack") return openPregenPack(id);
    if (action === "close-pregen-pack") {
      openPregenId = null; return button.closest("dialog").close();
    }
    if (action === "print-pregen-pack") {
      document.body.dataset.print = "pregen-pack"; window.print(); return;
    }
    if (action === "choose-login") {
      const dialog = document.querySelector("#login-dialog");
      const player = id === "player";
      dialog.querySelector("#login-role").value = id;
      dialog.querySelector("#login-title").textContent = player ? "Player login" : "Dungeon Master login";
      dialog.querySelector("#login-help").textContent = player ? "Enter the code supplied by your DM." : "Open your private adventure-building table.";
      dialog.querySelector("#code-field").hidden = !player;
      dialog.querySelector("#login-submit").textContent = player ? "Join player table" : "Open DM table";
      return dialog.showModal();
    }
    if (action === "close-login") return button.closest("dialog").close();
    if (action === "open-library") {
      boardLibraryQuery = "";
      return openLibrary(id);
    }
    if (action === "close-library") {
      libraryKind = null;
      return button.closest("dialog").close();
    }
    if (action === "initiative") {
      state = rollInitiative(state); saveState(state); return render();
    }
    if (action === "finish-turn") {
      state = finishTurn(state); saveState(state); return render();
    }
    if (action === "open-ready-action") {
      return document.querySelector("#ready-action-dialog")?.showModal();
    }
    if (action === "close-ready-action") return button.closest("dialog")?.close();
    if (action === "trigger-ready-action") {
      state = triggerReadyAction(state, id); saveState(state); return render();
    }
    if (action === "resource") {
      state.usedResources = state.usedResources.includes(id)
        ? state.usedResources.filter(item => item !== id) : [...state.usedResources, id];
      saveState(state); return render();
    }
    if (action === "print") {
      document.body.dataset.print = id; window.print(); return;
    }
    if (action === "place") libraryKind = null;
    dispatch({ type: action, id, value: id, slot: button.dataset.slot });
  } catch (error) {
    console.error("[Dungeon Cards] Button action failed.", error);
    state.lastError = error instanceof Error ? error.message : "That control could not be used.";
    saveState(state);
    render();
  }
});

root.addEventListener("keydown", event => {
  try {
    const control = event.target.closest('[role="button"][data-action]');
    if (!control || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    control.click();
  } catch (error) {
    console.error("[Dungeon Cards] Keyboard control failed.", error);
  }
});

root.addEventListener("submit", event => {
  try {
    if (event.target.id === "ready-action-form") {
      event.preventDefault();
      const form = new FormData(event.target);
      state = readyAction(state, form.get("trigger"), form.get("response"));
      saveState(state);
      return render();
    }
    if (event.target.id === "login-form") {
      event.preventDefault();
      const form = new FormData(event.target);
      const role = String(form.get("role"));
      return dispatch({
        type: role === "player" ? "login-player" : "login-dm",
        name: String(form.get("name") || ""),
        code: String(form.get("code") || "")
      });
    }
    if (event.target.id !== "join-form") return;
    event.preventDefault();
    const name = new FormData(event.target).get("name");
    if (String(name).trim()) dispatch({ type: "join", name: String(name) });
  } catch (error) {
    console.error("[Dungeon Cards] Player could not join.", error);
  }
});

root.addEventListener("input", event => {
  try {
    if (event.target.id === "board-library-search") {
      boardLibraryQuery = event.target.value;
      openLibrary(libraryKind);
      const search = document.querySelector("#board-library-search");
      search?.focus();
      search?.setSelectionRange(boardLibraryQuery.length, boardLibraryQuery.length);
      return;
    }
    if (event.target.id === "character-search") {
      const query = event.target.value;
      state = updateState(state, { type:"set-character-query", value:query });
      render();
      const search = document.querySelector("#character-search");
      search?.focus();
      search?.setSelectionRange(query.length, query.length);
      return;
    }
    if (event.target.id !== "card-search") return;
    catalogQuery = event.target.value;
    render();
    const search = document.querySelector("#card-search");
    search?.focus();
    search?.setSelectionRange(catalogQuery.length, catalogQuery.length);
  } catch (error) {
    console.error("[Dungeon Cards] Card search failed.", error);
  }
});

root.addEventListener("change", event => {
  try {
    const heroPicker = event.target.closest("[data-action='preview-character-select']");
    if (heroPicker) {
      if (heroPicker.value) dispatch({ type:"preview-character", id:heroPicker.value });
      return;
    }
    const picker = event.target.closest("[data-action='select-spell-slot']");
    if (!picker) return;
    dispatch({
      type: "set-spell-slot",
      id: picker.dataset.cardId,
      value: picker.value
    });
  } catch (error) {
    console.error("[Dungeon Cards] Spell slot could not be selected.", error);
  }
});

window.addEventListener("afterprint", () => delete document.body.dataset.print);
render();
