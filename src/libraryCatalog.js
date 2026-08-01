import { wildShapeCatalog } from "./wildShapeCatalog.js";
import { importedCatalog } from "./importedCatalog.js?v=all-core-classes-1";
import { enhancePregen } from "./pregenCollection.js?v=all-core-classes-1";

const c = (id, kind, title, roomNumber, badge, playerText, dmText = "", quickStats = []) => ({
  id, kind, title, roomNumber, badge, playerText, dmText, quickStats,
  source: "The First Chime of Hearthglow"
});

export const rawLibraryCatalog = [
  c("REF-001","reference","Symbol Key",null,"Included in every pack","Explains health, armor, speed, melee, ranged, spell, DC, roll, recharge, reaction, short-rest, and long-rest symbols."),
  c("LOC-005","room","Lanternhome Square",1,"Room 1","Festival ribbons cross a bright city square, but the First Chime rings backward. A baker drops a tray and asks why everyone is celebrating.","Mira Quill vanished after repairing the bell. Give the party the invitation and make the danger immediate."),
  c("LOC-001","room","Heartbreak Inn",2,"Room 2","Warm firelight, sugared cake, and quiet music fill the inn. A tiny truth bell rings whenever someone says a name they truly remember.","Roll or choose one of ten inn events. Brindle saw Mira carrying silver tools toward the foundry district."),
  c("LOC-002","room","Chapel of the Last Lantern",3,"Room 3","Hundreds of named lanterns hang from the rafters. At the altar, the third line of an old four-line hymn has vanished.","The missing countertone is: “No heart is held by joy alone; we carry grief together.” Progress never requires a roll."),
  c("LOC-003","room","Copper Kettle General Goods",4,"Room 4","Six hundred necessities crowd the narrow shop. A handcart of silver polish waits for a customer nobody remembers.","The order was Mira's. The receipt, cart tracks, or neighboring vendors point to the bellfoundry."),
  c("LOC-004","room","Moon and Mortar Magic Shop",5,"Room 5","Bottled clouds drift between shelves. A note reads: “I thought the bell was lonely. I may have taught it to hunger.”","Reveal that the Warden is an accidental protector. Three sincere memories at the clapper remove Resonant Shell."),
  c("LOC-006","room","Old Bellfoundry",6,"Room 6","The foundry crouches beneath the city wall. Below, stolen voices remember birthdays, farewells, first kisses, apologies, and names.","Reveal the glyph first. The finale supports combat, ritual, negotiation, or a mixed resolution."),
  c("NPC-001","npc","Mayor Tamsin Vale",1,"Quest giver","A worried mayor grips a silver invitation whose guest of honor has disappeared.","She knows Mira repaired the bell and visited the magic shop. She does not know about the Warden."),
  c("NPC-002","npc","Brindle Hearth",2,"Innkeeper","The innkeeper remembers every guest's favorite drink—but not the face of her own sister.","Kindness earns the foundry shortcut. Pressure makes Brindle defensive but never blocks the clue."),
  c("NPC-003","npc","Sister Elowen",3,"Rare NPC","An amber-robed priest repaints fading names as quickly as the letters disappear.","She explains that the bell was made to help people carry grief together, not erase it."),
  c("TRAP-002","trap","Falling Bell-Rope Snare",2,"DC 12 Dexterity","A loop of festival rope drops from the rafters with a sharp wooden snap.","Failure: restrained and 1d6 bludgeoning. Escape DC 12. A cake offering makes the rope loosen.",["Detect DC 12","Save DC 12","Damage 1d6"]),
  c("TRAP-001","trap","Backward Chime Glyph",6,"DC 13 Wisdom","Written labels reverse as a deep bell-note plays backward.","Failure: 2d6 psychic and no reactions until end of next turn. A sincere memory bypasses it.",["Detect DC 13","Save DC 13","Damage 2d6"]),
  c("MON-001","monster","Memory Moth Swarm",4,"CR 1","Pale moths orbit the silver polish, each wing reflecting a half-remembered smile.","Disperses for a freely shared happy memory, bright magical light, or sweet food.",["🛡 12","♥ 24","➜ Fly 40 ft.","⚔ Nibble +4 · 2d4 psychic"]),
  c("MON-002","monster","Bellglass Gremlin",null,"CR 1/2","A silver-eyed gremlin raises a sharpened spoon and protects a sack of stolen keepsakes.","Surrenders for jam, shiny buttons, or a sincere festival invitation.",["🛡 13","♥ 16","⚔ Spoon +5 · 1d6+3","➶ Saucer +5 · 1d4+3"]),
  c("MON-003","monster","Animated Clapper",6,"CR 1","A heavy silver clapper tears free and swings through the air under its own power.","Use Pealing Blow when two or more characters stand together.",["🛡 15","♥ 22","⚔ Strike +4 · 1d8+2","✦ Peal DC 12 · 2d6"]),
  c("BOSS-001","monster","Hollow Chime Warden",6,"Boss · CR 3","A tall figure unfolds from empty sound, its hollow silver chest ringing with other people's laughter.","Never attacks an unconscious hero. At 20 HP it asks why anyone would choose to remember pain.",["🛡 15","♥ 68","⚔ Fist +5 · 1d8+3 + 1d4","✦ Burst DC 13 · 3d6"]),
  c("CLUE-001","clue","Mira's Repair Notes",5,"Finale clue","The spell was told to “fill every hollow place with joy.”","The Warden followed the instruction literally."),
  c("CLUE-003","clue","The Missing Third Verse",3,"Required clue","No heart is held by joy alone; we carry grief together.","Speaking this sincerely enables the countertone."),
  c("CLUE-004","clue","Foundry Service Receipt",4,"Route clue","Silver repair supplies were ordered for the abandoned bellfoundry.","This is a direct route to Room 6."),
  c("PC-001","character","Bob Bramble",null,"Human Barbarian 3","Front-line protector who fears forgotten promises more than monsters.","",["🛡 14","♥ 35","Initiative +2"]),
  c("PC-002","character","Wren Vale",null,"Halfling Bard 3","Support and social problem solver who knows the hymn's first two verses.","",["🛡 14","♥ 24","Initiative +3"]),
  c("PC-003","character","Pip Thimble",null,"Gnome Rogue 3","A sharp-eyed courier who saw Mira trying not to cry.","",["🛡 15","♥ 24","Initiative +4"]),
  c("PC-004","character","Marigold Ash",null,"Dwarf Cleric 3","A healer who believes grief is proof that love existed.","",["🛡 17","♥ 30","Initiative +0"]),
  c("ITEM-001","treasure","Pocket Chime of Clear Thought",6,"Rare · Attunement","Spend 1 of 3 charges to reroll a failed Intelligence, Wisdom, or Charisma save.","Regains 1d3 charges at dawn."),
  c("ITEM-002","treasure","Hearthglow Festival Lantern",null,"Common","Glows when someone sincerely says another creature's name."),
  c("ITEM-003","treasure","Moon-Sugar Tonic",5,"Consumable","Bonus action: regain 1d6+2 HP and end one effect preventing reactions."),
  c("ITEM-004","treasure","Bellfounder's Apron",null,"Uncommon","Advantage with smith's tools and resistance to environmental thunder damage."),
  ...[
    ["01","A Forgotten Face","A guest has forgotten their spouse's face and quietly asks the party for help.","Comforting them reveals that kind words briefly quiet the truth bell."],
    ["02","Jam for Gremlins","Two Bellglass Gremlins crawl from the pantry carrying teaspoons like spears.","They surrender immediately if offered jam. Otherwise use MON-002."],
    ["03","The Unremembered Toast","A birthday toast repeats itself every thirty seconds, stopping before the guest of honor's name.","Completing the toast starts the optional side quest The Unremembered Toast."],
    ["04","Portrait Moth","A Memory Moth lands on a character's portrait and begins drinking the painted smile.","Share a happy memory or make a DC 12 Wisdom save. Failure removes reactions until the next turn."],
    ["05","The Person Who Remembers","A courier arrives with a parcel addressed to “the person who still remembers.”","The parcel belongs at Copper Kettle General Goods and leads directly to Room 4."],
    ["06","A Voice in the Fire","The fireplace crackles in Mira's voice: “Kindness first.”","This is an accidental magical recording, not live communication."],
    ["07","The Cake-Hungry Hat","Three patrons accuse one another of stealing the same hat. The hat suddenly growls.","It is a tiny animated object that wants cake, not blood."],
    ["08","The Doors Lock","The inn doors slam shut as a loop of bell rope drops from the rafters.","Place and reveal TRAP-002, the Falling Bell-Rope Snare."],
    ["09","The Forbidden Tunnel","Brindle remembers a service tunnel beneath the cellar leading toward the foundry district.","This creates a safe shortcut to Room 6."],
    ["10","The Truth Bell Cracks","The truth bell cracks and releases a wave of silver light.","Everyone may reroll one failed social or investigation check made in the inn."]
  ].map(([number,title,playerText,dmText]) => c(`EVENT-${number}`,"event",title,2,`Inn event ${Number(number)}`,playerText,dmText)),
  ...wildShapeCatalog,
  ...importedCatalog.map(card => card.kind === "character" ? enhancePregen(card) : card)
];
