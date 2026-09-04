import { characters } from "./data.js?v=rules-ui-audit-1";
import { heroRoster } from "./heroRosterData.js?v=rules-ui-audit-1";

const escape = value => String(value).replace(/[&<>"']/g, character =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[character]
);

const starterCardId = name => {
  const card = characters.find(candidate => candidate.title === `${name} · Level 3`);
  if (!card) throw new Error(`Level 3 starter pack is missing for ${name}.`);
  return card.id;
};

export const heroRosterView = () => `
  <section class="hero-roster">
    <header>
      <small>THE LEVEL 3 STARTER HERO COLLECTION</small>
      <h2>Choose the card that makes you want to play.</h2>
      <p>Every core class is ready at level 3 in both 2014 and 2024 rules, with a portrait front and a complete accordion back: statistics, attacks, resources, equipment, features, and separate spell cards. Select any hero to open the playable pack.</p>
      <div><span><b>24</b> level 3 starter packs</span><span><b>12</b> core classes</span><span><b>0</b> character-sheet prep</span></div>
    </header>
    <div class="hero-roster__grid">
      ${heroRoster.map(hero => {
        const cardId = starterCardId(hero.name);
        return `
        <article role="button" tabindex="0" data-action="open-pregen-pack" data-id="${escape(cardId)}"
          aria-label="Open ${escape(hero.name)} Level 3 hero pack">
          <img src="${escape(hero.art)}" alt="${escape(hero.name)}, ${escape(hero.role.toLowerCase())}" loading="lazy">
          <footer><small>${escape(hero.role)}</small><h3>${escape(hero.name)}</h3><span>LEVEL 3 · OPEN HERO PACK</span></footer>
        </article>`;
      }).join("")}
    </div>
  </section>`;
