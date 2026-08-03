import { pageShell } from "./components.js";

export const legalView = systems => pageShell(`
  <section class="page-hero"><p class="eyebrow">Licensing center</p><h1>Every system gets its own legal boundary.</h1>
    <p>Open rules do not automatically include trademarks, settings, characters, artwork, logos, maps, trade dress, or every rulebook.</p></section>
  <section class="hub-section legal-principles"><article><h2>Editorial rules</h2><ol>
    <li>Write explanations in original language.</li><li>Copy only material expressly covered by a license.</li><li>Attribute every licensed source exactly as required.</li>
    <li>Keep system-specific licensed material in separate, labeled sections.</li><li>Use original art and a distinct visual identity.</li><li>Recheck policies before monetization or release.</li>
  </ol></article><article><h2>Content records</h2><p>Every guide should record the rules version, source document, license version, attribution, last review date, and whether the page is open-content based or commentary only.</p></article></section>
  <section class="hub-section license-table-wrap"><table class="license-table"><caption>Current publishing approach</caption><thead><tr><th>System</th><th>Rules path</th><th>Website treatment</th></tr></thead>
    <tbody>${systems.map(system => `<tr><th>${system.shortName}</th><td>${system.licenseStatus}</td><td>${system.legal.basis}</td></tr>`).join("")}</tbody></table></section>
  <section class="hub-section legal-warning"><h2>Before selling a card pack</h2><p>Run a release audit against the exact text, art, names, logos, metadata, advertising copy, and distribution channel. A rules license and a trademark license solve different problems.</p>
    <a class="primary-action" href="https://github.com/cbw29512/DNDCards/blob/main/THIRD_PARTY_LICENSES.md" target="_blank" rel="noopener noreferrer">Open the repository license register</a></section>`);