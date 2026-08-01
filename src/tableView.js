import { dmView } from "./dmView.js?v=level-3-pregens-1";
import { initiativeView } from "./initiativeView.js";
import { lobbyView } from "./lobbyView.js?v=level-3-pregens-1";
import { playerView } from "./playerView.js?v=level-3-pregens-1";
import { printView } from "./printView.js?v=npc-lane-1";
import { rollResultView } from "./rollResultView.js";
import { symbolCardView } from "./symbolCardView.js";
import { tableHeaderView } from "./tableHeaderView.js?v=unified-board-2";
import { findAdventure } from "./adventures.js";
import { gameBoardView } from "./gameBoardView.js?v=level-3-pregens-1";

export const tableView = state => {
  const adventure = findAdventure(state.adventureId);
  const needsAdventureSetup = state.identity?.role === "dm"
    && (!adventure || state.adventureComplete);
  return `<div class="game-shell">${tableHeaderView(state)}
  <section class="quest-banner"><div><small>${adventure ? "ACTIVE ADVENTURE" : "DUNGEON CARDS PLATFORM"}</small>
  <h1>${adventure?.title || "Choose an adventure"}</h1></div>
  <p><span>◆</span> ${adventure?.subtitle || "Showcase · Create · Play"}</p></section>
  ${initiativeView(state)}${lobbyView(state)}
  ${needsAdventureSetup ? dmView(state) : gameBoardView(state)}
  <dialog id="symbol-dialog" class="symbol-dialog">
    <button data-action="close-symbols" class="dialog-close" aria-label="Close">×</button>
    ${symbolCardView()}
  </dialog>
  <dialog id="pregen-pack-dialog" class="pregen-pack-dialog"></dialog>
  ${rollResultView(state)}${printView(state)}
</div>`;
};
