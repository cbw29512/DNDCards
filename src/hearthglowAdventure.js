const card = (id, kind, title, room, roomNumber, badge, playerText, dmText = "", quickStats = [], combat = {}) => ({
  id, kind, title, room, roomNumber, badge, playerText, dmText, quickStats, source:"The First Chime of Hearthglow", ...combat
});

export const hearthglowRooms = [
  { id:"lanternhome", number:1, title:"Lanternhome Square" },
  { id:"heartbreak-inn", number:2, title:"Heartbreak Inn" },
  { id:"last-lantern", number:3, title:"Chapel of the Last Lantern" },
  { id:"copper-kettle", number:4, title:"Copper Kettle General Goods" },
  { id:"moon-mortar", number:5, title:"Moon and Mortar Magic Shop" },
  { id:"bellfoundry", number:6, title:"Old Bellfoundry" }
];

const rooms = [
  ["LOC-005","Lanternhome Square","lanternhome",1,"Festival ribbons cross a bright city square, but the First Chime rings backward. A baker drops a tray and asks why everyone is celebrating.","Mira Quill vanished after repairing the bell. Give the party the invitation and make the danger immediate."],
  ["LOC-001","Heartbreak Inn","heartbreak-inn",2,"Warm firelight, sugared cake, and quiet music fill the inn. A tiny truth bell rings whenever someone says a name they truly remember.","Roll or choose an inn event. Brindle saw Mira carrying silver tools toward the foundry district."],
  ["LOC-002","Chapel of the Last Lantern","last-lantern",3,"Hundreds of named lanterns hang from the rafters. At the altar, the third line of an old four-line hymn has vanished.","The missing countertone is: No heart is held by joy alone; we carry grief together. Progress never requires a roll."],
  ["LOC-003","Copper Kettle General Goods","copper-kettle",4,"Six hundred necessities crowd the narrow shop. A handcart of silver polish waits for a customer nobody remembers.","The order was Mira's. The receipt, cart tracks, or neighboring vendors point to the bellfoundry."],
  ["LOC-004","Moon and Mortar Magic Shop","moon-mortar",5,"Bottled clouds drift between shelves. A note reads: I thought the bell was lonely. I may have taught it to hunger.","Reveal that the Warden is an accidental protector. Three sincere memories at the clapper remove Resonant Shell."],
  ["LOC-006","Old Bellfoundry","bellfoundry",6,"The foundry crouches beneath the city wall. Below, stolen voices remember birthdays, farewells, first kisses, apologies, and names.","Reveal the glyph first. The finale supports combat, ritual, negotiation, or a mixed resolution."]
].map(([id,title,room,number,playerText,dmText]) => card(id,"room",title,room,number,`Room ${number}`,playerText,dmText));

const npcs = [
  card("NPC-001","npc","Mayor Tamsin Vale","lanternhome",1,"Quest giver","A worried mayor grips a silver invitation whose guest of honor has disappeared.","She knows Mira repaired the bell and visited the magic shop. She does not know about the Warden."),
  card("NPC-002","npc","Brindle Hearth","heartbreak-inn",2,"Innkeeper","The innkeeper remembers every guest's favorite drink—but not the face of her own sister.","Kindness earns the foundry shortcut. Pressure makes Brindle defensive but never blocks the clue."),
  card("NPC-003","npc","Sister Elowen","last-lantern",3,"Rare NPC","An amber-robed priest repaints fading names as quickly as the letters disappear.","She explains that the bell was made to help people carry grief together, not erase it.")
];

