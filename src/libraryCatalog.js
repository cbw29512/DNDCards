import { wildShapeCatalog } from "./wildShapeCatalog.js";
import { importedCatalog } from "./importedCatalog.js?v=rules-ui-audit-1";
import { enhancePregen } from "./pregenCollection.js?v=rules-ui-audit-1";
import { hearthglowCards } from "./hearthglowAdventure.js";

const c = (id, kind, title, roomNumber, badge, playerText, dmText = "", quickStats = []) => ({
  id, kind, title, roomNumber, badge, playerText, dmText, quickStats,
  source: "The First Chime of Hearthglow"
});

export const rawLibraryCatalog = [
  c("REF-001","reference","Symbol Key",null,"Included in every pack","Explains health, armor, speed, melee, ranged, spell, DC, roll, recharge, reaction, short-rest, and long-rest symbols."),
  ...hearthglowCards,
  c("PC-001","character","Bob Bramble",null,"Human Barbarian 3","Front-line protector who fears forgotten promises more than monsters.","",["🛡 14","♥ 35","Initiative +2"]),
  c("PC-002","character","Wren Vale",null,"Halfling Bard 3","Support and social problem solver who knows the hymn's first two verses.","",["🛡 14","♥ 24","Initiative +3"]),
  c("PC-003","character","Pip Thimble",null,"Gnome Rogue 3","A sharp-eyed courier who saw Mira trying not to cry.","",["🛡 15","♥ 24","Initiative +4"]),
  c("PC-004","character","Marigold Ash",null,"Dwarf Cleric 3","A healer who believes grief is proof that love existed.","",["🛡 17","♥ 30","Initiative +0"]),
  c("ITEM-002","treasure","Hearthglow Festival Lantern",null,"Common","Glows when someone sincerely says another creature's name."),
  c("ITEM-004","treasure","Bellfounder's Apron",null,"Uncommon","Advantage with smith's tools and resistance to environmental thunder damage."),
  ...wildShapeCatalog,
  ...importedCatalog.map(card => card.kind === "character" ? enhancePregen(card) : card)
];
