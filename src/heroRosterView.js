const heroes = [
  {
    name: "Mara Ironjaw",
    role: "BARBARIAN · BERSERKER",
    art: "assets/heroes/mara-ironjaw.webp"
  },
  {
    name: "Lyra Silverstring",
    role: "BARD · COLLEGE OF LORE",
    art: "assets/heroes/lyra-silverstring.webp"
  },
  {
    name: "Bromli Dawnshield",
    role: "CLERIC · LIFE DOMAIN",
    art: "assets/heroes/bromli-dawnshield.webp"
  },
  {
    name: "Kara Stoneguard",
    role: "FIGHTER · CHAMPION",
    art: "assets/heroes/kara-stoneguard.webp"
  },
  {
    name: "Seraphina Valebright",
    role: "PALADIN · OATH OF DEVOTION",
    art: "assets/heroes/seraphina-valebright.webp"
  },
  {
    name: "Eirwen Greenarrow",
    role: "RANGER · HUNTER",
    art: "assets/heroes/eirwen-greenarrow.webp"
  },
  {
    name: "Mira Quickstep",
    role: "ROGUE · THIEF",
    art: "assets/heroes/mira-quickstep.webp"
  },
  {
    name: "Aelar Ashquill",
    role: "WIZARD · EVOCATION",
    art: "assets/heroes/aelar-ashquill.webp"
  }
];

const escape = value => String(value).replace(/[&<>"']/g, character =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[character]
);

export const heroRosterView = () => `
  <section class="hero-roster">
    <header>
      <small>THE CORE HERO COLLECTION</small>
      <h2>Choose the card that makes you want to play.</h2>
      <p>Eight iconic classes now have a premium illustrated hero covering every level from 1 through 20. Claim one, equip the card, and begin adventuring.</p>
      <div><span><b>8</b> illustrated heroes</span><span><b>160</b> playable level cards</span><span><b>0</b> character-sheet prep</span></div>
    </header>
    <div class="hero-roster__grid">
      ${heroes.map(hero => `
        <article>
          <img src="${escape(hero.art)}" alt="${escape(hero.name)}, ${escape(hero.role.toLowerCase())}" loading="lazy">
          <footer><small>${escape(hero.role)}</small><h3>${escape(hero.name)}</h3><span>LEVELS 1–20 · CLAIM &amp; PLAY</span></footer>
        </article>
      `).join("")}
    </div>
  </section>`;
