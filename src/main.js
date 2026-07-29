import { allCards } from "./data.js";
import { dmView, libraryCards } from "./dmView.js";
import { rollInitiative, finishTurn } from "./initiative.js";
import { initiativeView } from "./initiativeView.js";
import { lobbyView } from "./lobbyView.js";
import { playerView } from "./playerView.js";
import { printView } from "./printView.js";
import { loadState, saveState, updateState } from "./state.js";

let state = loadState();
let libraryKind = null;
const root = document.querySelector("#app");

const render = () => {
  try {
    root.innerHTML = `<header class="hero"><a class="brand" href="#"><span>DC</span><div><b>DUNGEON CARDS</b><small>Build it. Reveal it. Play it.</small></div></a>
      <nav><button data-action="mode" data-id="dm" class="${state.mode === "dm" ? "active" : ""}">DM table</button>
      <button data-action="mode" data-id="player" class="${state.mode === "player" ? "active" : ""}">Player table</button>
      <button data-action="print" data-id="duplex">Print duplex</button><button data-action="print" data-id="home">Home sheets</button></nav></header>
      <section class="adventure-title"><small>OFFICIAL STARTER ADVENTURE · LEVEL 3</small><h1>The Hearthglow Wish</h1>
      <p>A cozy birthday mystery played entirely from cards.</p></section>
      ${initiativeView(state)}${lobbyView(state)}${state.mode === "dm" ? dmView(state) : playerView(state)}${printView(state)}`;
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
    if (event.target.id !== "join-form") return;
    event.preventDefault();
    const name = new FormData(event.target).get("name");
    if (String(name).trim()) dispatch({ type: "join", name: String(name) });
  } catch (error) {
    console.error("[Dungeon Cards] Player could not join.", error);
  }
});

window.addEventListener("afterprint", () => delete document.body.dataset.print);
render();