const hazards = [
  card("TRAP-002","trap","Falling Bell-Rope Snare","heartbreak-inn",2,"DC 12 Dexterity","A loop of festival rope drops from the rafters with a sharp wooden snap.","Failure: restrained and 1d6 bludgeoning. Escape DC 12. A cake offering makes the rope loosen.",["Detect DC 12","Save DC 12","Damage 1d6"],{ actions:[{id:"trap-rope",label:"Trigger Snare",icon:"⬡",kind:"effect",damage:"1d6",save:{ability:"Dexterity",dc:12},range:"Room",effect:"Failure: Restrained; escape DC 12.",cost:"Free/interact"}] }),
  card("TRAP-001","trap","Backward Chime Glyph","bellfoundry",6,"DC 13 Wisdom","Written labels reverse as a deep bell-note plays backward.","Failure: 2d6 psychic and no reactions until end of next turn. A sincere memory bypasses it.",["Detect DC 13","Save DC 13","Damage 2d6"],{ actions:[{id:"trap-glyph",label:"Reverse Chime",icon:"⬡",kind:"effect",damage:"2d6",save:{ability:"Wisdom",dc:13},range:"Room",effect:"Failure: no Reactions until end of next turn.",cost:"Free/interact"}] })
];

const monsters = [
  card("MON-001","monster","Memory Moth Swarm","copper-kettle",4,"CR 1","Pale moths orbit the silver polish, each wing reflecting a half-remembered smile.","Disperses for a freely shared happy memory, bright magical light, or sweet food.",["🛡 12","♥ 24","➜ Fly 40 ft.","⚔ Nibble +4 · 2d4 psychic"],{initiative:2,abilities:[6,14,12,5,12,8],actions:[{id:"moth-nibble",label:"Memory Nibble",icon:"⚔",kind:"attack",roll:"1d20+4",damage:"2d4",range:"5 ft.",effect:"Psychic damage.",cost:"Action"}]}),
  card("MON-002","monster","Bellglass Gremlin","heartbreak-inn",2,"CR 1/2","A silver-eyed gremlin raises a sharpened spoon and protects a sack of stolen keepsakes.","Two act as one initiative group. They surrender for jam, shiny buttons, or a sincere festival invitation.",["🛡 13","♥ 16","➜ 30 ft.","⚔ Spoon +5 · 1d6+3"],{art:"assets/jam-gremlin-card-art.webp",initiative:3,abilities:[8,16,12,10,11,12],copies:2,actions:[{id:"gremlin-spoon",label:"Spoon Jab",icon:"⚔",kind:"attack",roll:"1d20+5",damage:"1d6+3",range:"5 ft.",effect:"Melee weapon attack.",cost:"Action"},{id:"gremlin-saucer",label:"Thrown Saucer",icon:"➶",kind:"attack",roll:"1d20+5",damage:"1d4+3",range:"20/60 ft.",effect:"Ranged weapon attack.",cost:"Action"}]}),
  card("MON-003","monster","Animated Clapper","bellfoundry",6,"CR 1","A heavy silver clapper tears free and swings through the air under its own power.","Use Pealing Blow when two or more characters stand together.",["🛡 15","♥ 22","➜ Fly 30 ft.","⚔ Strike +4 · 1d8+2"],{initiative:2,abilities:[14,14,12,3,10,5],actions:[{id:"clapper-strike",label:"Clapper Strike",icon:"⚔",kind:"attack",roll:"1d20+4",damage:"1d8+2",range:"5 ft.",effect:"Bludgeoning damage.",cost:"Action"},{id:"clapper-peal",label:"Pealing Blow",icon:"✦",kind:"effect",damage:"2d6",save:{ability:"Constitution",dc:12},range:"10-ft. burst",effect:"Thunder damage; half on success.",cost:"Action"}]}),
  card("BOSS-001","monster","Hollow Chime Warden","bellfoundry",6,"Boss · CR 3","A tall figure unfolds from empty sound, its hollow silver chest ringing with other people's laughter.","Never attacks a downed hero. At 20 HP it asks why anyone would choose to remember pain.",["🛡 15","♥ 68","➜ 30 ft.","⚔ Fist +5 · 1d8+3 + 1d4"],{initiative:2,abilities:[16,14,16,10,13,15],layoutHint:"accordion",actions:[{id:"warden-fist",label:"Resonant Fist",icon:"⚔",kind:"attack",roll:"1d20+5",damageComponents:[{label:"Fist",icon:"⚔",formula:"1d8+3",damageType:"bludgeoning"},{label:"Resonance",icon:"✦",formula:"1d4",damageType:"thunder"}],range:"5 ft.",effect:"Bludgeoning plus thunder damage.",cost:"Action"},{id:"warden-burst",label:"Hollow Burst",icon:"✦",kind:"effect",damage:"3d6",save:{ability:"Constitution",dc:13},range:"15-ft. cone",effect:"Thunder damage; half on success.",cost:"Action"}]})
];

