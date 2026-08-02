import { importedCatalog } from "./importedCatalog.js?v=rules-ui-audit-1";
import { wildShapeCatalog } from "./wildShapeCatalog.js";
import { enhancePregen } from "./pregenCollection.js?v=rules-ui-audit-1";
import { hearthglowCards, hearthglowEvents, hearthglowRooms } from "./hearthglowAdventure.js";

export const rooms = hearthglowRooms;
export const cards = hearthglowCards.filter(card => card.kind !== "event");
export const events = hearthglowEvents;

const card = (id, kind, title, room, playerText, dmText, stats = [], combat = {}) =>
  ({ id, kind, title, room, playerText, dmText, quickStats:stats, ...combat });

const baseCharacters = [
  card("pc-wendy", "character", "Wendy the Wishkeeper", null,
    "A warm-hearted hero who protects every shared wish.", "", ["♥ 32", "🛡 15", "Initiative +3"], {
      initiative:3, proficiencyBonus:2, speed:30, baseArmorClass:15, abilities:[10,16,14,12,14,16],
      actions:[
        { id:"staff", label:"Candle Staff", icon:"⚔", kind:"attack", roll:"1d20+5", damage:"1d6+3", range:"5 ft.", cost:"Action" },
        { id:"wis-save", label:"Wisdom Save", icon:"◈", kind:"save", roll:"1d20+4", effect:"Wisdom saving throw." }
      ]
    }),
  card("pc-bob", "character", "Bob the Brave", null,
    "A cheerful barbarian who treats every challenge like a party game.", "", ["♥ 44", "🛡 14", "Initiative +2"], {
      initiative:2, proficiencyBonus:2, speed:30, baseArmorClass:14, abilities:[17,14,16,8,12,10],
      actions:[
        { id:"axe", label:"Greataxe", icon:"⚔", kind:"attack", roll:"1d20+5", damage:"1d12+3", range:"5 ft.", cost:"Action" },
        { id:"str-save", label:"Strength Save", icon:"◈", kind:"save", roll:"1d20+5", effect:"Strength saving throw." }
      ]
    }),
  card("pc-lumi", "character", "Lumi Candlelight", null,
    "A quick-witted mage whose sparks smell faintly of vanilla.", "", ["♥ 26", "🛡 13", "Initiative +4"], {
      initiative:4, proficiencyBonus:2, speed:30, baseArmorClass:13, abilities:[8,18,12,16,13,10],
      actions:[
        { id:"spark", label:"Vanilla Spark", icon:"✦", kind:"attack", roll:"1d20+5", damage:"1d10", range:"120 ft.", cost:"Action" },
        { id:"burst", label:"Candle Burst", icon:"✦", kind:"effect", damage:"2d6", save:{ ability:"Dexterity", dc:13 }, range:"15-ft. cone", effect:"Half damage on success.", cost:"Action" }
      ]
    })
];

const importedCharacters = importedCatalog
  .filter(card => card.kind === "character")
  .map(enhancePregen);
export const characters = [...baseCharacters, ...importedCharacters];

export const allCards = [
  ...cards,
  ...characters,
  ...events,
  ...wildShapeCatalog,
  ...importedCatalog.filter(card => card.kind !== "character")
];
