import { dmView } from "./dmView.js?v=card-faces-1";
import { initiativeView } from "./initiativeView.js";
import { lobbyView } from "./lobbyView.js?v=card-faces-1";
import { playerView } from "./playerView.js?v=card-faces-1";
import { printView } from "./printView.js?v=card-faces-1";
import { rollResultView } from "./rollResultView.js";
import { symbolCardView } from "./symbolCardView.js";
import { tableHeaderView } from "./tableHeaderView.js";
import { findAdventure } from "./adventures.js";
import { gameBoardView } from "./gameBoardView.js?v=card-faces-1";

export const tableView = state => {
  const adventure = findAdventure(state.adventureId);
  return `<div class="game-shell">${tableHeaderView(state)}
  <section class="quest-banner"><div><small>${adventure ? "ACTIVE ADVENTURE" : "DUNGEON CARDS PLATFORM"}</small>
  <h1>${adventure?.title || "Choose an adventure"}</h1></div>
  <p><span>◆</span> ${adventure?.subtitle || "Showcase · Create · Play"}</p></section>
  ${initiativeView(state)}${lobbyView(state)}
  ${state.tableTab === "board" ? gameBoardView(state) : state.mode === "dm" ? dmView(state) : playerView(state)}
  <dialog id="symbol-dialog" class="symbol-dialog">
    <button data-action="close-symbols" class="dialog-close" aria-label="Close">×</button>
    ${symbolCardView()}
  </dialog>
  ${rollResultView(state)}${printView(state)}
</div>`;
};
