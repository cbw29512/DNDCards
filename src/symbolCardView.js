const symbols = [
  ["♥", "Health", "Current and maximum hit points."],
  ["🛡", "Armor", "An attack must meet or beat this number."],
  ["➜", "Speed", "How far the creature can move."],
  ["⚔", "Melee", "An attack made within its listed reach."],
  ["➶", "Ranged", "An attack made at its listed range."],
  ["✦", "Spell", "A magical action with range, DC, and effect."],
  ["⬡", "Difficulty", "The DC a roll must meet or beat."],
  ["◈", "Roll", "Click online or roll the shown physical dice."],
  ["↻", "Recharge", "Roll the listed result at turn start."],
  ["⚡", "Reaction", "Used when its stated trigger occurs."],
  ["☕", "Short rest", "Resets when the DM issues a short rest."],
  ["☾", "Long rest", "Resets when the DM issues a long rest."]
];

export const symbolCardView = (extraClass = "") => `
  <article class="symbol-card ${extraClass}">
    <header><span>REFERENCE CARD</span><h3>SYMBOL KEY</h3><small>READ EVERY CARD AT A GLANCE</small></header>
    <div class="symbol-list">${symbols.map(([icon, name, help]) => `
      <div><b>${icon}</b><span><strong>${name}</strong><small>${help}</small></span></div>`).join("")}</div>
    <footer><b>NUMBER FIRST, RULE SECOND.</b><br>Icons help you scan quickly; card text gives the complete effect.</footer>
  </article>`;
