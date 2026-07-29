import fs from "node:fs";
import path from "node:path";

const source = process.argv[2];
const output = process.argv[3] || "src/wildShapeCatalog.js";

const challengeValue = text => {
  const match = text.match(/^(\d+)(?:\/(\d+))?/);
  return match ? (match[2] ? Number(match[1]) / Number(match[2]) : Number(match[1])) : 99;
};

const abilityData = raw => {
  const line = raw.match(/STR DEX CON INT WIS CHA ([\s\S]*?)(?:Skills|Saving Throws|Damage|Senses)/)?.[1] || "";
  const values = [...line.matchAll(/(\d+) \(([+-]\d+)\)/g)].slice(0, 6);
  return {
    scores: values.map(match => Number(match[1])),
    modifiers: values.map(match => Number(match[2]))
  };
};

const attackData = actions => {
  const attack = /(?:^|\s)([A-Z][A-Za-z '’()-]+?)(?: \(Recharge [^)]+\))?\. (Melee|Ranged) Weapon Attack: ([+-]\d+) to hit, (?:reach|range) (.*?), one (?:target|creature)\. Hit: ([\s\S]*?)(?=\s[A-Z][A-Za-z '’()-]+?(?: \(Recharge [^)]+\))?\. (?:Melee|Ranged) Weapon Attack:|$)/g;
  return [...actions.matchAll(attack)].map((match, index) => {
    const damage = match[5].match(/\d+ \((\d+d\d+(?: [+-] \d+)?)\) ([a-z]+) damage/i);
    return {
    id: `${match[1].toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
    label: match[1].trim(), icon: match[2].toLowerCase() === "melee" ? "⚔" : "➶",
    kind: "attack", roll: `1d20${match[3]}`,
    damage: damage?.[1].replace(/\s+/g, "") || null, range: match[4],
    damageType: damage?.[2] || null, effect: match[5].trim(), cost: "Action"
  };
  });
};

try {
  if (!source) throw new Error("Pass the SRD monster JSON source path.");
  const monsters = JSON.parse(fs.readFileSync(source, "utf8"));
  const beasts = monsters.filter(monster =>
    monster.edition === "srd-5.1-2014"
    && monster.type.toLowerCase() === "beast"
    && challengeValue(monster.challenge) <= 2
    && !/fly/i.test(monster.speed));
  const cards = beasts.map(monster => {
    const abilities = abilityData(monster.rawText);
    const armor = Number(monster.armorClass.match(/\d+/)?.[0]);
    const health = Number(monster.hitPoints.match(/\d+/)?.[0]);
    const unarmoredArmor = abilities.modifiers.length === 6
      ? 10 + abilities.modifiers[1] + abilities.modifiers[2] : armor;
    return {
      id: `WS-${monster.name.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`,
      kind: "wild-shape", title: monster.name, badge: `CR ${monster.challenge.split(" ")[0]}`,
      playerText: `${monster.size} beast form eligible for a level-6 Legacy Moon Druid if the character has seen it.`,
      dmText: `Traits: ${monster.traits || "None."} Actions: ${monster.actions}`,
      quickStats: [`🛡 ${armor}`, `♥ ${health}`, `➜ ${monster.speed}`, `Barbarian AC ${Math.max(armor, unarmoredArmor)}`],
      armor, unarmoredArmor: Math.max(armor, unarmoredArmor), health, speed: monster.speed,
      challenge: challengeValue(monster.challenge), challengeLabel: monster.challenge.split(" ")[0],
      size: monster.size, abilities: abilities.scores, traits: monster.traits,
      actionText: monster.actions, actions: attackData(monster.actions),
      source: monster.sourceReference, edition: "2014 / SRD 5.1", wildShapeLevel: 6
    };
  });
  const contents = `// Generated from the CC-BY-4.0 SRD 5.1 source. Do not edit by hand.\nexport const wildShapeCatalog = ${JSON.stringify(cards, null, 2)};\n`;
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, contents);
  console.log(`Generated ${cards.length} level-6 Moon Druid beast cards.`);
} catch (error) {
  console.error("[Dungeon Cards] Wild Shape catalog generation failed.", error);
  process.exitCode = 1;
}
