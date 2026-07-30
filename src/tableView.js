import { dmView } from "./dmView.js";
import { initiativeView } from "./initiativeView.js";
import { lobbyView } from "./lobbyView.js";
import { playerView } from "./playerView.js";
import { printView } from "./printView.js";
import { rollResultView } from "./rollResultView.js";
import { symbolCardView } from "./symbolCardView.js";
import { tableHeaderView } from "./tableHeaderView.js";

export const tableView = state => `<div class="game-shell">${tableHeaderView(state)}
  <section class="quest-banner"><div><small>ACTIVE ADVENTURE · LEVEL 3</small>
  <h1>The Hearthglow Wish</h1></div><p><span>◆</span> A cozy birthday mystery</p></section>
  ${initiativeView(state)}${lobbyView(state)}
  ${state.mode === "dm" ? dmView(state) : playerView(state)}
  <dialog id="symbol-dialog" class="symbol-dialog">
    <button data-action="close-symbols" class="dialog-close" aria-label="Close">×</button>
    ${symbolCardView()}
  </dialog>
  ${rollResultView(state)}${printView(state)}
</div>`;
