import { rollFormula } from "./diceEngine.js";

const ABILITY_INDEX = {
  strength:0, dexterity:1, constitution:2,
  intelligence:3, wisdom:4, charisma:5
};

export const abilityModifier = score => Math.floor((Number(score) - 10) / 2);

export const deriveCharacter = (character, equippedCards = []) => {
  try {
    const derived = {
      armorClass: Number(character.baseArmorClass || 10),
      initiative: Number(character.initiative || 0),
      speed: Number(character.speed || 30)
    };
    for (const card of equippedCards) {
      for (const modifier of card.modifiers || []) {
        if (!(modifier.stat in derived)) continue;
        derived[modifier.stat] = modifier.operation === "set"
          ? Number(modifier.value)
          : derived[modifier.stat] + Number(modifier.value);
      }
    }
    return derived;
  } catch (error) {
    console.error("[Dungeon Cards] Character statistics could not be derived.", error);
    throw error;
  }
};

export const executeEquippedAttack = (character, item, actionId, random = Math.random) => {
  try {
    const action = item.actions?.find(candidate => candidate.id === actionId);
    if (!action || action.kind !== "equippedAttack") throw new Error("That equipped attack does not exist.");
    const ability = abilityModifier(character.abilities[ABILITY_INDEX[action.ability]]);
    const proficiency = action.proficiency ? Number(character.proficiencyBonus || 0) : 0;
    const attackBonus = ability + proficiency + Number(action.attackBonus || 0);
    const attack = rollFormula(`1d20${attackBonus >= 0 ? "+" : ""}${attackBonus}`, random);
    const critical = attack.dice[0] === 20;
    const damageComponents = action.damageComponents.map(component => {
      const abilityBonus = component.ability
        ? abilityModifier(character.abilities[ABILITY_INDEX[component.ability]]) : 0;
      const fixed = abilityBonus + Number(component.flatBonus || 0);
      const roll = rollFormula(`${component.formula}${fixed ? `${fixed > 0 ? "+" : ""}${fixed}` : ""}`, random, critical);
      return { ...component, roll };
    });
    return {
      cardId:item.id, cardTitle:item.title, action, attack, attackBonus, critical,
      damageComponents,
      damageTotal:damageComponents.reduce((sum, component) => sum + component.roll.total, 0)
    };
  } catch (error) {
    console.error("[Dungeon Cards] Equipped attack failed.", error);
    throw error;
  }
};
