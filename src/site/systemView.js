import { pageShell, badge, sectionCards, sourceLinks } from "./components.js";

const legalList = (title, items) => `<section><h3>${title}</h3><ul>${items.map(item => `<li>${item}</li>`).join("")}</ul></section>`;

export const systemsIndexView = systems => pageShell(`
  <section class="page-hero"><p class="eyebrow">System library</p><h1>Choose how you want the table to feel.</h1>
    <p>D&D offers familiar heroic fantasy. Pathfinder emphasizes tactical depth. Daggerheart emphasizes collaboration. Call of Cthulhu and Vampire emphasize very different forms of horror.</p></section>
  <section class="hub-section"><div class="system-grid">${systems.map(system => `
    <article class="system-card system-card--${system.licenseTone}">${badge(system.licenseStatus, system.licenseTone)}
      <p class="eyebrow">${system.kicker}</p><h2>${system.shortName}</h2><p>${system.summary}</p>
      <p><strong>Good fit:</strong> ${system.audience}</p><a class="card-link" href="#/system/${system.id}">Open the complete guide →</a>
    </article>`).join("")}</div></section>`);

export const systemGuideView = system => pageShell(`
  <article class="system-guide">
    <header class="page-hero system-title"><div>${badge(system.licenseStatus, system.licenseTone)}
      <p class="eyebrow">${system.kicker}</p><h1>${system.name}</h1><p>${system.summary}</p></div>
      <aside><strong>IS THIS YOUR GAME?</strong><p>${system.audience}</p></aside>
    </header>
    <nav class="guide-tabs" aria-label="Guide sections"><a href="#/system/${system.id}?section=player-guide">Player fundamentals</a><a href="#/system/${system.id}?section=gm-guide">So you want to GM?</a><a href="#/system/${system.id}?section=license-guide">Licensing</a></nav>
    <section id="player-guide" class="hub-section guide-section"><div class="section-heading"><p class="eyebrow">Player path</p><h2>Learn enough to play your first session.</h2></div>${sectionCards(system.player)}</section>
    <section id="gm-guide" class="hub-section guide-section gm-section"><div class="section-heading"><p class="eyebrow">Game Master path</p><h2>So you want to GM ${system.shortName}?</h2><p>Prepare situations, adjudicate clearly, protect the table, and learn the system’s actual strengths instead of forcing another game’s habits onto it.</p></div>${sectionCards(system.gm)}</section>
    <section id="license-guide" class="hub-section license-panel"><div class="section-heading"><p class="eyebrow">Copyright and licensing boundary</p><h2>Use the rules without borrowing the brand.</h2><p>${system.legal.basis}</p></div>
      <div class="legal-grid">${legalList("Safer uses", system.legal.safe)}${legalList("Do not copy", system.legal.avoid)}</div>
      <details><summary>Attribution or disclaimer</summary><p>${system.legal.attribution}</p></details>
      <h3>Official sources</h3>${sourceLinks(system.sources)}
      <p class="legal-note">This is a practical publishing checklist, not legal advice. Review the controlling license before releasing or monetizing a product.</p>
    </section>
  </article>`);