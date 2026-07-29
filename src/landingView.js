import { productDemoView } from "./productDemoView.js";
import { symbolCardView } from "./symbolCardView.js";

export const landingView = error => `
  <main class="landing">
    <nav class="landing-nav">
      <a class="brand" href="#"><span>DC</span><div><b>DUNGEON CARDS</b><small>BUILD IT · REVEAL IT · PLAY IT</small></div></a>
      <div><a href="#how-it-works">How it works</a><a href="#symbol-key">Symbol key</a><a href="#adventure-packs">Adventure packs</a><a href="#homebrew">Homebrew</a></div>
    </nav>
    <section class="landing-hero">
      <div class="landing-copy">
        <small>OPEN THE PACK · PLAY IN ABOUT 15 MINUTES</small>
        <h1>Your whole adventure,<br><em>played from cards.</em></h1>
        <p>Buy a complete adventure, claim the included heroes, and begin with almost no prep. The cards tell the DM what to reveal, read, run, and award—while the digital table handles the busy work.</p>
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
    <section class="symbol-key-feature" id="symbol-key">
      <div class="symbol-key-card-stage"><span>PACK CARD 01</span>${symbolCardView("symbol-card--landing")}</div>
      <div class="symbol-key-copy">
        <small>INCLUDED IN EVERY DUNGEON CARDS PACK</small>
        <h2>The first card teaches you how to read every other card.</h2>
        <p>Every official adventure, expansion deck, physical order, digital purchase, and print-at-home package includes the Symbol Key. Keep it on the table so new players and experienced DMs can understand the system without searching through rules.</p>
        <div class="included-formats"><span>✓ Physical decks</span><span>✓ Digital packs</span><span>✓ Print-at-home</span><span>✓ Starter adventures</span></div>
        <p class="symbol-key-note"><b>DM and player reference:</b> health, armor, speed, melee, ranged, spells, DCs, dice, recharge, reactions, short rests, and long rests are explained on one playing-card-sized reference.</p>
      </div>
    </section>
    ${productDemoView()}
    <section class="how" id="how-it-works">
      <small>ONE SYSTEM · EVERY ADVENTURE</small><h2>Draw the next piece of the story.</h2>
      <div><article><b>1</b><h3>Build</h3><p>The DM assembles rooms from reusable cards.</p></article>
      <article><b>2</b><h3>Reveal</h3><p>Players see only cards revealed during play.</p></article>
      <article><b>3</b><h3>Play</h3><p>Roll, track turns, trade treasure, or print everything.</p></article></div>
    </section>
    <section class="qr-story">
      <div class="qr-art"><span class="qr-placeholder">▦</span><div><small>SCAN TO UNLOCK</small><b>Wishkeeper Charm</b><em>Physical card → digital collection</em></div></div>
      <div><small>THE BRIDGE BETWEEN TABLE AND SCREEN</small>
        <h2>Every card can carry its game data with it.</h2>
        <p>Scan the QR code on a physical card to load its official digital version into Dungeon Cards. Characters, treasures, magic items, monsters, locations, and complete adventures can travel from the card in your hand to the table on your screen.</p>
        <ul><li><b>Scan it</b><span>Unlock the card or adventure pack.</span></li>
        <li><b>Play it</b><span>Use clickable rolls, effects, initiative, and tracking.</span></li>
        <li><b>Keep it</b><span>Add rewards and characters to your personal collection.</span></li></ul>
      </div>
    </section>
    <section class="packs" id="adventure-packs">
      <header><small>OPEN THE BOX · START THE STORY</small><h2>A complete one-shot, ready when your group is.</h2>
      <p>Each official adventure pack contains everything needed to sit down and play—and every card remains useful in adventures you build later.</p></header>
      <div class="pack-grid">
        <article><span>01</span><h3>Step-by-step quest deck</h3><p>Room cards, story beats, conversations, clues, encounters, and a DM decision path keep the adventure moving without burying the table in a book.</p></article>
        <article><span>02</span><h3>Pre-generated heroes</h3><p>Players claim ready-to-play character cards with actions, spells, resources, and rests managed directly from the card.</p></article>
        <article><span>03</span><h3>Monsters and hazards</h3><p>Show players the illustrated front while the DM runs quick combat statistics, tactics, traps, and effects from private cards.</p></article>
        <article><span>04</span><h3>Treasure and magic items</h3><p>Rewards become cards players can claim, carry in a digital backpack, trade with DM approval, print, or scan from a physical deck.</p></article>
        <article><span>05</span><h3>Locations and random events</h3><p>Visit an inn, chapel, shop, or wilderness site and roll scalable events directly from that location card.</p></article>
        <article><span>06</span><h3>Print-and-play support</h3><p>Run the adventure online, print duplex cards, use home-print sheets, or buy a professionally printed physical deck.</p></article>
      </div>
    </section>
    <section class="combat-story">
      <header><small>COMBAT WITHOUT THE PAPER CHASE</small><h2>The table tracks the fight while you run the story.</h2>
      <p>When Dungeon Cards is used digitally, the actions on every active character and monster card become part of one shared combat system.</p></header>
      <div class="combat-flow">
        <article><span>1</span><h3>One-button initiative</h3><p>Players and the DM press Initiative. The system rolls from each active card, adds its bonus, groups identical monsters, applies tie breakers, and places everyone in order.</p></article>
        <article><span>2</span><h3>Guided turns</h3><p>The active creature is highlighted. Movement, action, bonus action, free interaction, and reaction are tracked from the card before play advances to the next turn.</p></article>
        <article><span>3</span><h3>Roll from the card</h3><p>Click a sword, bow, spell, save, skill, or damage icon. The card supplies its bonus, range, damage, difficulty, and effect. Printed-card groups simply roll real dice.</p></article>
        <article><span>4</span><h3>Conditions and resources</h3><p>Health, armor, spell uses, limited abilities, treasure effects, conditions, and concentration stay attached to the creature or character that owns them.</p></article>
        <article><span>5</span><h3>Rounds and rests</h3><p>The round tracker advances automatically. The DM can issue short or long rests so the correct card abilities reset together.</p></article>
        <article><span>6</span><h3>Private where it matters</h3><p>The DM sees statistics, tactics, traps, and hidden notes. Players see only their character, approved possessions, current room, and revealed threats.</p></article>
      </div>
      <aside><b>House rule ready:</b> A natural 20 initiative earns the opening turn, then that creature returns to its normal place in Round 1. Ties resolve by Dexterity, Strength, Constitution, Intelligence, Wisdom, then Charisma.</aside>
    </section>
    <section class="fast-start">
      <div><small>FROM PURCHASE TO FIRST SCENE</small><h2>Tonight's adventure can be ready in 15 minutes.</h2></div>
      <ol><li><b>1 minute</b><span>Scan or open the adventure pack.</span></li>
      <li><b>3 minutes</b><span>DM reviews the quest path and opening card.</span></li>
      <li><b>5 minutes</b><span>Players join by code and claim pre-generated heroes.</span></li>
      <li><b>3 minutes</b><span>Place the first room and any starting NPC cards.</span></li>
      <li><b>3 minutes</b><span>Read the opening card and begin playing.</span></li></ol>
      <p>No monster-book searching. No character creation requirement. No encounter spreadsheet. No stack of disconnected notes.</p>
    </section>
    <section class="collection-story">
      <div><small>YOUR COLLECTION BECOMES YOUR CAMPAIGN</small><h2>Buy a deck. Break it apart. Build something new.</h2>
      <p>A monster from one adventure can guard a treasure from another. An inn can become a recurring location. A favorite hero can scan into the next game. Your collection grows into a reusable toolbox instead of a shelf of adventures played only once.</p></div>
      <div class="recipe"><span>ROOM</span><b>+</b><span>MONSTER ×2</span><b>+</b><span>TRAP</span><b>+</b><span>TREASURE</span><strong>ROOM COMPLETE</strong></div>
    </section>
    <section class="homebrew" id="homebrew">
      <div class="homebrew-copy"><small>THE PREMIUM CREATOR STUDIO</small><h2>Make your own cards. Make your own quest.</h2>
      <p>Use the same templates as official Dungeon Cards products to create balanced, beautiful cards for your own world.</p>
      <ul><li>Create characters, monsters, NPCs, traps, rooms, quests, spells, and items.</li>
      <li>Build a guided quest path or freely assemble an adventure from decks you own.</li>
      <li>Generate a unique QR code that loads your homebrew card into the game.</li>
      <li>Export print-ready sheets or order physical cards for your table.</li></ul></div>
      <div class="creator-preview"><small>HOMEBREW CARD CREATOR</small><label>Card type <span>Monster</span></label><label>Name <span>Candlefang</span></label><label>Player face <span>Illustrated card</span></label><label>DM side <span>Stats · actions · tactics</span></label><button disabled>Generate card + QR</button></div>
    </section>
    <section class="formats">
      <header><small>PLAY YOUR WAY</small><h2>One product. Three formats.</h2></header>
      <div><article><b>Digital</b><p>Instant access, clickable rolls, sounds, effects, shared play, and automatic tracking.</p></article>
      <article><b>Print at home</b><p>Download accurate playing-card sheets with duplex and single-sided options.</p></article>
      <article><b>Physical deck</b><p>Premium illustrated cards with QR codes that unlock their digital counterparts.</p></article></div>
    </section>
    <section class="final-cta">
      <small>LESS PREP · MORE PLAY · A DECK THAT KEEPS GROWING</small>
      <h2>Build tonight's dungeon one card at a time.</h2>
      <p>Start with a complete guided one-shot or bring your own collection to the table.</p>
      <div><button data-action="choose-login" data-id="dm">Start a DM table</button>
      <button class="secondary" data-action="choose-login" data-id="player">Join a game</button></div>
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
