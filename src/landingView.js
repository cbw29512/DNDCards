export const landingView = error => `
  <main class="landing">
    <nav class="landing-nav">
      <a class="brand" href="#"><span>DC</span><div><b>DUNGEON CARDS</b><small>BUILD IT · REVEAL IT · PLAY IT</small></div></a>
      <a href="#how-it-works">How it works</a>
    </nav>
    <section class="landing-hero">
      <div class="landing-copy">
        <small>THE TABLETOP ADVENTURE DECK</small>
        <h1>Your whole adventure,<br><em>played from cards.</em></h1>
        <p>Build a dungeon by combining room, monster, trap, treasure, NPC, and event cards. Reveal each card when the story reaches it, roll directly from the digital card, or print the deck and play with real dice.</p>
        <div class="landing-actions">
          <button data-action="choose-login" data-id="dm">Enter as Dungeon Master</button>
          <button class="secondary" data-action="choose-login" data-id="player">Join as Player</button>
        </div>
      </div>
      <div class="hero-deck" aria-label="Example adventure card deck">
        <article><small>ROOM CARD</small><b>The Heartbreak Inn</b><span>Set the scene</span></article>
        <article><small>MONSTER CARD</small><b>Jam Gremlin</b><span>Reveal the threat</span></article>
        <article><small>TREASURE CARD</small><b>Wishkeeper Charm</b><span>Claim the reward</span></article>
      </div>
    </section>
    <section class="how" id="how-it-works">
      <small>ONE SYSTEM · EVERY ADVENTURE</small><h2>Draw the next piece of the story.</h2>
      <div><article><b>1</b><h3>Build</h3><p>The DM assembles rooms from reusable cards.</p></article>
      <article><b>2</b><h3>Reveal</h3><p>Players see only cards revealed during play.</p></article>
      <article><b>3</b><h3>Play</h3><p>Roll, track turns, trade treasure, or print everything.</p></article></div>
    </section>
    <dialog id="login-dialog" class="login-dialog">
      <button class="dialog-close" data-action="close-login" aria-label="Close">×</button>
      <form id="login-form">
        <small id="login-eyebrow">ENTER THE TABLE</small><h2 id="login-title">Dungeon Master login</h2>
        <p id="login-help">Open your private adventure-building table.</p>
        <input type="hidden" name="role" id="login-role" value="dm">
        <label>Display name<input required maxlength="30" name="name" placeholder="Your name"></label>
        <label id="code-field" hidden>Table code<input maxlength="12" name="code" placeholder="HEARTH"></label>
        ${error ? `<p class="form-error" role="alert">${error}</p>` : ""}
        <button type="submit" id="login-submit">Open DM table</button>
        <p class="login-note">This prototype stores the table on this device. Secure accounts and online synchronization are the next authentication layer.</p>
      </form>
    </dialog>
  </main>`;
