import { allCards } from "./data.js";
import { dmView, libraryCards } from "./dmView.js";
import { rollInitiative, finishTurn } from "./initiative.js";
import { initiativeView } from "./initiativeView.js";
import { landingView } from "./landingView.js";
import { libraryView } from "./libraryView.js";
import { lobbyView } from "./lobbyView.js";
import { playerView } from "./playerView.js";
import { printView } from "./printView.js";
import { loadState, saveState, updateState } from "./state.js";
import { symbolCardView } from "./symbolCardView.js";
import { executeCardAction } from "./diceEngine.js";
import { findCard } from "./state.js";
import { rollResultView } from "./rollResultView.js";

let state = loadState();
let libraryKind = null;
let catalogKind = "all";
let catalogQuery = "";
const root = document.querySelector("#app");

const render = () => {
  try {
    if (state.screen === "library") {
      root.innerHTML = libraryView(catalogQuery, catalogKind);
      return;
    }
    if (state.screen !== "table") {
      root.innerHTML = landingView(state.lastError);
      return;
    }
    root.innerHTML = `<header class="hero"><a class="brand" href="#"><span>DC</span><div><b>DUNGEON CARDS</b><small>Build it. Reveal it. Play it.</small></div></a>
      <nav><button data-action="mode" data-id="dm" class="${state.mode === "dm" ? "active" : ""}">DM table</button>
      <button data-action="mode" data-id="player" class="${state.mode === "player" ? "active" : ""}">Player table</button>
      <button data-action="symbols">Symbol key</button>
      <button data-action="print" data-id="duplex">Print duplex</button><button data-action="print" data-id="home">Home sheets</button>
      <button data-action="logout">Log out</button></nav></header>
      <section class="adventure-title"><small>OFFICIAL STARTER ADVENTURE · LEVEL 3</small><h1>The Hearthglow Wish</h1>
      <p>A cozy birthday mystery played entirely from cards.</p></section>
      ${initiativeView(state)}${lobbyView(state)}${state.mode === "dm" ? dmView(state) : playerView(state)}
      <dialog id="symbol-dialog" class="symbol-dialog"><button data-action="close-symbols" class="dialog-close" aria-label="Close">×</button>${symbolCardView()}</dialog>
      ${rollResultView(state)}${printView(state)}`;
    if (libraryKind) openLibrary(libraryKind);
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
  dialog.querySelector("#library-cards").innerHTML = libraryCards(state, kind);
  if (!dialog.open) dialog.showModal();
};

root.addEventListener("click", event => {
  try {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === "roll-card-action") {
      const card = findCard(button.dataset.cardId);
      const result = executeCardAction(card, id);
      state.lastRoll = result;
      state.rollHistory = [result, ...state.rollHistory].slice(0, 10);
      if (result.action.cost && !state.usedResources.includes(result.action.cost)) state.usedResources.push(result.action.cost);
      saveState(state);
      return render();
    }
    if (action === "close-roll") {
      state.lastRoll = null; saveState(state); return render();
    }
    if (action === "adjust-health") return dispatch({ type:"adjust-health", id, amount:Number(button.dataset.amount) });
    if (action === "rest") return dispatch({ type:"rest", restType:id });
    if (action === "open-card-library") {
      state.screen = "library"; saveState(state); return render();
    }
    if (action === "close-card-library") {
      state.screen = "landing"; saveState(state); return render();
    }
    if (action === "filter-cards") {
      catalogKind = id; return render();
    }
    if (action === "symbols") return document.querySelector("#symbol-dialog").showModal();
    if (action === "close-symbols") return button.closest("dialog").close();
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
    if (action === "open-library") return openLibrary(id);
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
    if (action === "resource") {
      state.usedResources = state.usedResources.includes(id)
        ? state.usedResources.filter(item => item !== id) : [...state.usedResources, id];
      saveState(state); return render();
    }
    if (action === "print") {
      document.body.dataset.print = id; window.print(); return;
    }
    if (action === "place") libraryKind = null;
    dispatch({ type: action, id, value: id });
  } catch (error) {
    console.error("[Dungeon Cards] Button action failed.", error);
  }
});

root.addEventListener("submit", event => {
  try {
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

window.addEventListener("afterprint", () => delete document.body.dataset.print);
render();
