export const rooms = [
  { id: "square", number: 1, title: "Hearthglow Square" },
  { id: "inn", number: 2, title: "The Heartbreak Inn" },
  { id: "chapel", number: 3, title: "Chapel of Shared Wishes" },
  { id: "shop", number: 4, title: "Candlewick Curios" }
];

const card = (id, kind, title, room, playerText, dmText, stats = [], combat = {}) =>
  ({ id, kind, title, room, playerText, dmText, stats, ...combat });

export const cards = [
  card("room-square", "room", "Hearthglow Square", "square",
    "Lanterns glow like captured stars while birthday ribbons dance above the cobbles.",
    "Welcome the party and reveal Wendy's invitation."),
  card("npc-wendy", "npc", "Wendy, Keeper of the Wish", "square",
    "Wendy holds an unlit candle and smiles as though she has been waiting for you.",
    "Keep Wendy central. She knows kindness—not force—restores the final wish."),
  card("monster-gremlin", "monster", "Jam Gremlin", "inn",
    "A jam-smeared creature springs from the pantry with a spoon held like a sword.",
    "Two gremlins act as one initiative group.", ["♥ 18", "🛡 13", "⚔ Spoon +4 · 1d6+2"], {
      initiative: 2, abilities: [8,15,12,10,11,14],
      actions: [
        { id:"spoon", label:"Spoon Swipe", icon:"⚔", kind:"attack", roll:"1d20+4", damage:"1d6+2", range:"5 ft.", cost:"Action" },
        { id:"splat", label:"Berry Splat", icon:"➶", kind:"effect", damage:"2d6", save:{ ability:"Dexterity", dc:12 }, range:"30 ft.", effect:"Speed −10 ft. until next turn.", cost:"Action" }
      ]
    }),
  card("trap-candles", "trap", "Candle-Snuffer Trap", "chapel",
    "A cold breath circles the candles. Their flames bend toward the dark.",
    "DC 13 Perception. A birthday memory spoken aloud disarms it.", ["DC 13", "Effect: lights extinguish"], {
      actions: [{ id:"snuff", label:"Trigger Trap", icon:"⬡", kind:"effect", damage:"1d6", save:{ ability:"Dexterity", dc:13 }, range:"Room", effect:"Lights extinguish.", cost:"Free/interact" }]
    }),
  card("treasure-charm", "treasure", "Wishkeeper Charm", "chapel",
    "A tiny golden cake charm warms in your palm.",
    "A player may reroll one failed saving throw.", ["1 use", "Tradeable"]),
  card("clue-toast", "clue", "The Forgotten Toast", "inn",
    "Scratched beneath the table: “A wish shared freely returns twice.”",
    "This is a required endgame clue. Reveal it before the finale."),
  card("room-inn", "room", "The Heartbreak Inn", "inn",
    "Music falters inside a warm inn decorated for a birthday nobody remembers.",
    "Roll one cozy event whenever the party visits."),
  card("room-chapel", "room", "Chapel of Shared Wishes", "chapel",
    "Hundreds of candles wait in silence beneath a ceiling painted with constellations.",
    "The trap protects the charm; compassion bypasses it."),
  card("room-shop", "room", "Candlewick Curios", "shop",
    "Shelves lean beneath wrapped parcels, singing kettles, and bottles of bottled laughter.",
    "Offer the charm clue if the party missed it.")
];

export const characters = [
  card("pc-wendy", "character", "Wendy the Wishkeeper", null,
    "A warm-hearted hero who protects every shared wish.", "", ["♥ 32", "🛡 15", "Initiative +3"], {
      initiative:3, abilities:[10,16,14,12,14,16],
      actions:[
        { id:"staff", label:"Candle Staff", icon:"⚔", kind:"attack", roll:"1d20+5", damage:"1d6+3", range:"5 ft.", cost:"Action" },
        { id:"wis-save", label:"Wisdom Save", icon:"◈", kind:"save", roll:"1d20+4", effect:"Wisdom saving throw." }
      ]
    }),
  card("pc-bob", "character", "Bob the Brave", null,
    "A cheerful barbarian who treats every challenge like a party game.", "", ["♥ 44", "🛡 14", "Initiative +2"], {
      initiative:2, abilities:[17,14,16,8,12,10],
      actions:[
        { id:"axe", label:"Greataxe", icon:"⚔", kind:"attack", roll:"1d20+5", damage:"1d12+3", range:"5 ft.", cost:"Action" },
        { id:"str-save", label:"Strength Save", icon:"◈", kind:"save", roll:"1d20+5", effect:"Strength saving throw." }
      ]
    }),
  card("pc-lumi", "character", "Lumi Candlelight", null,
    "A quick-witted mage whose sparks smell faintly of vanilla.", "", ["♥ 26", "🛡 13", "Initiative +4"], {
      initiative:4, abilities:[8,18,12,16,13,10],
      actions:[
        { id:"spark", label:"Vanilla Spark", icon:"✦", kind:"attack", roll:"1d20+5", damage:"1d10", range:"120 ft.", cost:"Action" },
        { id:"burst", label:"Candle Burst", icon:"✦", kind:"effect", damage:"2d6", save:{ ability:"Dexterity", dc:13 }, range:"15-ft. cone", effect:"Half damage on success.", cost:"Action" }
      ]
    })
];

export const events = Array.from({ length: 10 }, (_, index) =>
  card(`event-${index + 1}`, "event", [
    "The Forgotten Face", "Jam for Gremlins", "An Unremembered Toast",
    "The Portrait Moth", "Someone Who Remembers", "A Voice in the Fire",
    "The Cake-Hungry Hat", "The Doors Lock", "The Forbidden Tunnel",
    "The Truth Bell Cracks"
  ][index], "inn", "A birthday mystery unfolds in the inn.",
  `Event ${index + 1}: offer a cozy clue or gentle complication.`));

export const allCards = [...cards, ...characters, ...events];