const story = [
  card("CLUE-001","clue","Mira's Repair Notes","moon-mortar",5,"Finale clue","The spell was told to fill every hollow place with joy.","The Warden followed the instruction literally."),
  card("CLUE-003","clue","The Missing Third Verse","last-lantern",3,"Required clue","No heart is held by joy alone; we carry grief together.","Speaking this sincerely enables the countertone."),
  card("CLUE-004","clue","Foundry Service Receipt","copper-kettle",4,"Route clue","Silver repair supplies were ordered for the abandoned bellfoundry.","This is a direct route to Room 6."),
  card("ITEM-001","treasure","Pocket Chime of Clear Thought","bellfoundry",6,"Rare · Attunement","Spend 1 of 3 charges to reroll a failed Intelligence, Wisdom, or Charisma save.","Regains 1d3 charges at dawn."),
  card("ITEM-003","treasure","Moon-Sugar Tonic","moon-mortar",5,"Consumable","Bonus action: regain 1d6+2 HP and end one effect preventing reactions.","One bottle is available for each hero who shared a sincere memory.")
  ,card("treasure-emberblade","treasure","Emberblade +1","moon-mortar",5,"Homebrew demonstration","A bright steel sword glows like a candle flame without giving off smoke.","Equip it in one hand to unlock its attack.",["⚔ +1","1d8 slashing","1d4 fire"],{equipSlots:["mainHand","offHand"],modifiers:[],actions:[{id:"ember-slash",label:"Ember Slash",icon:"⚔",kind:"equippedAttack",attackType:"melee",ability:"strength",proficiency:true,attackBonus:1,range:"5 ft.",damageComponents:[{label:"Sword",icon:"⚔",formula:"1d8",ability:"strength",flatBonus:1,damageType:"slashing"},{label:"Flame",icon:"✦",formula:"1d4",damageType:"fire"}]}]})
];

export const hearthglowEvents = [
  ["01","A Forgotten Face","A guest has forgotten their spouse's face and quietly asks the party for help.","Comforting them reveals that kind words briefly quiet the truth bell."],
  ["02","Jam for Gremlins","Two Bellglass Gremlins crawl from the pantry carrying teaspoons like spears.","They surrender immediately if offered jam. Otherwise reveal MON-002."],
  ["03","The Unremembered Toast","A birthday toast repeats itself every thirty seconds, stopping before the guest of honor's name.","Completing the toast provides the first line of the countertone."],
  ["04","Portrait Moth","A Memory Moth lands on a portrait and begins drinking the painted smile.","Share a happy memory or make a DC 12 Wisdom save; failure removes Reactions until next turn."],
  ["05","The Person Who Remembers","A courier arrives with a parcel addressed to the person who still remembers.","The parcel belongs at Copper Kettle and leads directly to Room 4."],
  ["06","A Voice in the Fire","The fireplace crackles in Mira's voice: Kindness first.","This is an accidental magical recording, not live communication."],
  ["07","The Cake-Hungry Hat","Three patrons accuse one another of stealing the same hat. The hat suddenly growls.","It wants birthday cake, not blood."],
  ["08","The Doors Lock","The inn doors slam shut as a loop of bell rope drops from the rafters.","Place and reveal TRAP-002."],
  ["09","The Forbidden Tunnel","Brindle remembers a service tunnel leading toward the foundry district.","This creates a safe shortcut to Room 6 without removing required clues."],
  ["10","The Truth Bell Cracks","The truth bell cracks and releases a wave of silver light.","Everyone may reroll one failed social or Investigation check made in the inn."]
].map(([number,title,playerText,dmText]) => card(`EVENT-${number}`,"event",title,"heartbreak-inn",2,`Inn event ${Number(number)}`,playerText,dmText));

export const hearthglowCards = [...rooms, ...npcs, ...hazards, ...monsters, ...story, ...hearthglowEvents];
