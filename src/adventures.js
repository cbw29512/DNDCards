export const adventures = [{
  id: "wishing-cake",
  title: "The Wishing Cake",
  subtitle: "A cozy birthday mystery for level 3 heroes",
  badge: "Featured starter one-shot",
  estimatedTime: "3–4 hours",
  roomIds: ["square", "inn", "chapel", "shop"],
  description: "Follow a trail of forgotten wishes through a birthday city and restore the final candle.",
  finale: "The wish is restored. Award the Wishkeeper Charm and invite every player to describe one final birthday wish."
}];

export const findAdventure = id => adventures.find(adventure => adventure.id === id);
