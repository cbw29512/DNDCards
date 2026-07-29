import { symbolCardView } from "./symbolCardView.js";

export const productDemoView = () => `
  <section class="product-proof">
    <header><small>DON'T JUST READ ABOUT IT</small><h2>See the system you are buying.</h2>
      <p>The DM runs the room from one screen. Players receive only the illustrated faces and information the DM reveals.</p></header>
    <div class="dm-demo">
      <div class="demo-topbar"><b>DUNGEON CARDS</b><span>THE HEARTHGLOW WISH</span><button>Round 2 · Jam Gremlin</button></div>
      <aside class="demo-rooms"><small>QUEST PATH</small><b>✓ 1. Hearthglow Square</b><b class="selected">2. The Heartbreak Inn</b><b>3. Chapel of Wishes</b><b>4. Candlewick Curios</b></aside>
      <main class="demo-board">
        <div class="demo-initiative"><strong>INITIATIVE</strong><span class="active">Wendy · 22</span><span>Jam Gremlins · 17</span><span>Bob · 14</span><button>Finish turn →</button></div>
        <header><div><small>ROOM 2</small><h3>The Heartbreak Inn</h3></div><span>DM PRIVATE VIEW</span></header>
        <div class="demo-slots">
          <article><small>ROOM</small><b>The Heartbreak Inn</b><p>Music falters inside an inn decorated for a birthday nobody remembers.</p><button>Revealed ✓</button></article>
          <article><small>MONSTERS · 2</small><b>Jam Gremlin</b><p>♥ 18 &nbsp; 🛡 13 &nbsp; ⚔ +4</p><button>Reveal to players</button></article>
          <article><small>CLUE</small><b>The Forgotten Toast</b><p>Required finale clue. Reveal before the party leaves.</p><button>Hidden from players</button></article>
          <article><small>TREASURE</small><b>Wishkeeper Charm</b><p>Approve transfer to a player's backpack.</p><button>Give treasure</button></article>
        </div>
        <div class="demo-turn"><b>WENDY'S TURN</b><span>Movement</span><span class="used">Action ✓</span><span>Bonus action</span><span>Free</span><span>Reaction</span></div>
      </main>
    </div>
    <div class="example-card-section">
      <div class="example-copy"><small>THE COMPLETE CARD SYSTEM</small><h2>Monster front, DM back, and the Symbol Key.</h2>
        <p>The illustrated front gives players something memorable to react to. The private back gives the DM everything needed for the creature's turn without opening another book.</p>
        <ul><li>Room number connects every encounter card to the quest.</li><li>The included Symbol Key explains every icon at a glance.</li><li>Clickable actions roll automatically online; printed cards use real dice.</li><li>Complex monsters expand into ordered accordion cards, with spells on the final card.</li></ul>
      </div>
      <div class="example-cards">
        <article class="showcase-card card-front">
          <img src="assets/jam-gremlin-card-art.webp" alt="Original illustration of a mischievous Jam Gremlin holding a jam-covered spoon">
          <span class="room-badge">ROOM 2</span><span class="cr-badge">CR 1/2</span>
          <footer><h3>JAM GREMLIN</h3><p>Small Fey · Mischief Maker</p></footer>
        </article>
        <article class="showcase-card card-stats">
          <header><span>ROOM 2</span><h3>JAM GREMLIN</h3><small>QUICK-RUN COMBAT CARD</small></header>
          <div class="icon-stats"><b>🛡 13<small>ARMOR</small></b><b>♥ 18<small>HEALTH</small></b><b>➜ 30 ft.<small>SPEED</small></b></div>
          <div class="abilities"><span>STR<b>8 −1</b></span><span>DEX<b>15 +2</b></span><span>CON<b>12 +1</b></span><span>INT<b>10 +0</b></span><span>WIS<b>11 +0</b></span><span>CHA<b>14 +2</b></span></div>
          <section><h4>STICKY SCAMPER</h4><p>Ignores difficult terrain made by food or spilled liquid.</p></section>
          <section><h4>⚔ SPOON SWIPE</h4><p><b>+4</b> to hit · reach 5 ft. · <b>1d6 + 2</b> bludgeoning.</p></section>
          <section><h4>➶ BERRY SPLAT · RECHARGE 5–6</h4><p>Range 30 ft. · DC 12 Dexterity · <b>2d6</b> acid; target's speed is reduced by 10 ft. until its next turn.</p></section>
          <footer><b>TACTIC</b> Splat the fastest hero, then hide behind furniture.<br><b>MORALE</b> Below 6 ♥, it surrenders for fresh toast.</footer>
        </article>
        <div class="symbol-showcase-wrap"><strong>INCLUDED IN EVERY ADVENTURE PACK</strong>${symbolCardView("symbol-card--showcase")}</div>
      </div>
    </div>
  </section>`;
