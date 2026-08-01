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
  },
  {
    name: "Torra Ashfang",
    role: "2024 BARBARIAN · BERSERKER",
    art: "assets/heroes/torra-ashfang.webp"
  },
  {
    name: "Mara Brightquill",
    role: "2024 BARD · COLLEGE OF LORE",
    art: "assets/heroes/mara-brightquill.webp"
  },
  {
    name: "Thora Brightmantle",
    role: "2024 CLERIC · LIFE DOMAIN",
    art: "assets/heroes/thora-brightmantle.webp"
  },
  {
    name: "Rowan Ironmark",
    role: "2024 FIGHTER · CHAMPION",
    art: "assets/heroes/rowan-ironmark.webp"
  },
  {
    name: "Cassian Brightward",
    role: "2024 PALADIN · OATH OF DEVOTION",
    art: "assets/heroes/cassian-brightward.webp"
  },
  {
    name: "Arden Wildmark",
    role: "2024 RANGER · HUNTER",
    art: "assets/heroes/arden-wildmark.webp"
  },
  {
    name: "Tamsin Lockmere",
    role: "2024 ROGUE · THIEF",
    art: "assets/heroes/tamsin-lockmere.webp"
  },
  {
    name: "Nora Brightscript",
    role: "2024 WIZARD · EVOKER",
    art: "assets/heroes/nora-brightscript.webp"
  }
];

const escape = value => String(value).replace(/[&<>"']/g, character =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" })[character]
);

export const heroRosterView = () => `
  <section class="hero-roster">
    <header>
      <small>THE LEVEL 3 STARTER HERO COLLECTION</small>
      <h2>Choose the card that makes you want to play.</h2>
      <p>Sixteen illustrated heroes are ready at level 3 with complete accordion packs: character statistics, attacks, resources, equipment, features, and separate spell cards. Their full level 1–20 ladders remain available.</p>
      <div><span><b>16</b> level 3 starter packs</span><span><b>320</b> illustrated level cards</span><span><b>0</b> character-sheet prep</span></div>
    </header>
    <div class="hero-roster__grid">
      ${heroes.map(hero => `
        <article>
          <img src="${escape(hero.art)}" alt="${escape(hero.name)}, ${escape(hero.role.toLowerCase())}" loading="lazy">
          <footer><small>${escape(hero.role)}</small><h3>${escape(hero.name)}</h3><span>LEVEL 3 READY · LEVELS 1–20</span></footer>
        </article>
      `).join("")}
    </div>
  </section>`;
