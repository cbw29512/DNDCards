export const adventures = [{
  id: "first-chime-hearthglow",
  title: "The First Chime of Hearthglow",
  subtitle: "A cozy birthday mystery for level 3 heroes",
  badge: "Featured starter one-shot",
  estimatedTime: "3–4 hours",
  roomIds: ["lanternhome", "heartbreak-inn", "last-lantern", "copper-kettle", "moon-mortar", "bellfoundry"],
  description: "Follow a trail of stolen memories through a birthday city and help a lonely magical bell remember why joy and grief belong together.",
  finale: "The stolen voices return. Award the Pocket Chime, then invite every player to share one memory their hero chooses to keep."
}];

export const findAdventure = id => adventures.find(adventure => adventure.id === id);
