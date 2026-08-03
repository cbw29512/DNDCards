import { pageShell, badge } from "./components.js";
import { communitySchema, trustLevels, sampleListings } from "./communityData.js";

const filterLink = (filters, key, value, label) => {
  const next = { ...filters, [key]:value };
  const active = filters[key] === value ? " aria-current=\"true\"" : "";
  return `<a href="#/community?system=${next.system}&role=${next.role}"${active}>${label}</a>`;
};

export const communityView = filters => {
  const visible = sampleListings.filter(item =>
    (filters.system === "all" || item.system === filters.system) &&
    (filters.role === "all" || item.role === filters.role));
  return pageShell(`
    <section class="page-hero community-hero"><div><p class="eyebrow">Find your people</p><h1>A meetup-style table finder built around trust.</h1>
      <p>Search by system, role, schedule, format, age band, accessibility, and experience. Contact information stays private until both sides agree.</p></div>
      <aside>${badge("Prototype", "caution")}<p>The discovery interface and moderation model are designed. Real accounts, identity checks, messaging, and reports require the secure backend milestone.</p></aside></section>
    <section class="hub-section finder-layout"><aside class="finder-filters" aria-label="Filter game listings">
      <h2>Find a table</h2><h3>System</h3><nav>${filterLink(filters,"system","all","All")}${filterLink(filters,"system","dnd-2024","D&D 2024")}${filterLink(filters,"system","pathfinder-2e","Pathfinder")}${filterLink(filters,"system","call-of-cthulhu-7e","Cthulhu")}${filterLink(filters,"system","daggerheart","Daggerheart")}${filterLink(filters,"system","vampire-v5","Vampire")}</nav>
      <h3>Listing</h3><nav>${filterLink(filters,"role","all","All")}${filterLink(filters,"role","player","Seeking players")}${filterLink(filters,"role","gm","Seeking GM")}</nav>
      <p>${visible.length} example listing${visible.length === 1 ? "" : "s"}</p></aside>
      <div class="listing-stack">${visible.length ? visible.map(item => `<article class="game-listing"><div><p class="eyebrow">${item.format} · ${item.region}</p><h2>${item.title}</h2><p>Hosted by <strong>${item.host}</strong></p></div>
        <dl><div><dt>Schedule</dt><dd>${item.schedule}</dd></div><div><dt>Availability</dt><dd>${item.seats}</dd></div></dl>
        <div class="tag-row">${item.badges.map(value => `<span>${value}</span>`).join("")}</div><button disabled title="Secure accounts are required before contact requests can open.">Request to join — backend required</button></article>`).join("") : `<p class="empty-state">No example listings match those filters.</p>`}</div>
    </section>
    <section class="hub-section trust-section"><div class="section-heading"><p class="eyebrow">Vetting ladder</p><h2>Trust is earned in visible steps.</h2></div>
      <div class="trust-grid">${trustLevels.map(([name, detail], index) => `<article><span>${index + 1}</span><h3>${name}</h3><p>${detail}</p></article>`).join("")}</div>
    </section>
    <section class="hub-section safety-grid"><article><h2>Data schema</h2>${Object.entries(communitySchema).map(([key, values]) => `<h3>${key}</h3><p>${values.join(" · ")}</p>`).join("")}</article>
      <article><h2>Required safeguards</h2><ul><li>No public phone numbers, email addresses, or precise home addresses.</li><li>Block, report, moderation history, and evidence retention.</li><li>Guardian or organization-managed flow for minors.</li><li>Clear age bands, content notes, accessibility fields, and session-zero expectations.</li><li>No “verified” badge without a documented check and expiration policy.</li></ul></article></section>`);
};