import { systems, comingSoon } from "./catalog.js";
import { pageShell, systemCard } from "./components.js";

export const homeView = () => pageShell(`
  <section class="hub-hero">
    <div class="hero-copy"><p class="eyebrow">A clear first step into tabletop roleplaying</p>
      <h1>So you want to play a <em>tabletop roleplaying game?</em></h1>
      <p>Choose the experience you want, learn the fundamentals, prepare your first character or first session, and find people who want the same kind of game.</p>
      <div class="hero-actions"><a class="primary-action" href="#/systems">Choose a system</a><a class="secondary-action" href="#/community">Find players and GMs</a></div>
    </div>
    <aside class="hero-checklist" aria-label="How the site helps"><strong>START HERE</strong>
      <ol><li>Choose a style of game.</li><li>Learn the player fundamentals.</li><li>Open the “So You Want to GM?” path.</li><li>Join a vetted table.</li></ol>
    </aside>
  </section>
  <section class="hub-section" aria-labelledby="choose-system"><div class="section-heading">
    <p class="eyebrow">Pick the experience, not the logo</p><h2 id="choose-system">Which system sounds like your table?</h2>
    <p>Every guide separates player rules, GM fundamentals, content creation, official sources, and licensing limits.</p></div>
    <div class="system-grid">${systems.map(systemCard).join("")}</div>
  </section>
  <section class="hub-section split-section"><div><p class="eyebrow">Dungeon Cards</p><h2>Already ready to play?</h2>
    <p>Open the existing card-driven adventure table, browse the reusable card library, or run a guided one-shot.</p>
    <div class="hero-actions"><button class="primary-action" data-action="choose-login" data-id="dm">Open the DM table</button><button class="secondary-action" data-action="open-card-library">Browse cards</button></div></div>
    <div class="feature-stack"><article><b>Build</b><span>Assemble scenes, creatures, hazards, and rewards.</span></article><article><b>Reveal</b><span>Show players only what their characters discover.</span></article><article><b>Play</b><span>Track initiative, resources, rolls, and printable cards.</span></article></div>
  </section>
  <section class="hub-section"><div class="section-heading"><p class="eyebrow">More systems coming</p><h2>Expand only after the license review.</h2></div>
    <div class="coming-grid">${comingSoon.map(([name, summary]) => `<article><h3>${name}</h3><p>${summary}</p><span>Research queue</span></article>`).join("")}</div>
  </section>`);