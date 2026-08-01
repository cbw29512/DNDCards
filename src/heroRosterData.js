const hero = (name, role, stem) => ({
  name, role, stem, art: `assets/heroes/${stem}.webp`
});

export const heroRoster = [
  hero("Mara Ironjaw", "2014 BARBARIAN · BERSERKER", "mara-ironjaw"),
  hero("Torra Ashfang", "2024 BARBARIAN · BERSERKER", "torra-ashfang"),
  hero("Lyra Silverstring", "2014 BARD · COLLEGE OF LORE", "lyra-silverstring"),
  hero("Mara Brightquill", "2024 BARD · COLLEGE OF LORE", "mara-brightquill"),
  hero("Bromli Dawnshield", "2014 CLERIC · LIFE DOMAIN", "bromli-dawnshield"),
  hero("Thora Brightmantle", "2024 CLERIC · LIFE DOMAIN", "thora-brightmantle"),
  hero("Elowen Mossvale", "2014 DRUID · CIRCLE OF THE LAND", "elowen-mossvale"),
  hero("Sable Fernwhisper", "2024 DRUID · CIRCLE OF THE LAND", "sable-fernwhisper"),
  hero("Kara Stoneguard", "2014 FIGHTER · CHAMPION", "kara-stoneguard"),
  hero("Rowan Ironmark", "2024 FIGHTER · CHAMPION", "rowan-ironmark"),
  hero("Kael Riverstep", "2014 MONK · WAY OF THE OPEN HAND", "kael-riverstep"),
  hero("Juno Swiftwater", "2024 MONK · WARRIOR OF THE OPEN HAND", "juno-swiftwater"),
  hero("Seraphina Valebright", "2014 PALADIN · OATH OF DEVOTION", "seraphina-valebright"),
  hero("Cassian Brightward", "2024 PALADIN · OATH OF DEVOTION", "cassian-brightward"),
  hero("Eirwen Greenarrow", "2014 RANGER · HUNTER", "eirwen-greenarrow"),
  hero("Arden Wildmark", "2024 RANGER · HUNTER", "arden-wildmark"),
  hero("Mira Quickstep", "2014 ROGUE · THIEF", "mira-quickstep"),
  hero("Tamsin Lockmere", "2024 ROGUE · THIEF", "tamsin-lockmere"),
  hero("Veyra Emberborn", "2014 SORCERER · DRACONIC BLOODLINE", "veyra-emberborn"),
  hero("Orryn Scaleheart", "2024 SORCERER · DRACONIC SORCERY", "orryn-scaleheart"),
  hero("Nyx Cinderveil", "2014 WARLOCK · THE FIEND", "nyx-cinderveil"),
  hero("Vale Nightglass", "2024 WARLOCK · FIEND PATRON", "vale-nightglass"),
  hero("Aelar Ashquill", "2014 WIZARD · SCHOOL OF EVOCATION", "aelar-ashquill"),
  hero("Nora Brightscript", "2024 WIZARD · EVOKER", "nora-brightscript")
];
