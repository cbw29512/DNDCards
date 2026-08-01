import { levelThreePregens } from "./levelThreePregens.js?v=all-core-classes-1";
import { heroRoster } from "./heroRosterData.js?v=all-core-classes-1";

const portraits = new Map(heroRoster.map(hero => [hero.name, hero.stem]));
const startersById = new Map(levelThreePregens.map(card => [card.id, card]));

export const enhancePregen = card => {
  const starter = startersById.get(card.id);
  if (starter) return starter;
  const name = String(card.title || "").split(" · Level ")[0];
  const stem = portraits.get(name);
  return stem ? { ...card, art: `assets/heroes/${stem}.webp` } : card;
};

export { levelThreePregens };
