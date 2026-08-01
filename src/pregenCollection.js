import { levelThreePregens } from "./levelThreePregens.js?v=level-3-pregens-1";

const portraits = new Map([
  ["Mara Ironjaw", "mara-ironjaw"],
  ["Lyra Silverstring", "lyra-silverstring"],
  ["Bromli Dawnshield", "bromli-dawnshield"],
  ["Kara Stoneguard", "kara-stoneguard"],
  ["Seraphina Valebright", "seraphina-valebright"],
  ["Eirwen Greenarrow", "eirwen-greenarrow"],
  ["Mira Quickstep", "mira-quickstep"],
  ["Aelar Ashquill", "aelar-ashquill"],
  ["Torra Ashfang", "torra-ashfang"],
  ["Mara Brightquill", "mara-brightquill"],
  ["Thora Brightmantle", "thora-brightmantle"],
  ["Rowan Ironmark", "rowan-ironmark"],
  ["Cassian Brightward", "cassian-brightward"],
  ["Arden Wildmark", "arden-wildmark"],
  ["Tamsin Lockmere", "tamsin-lockmere"],
  ["Nora Brightscript", "nora-brightscript"]
]);
const startersById = new Map(levelThreePregens.map(card => [card.id, card]));

export const enhancePregen = card => {
  const starter = startersById.get(card.id);
  if (starter) return starter;
  const name = String(card.title || "").split(" · Level ")[0];
  const stem = portraits.get(name);
  return stem ? { ...card, art: `assets/heroes/${stem}.webp` } : card;
};

export { levelThreePregens };
