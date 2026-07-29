const diceText = result => result ? `[${result.dice.join(", ")}] ${result.modifier ? `${result.modifier > 0 ? "+" : ""}${result.modifier}` : ""}` : "";

export const rollResultView = state => {
  const result = state.lastRoll;
  if (!result) return "";
  const action = result.action;
  return `<aside class="roll-tray" role="status" aria-live="polite">
    <header><div><small>LATEST CARD ROLL</small><h2>${result.cardTitle} · ${action.label}</h2></div>
      <button data-action="close-roll" aria-label="Close roll result">×</button></header>
    <div class="roll-total">
      ${result.attack ? `<article><span>${result.critical ? "NATURAL 20 · CRITICAL" : "ATTACK"}</span><b>${result.attack.total}</b><small>${diceText(result.attack)}</small></article>` : ""}
      ${result.roll ? `<article><span>${action.kind.toUpperCase()}</span><b>${result.roll.total}</b><small>${diceText(result.roll)}</small></article>` : ""}
      ${action.save ? `<article><span>${action.save.ability.toUpperCase()} SAVE</span><b>DC ${action.save.dc}</b><small>Target rolls against this DC</small></article>` : ""}
      ${result.damage ? `<article><span>${result.critical ? "CRITICAL DAMAGE" : "DAMAGE"}</span><b>${result.damage.total}</b><small>${diceText(result.damage)}</small></article>` : ""}
    </div>
    <p><b>${action.range || "Self"}</b>${action.effect ? ` · ${action.effect}` : ""}</p>
    <details><summary>Recent rolls</summary><ol>${state.rollHistory.map(item => `
      <li><b>${item.cardTitle}</b> · ${item.action.label} <span>${item.attack?.total ?? item.roll?.total ?? `DC ${item.action.save?.dc}`}${item.damage ? ` · ${item.damage.total} damage` : ""}</span></li>`).join("")}</ol></details>
  </aside>`;
};
