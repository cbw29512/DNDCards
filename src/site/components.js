export const badge = (text, tone = "") => `<span class="hub-badge ${tone}">${text}</span>`;

export const siteHeader = () => `
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="hub-header">
    <a class="hub-brand" href="#/home" aria-label="Tabletop Roleplaying Game Guide home">
      <span aria-hidden="true">TTRPG</span>
      <strong>Find Your Table</strong>
    </a>
    <nav aria-label="Primary navigation">
      <a href="#/systems">Systems</a>
      <a href="#/community">Find a table</a>
      <a href="#/blog">Blog</a>
      <a href="#/legal">Licensing</a>
      <button data-action="choose-login" data-id="dm">Dungeon Cards</button>
    </nav>
  </header>`;

export const siteFooter = () => `
  <footer class="hub-footer">
    <div><strong>Find Your Table</strong><p>Independent system education, safer group discovery, and the Dungeon Cards play platform.</p></div>
    <nav aria-label="Footer navigation"><a href="#/systems">Systems</a><a href="#/community">Community</a><a href="#/legal">Licensing</a></nav>
    <p>All game names and trademarks belong to their respective owners. No endorsement is implied.</p>
  </footer>`;

const loginDialog = () => `<dialog id="login-dialog" class="login-dialog">
  <button class="dialog-close" data-action="close-login" aria-label="Close">×</button>
  <form id="login-form"><small id="login-eyebrow">ENTER THE TABLE</small><h2 id="login-title">Dungeon Master login</h2>
    <p id="login-help">Open your private adventure-building table.</p><input type="hidden" name="role" id="login-role" value="dm">
    <label>Display name<input required maxlength="30" name="name" placeholder="Your name"></label>
    <label id="code-field" hidden>Table code<input maxlength="12" name="code" placeholder="HEARTH"></label>
    <button type="submit" id="login-submit">Open DM table</button>
    <p class="login-note">This prototype stores the table on this device. Secure accounts and synchronized tables are a later milestone.</p>
  </form></dialog>`;

export const pageShell = content => `${siteHeader()}<main id="main-content" class="hub-main">${content}</main>${siteFooter()}${loginDialog()}`;

export const sourceLinks = sources => `
  <ul class="source-list">${sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> opens in a new tab</span></a></li>`).join("")}</ul>`;

export const sectionCards = sections => `
  <div class="guide-grid">${sections.map(([title, bullets], index) => `
    <article class="guide-card"><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3>
      <ul>${bullets.map(item => `<li>${item}</li>`).join("")}</ul>
    </article>`).join("")}</div>`;

export const systemCard = system => `
  <article class="system-card system-card--${system.licenseTone}">
    <div>${badge(system.licenseStatus, system.licenseTone)}</div>
    <p class="eyebrow">${system.kicker}</p><h3>${system.shortName}</h3>
    <p>${system.summary}</p><p><strong>Good fit:</strong> ${system.audience}</p>
    <a class="card-link" href="#/system/${system.id}">Learn this system <span aria-hidden="true">→</span></a>
  </article>`;