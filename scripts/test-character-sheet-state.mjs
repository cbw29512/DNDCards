import assert from "node:assert/strict";
import { levelThreePregens } from "../src/levelThreePregens.js";
import { characterStatus, recoverCharacterSheets, updateCharacterSheetState } from "../src/characterSheetState.js";

const revised = levelThreePregens.find(card => card.edition === "2024");
const classic = levelThreePregens.find(card => card.edition === "2014");
const state = { temporaryHpByCard:{}, hitDiceByCard:{}, deathSavesByCard:{}, inspirationByCard:{}, healthByCard:{} };
const cards = [revised, classic];

updateCharacterSheetState(state, { type:"adjust-hit-die", cardId:revised.id, amount:-2 }, cards);
updateCharacterSheetState(state, { type:"adjust-hit-die", cardId:classic.id, amount:-2 }, cards);
updateCharacterSheetState(state, { type:"adjust-temp-hp", cardId:revised.id, amount:7 }, cards);
updateCharacterSheetState(state, { type:"adjust-death-save", cardId:revised.id, result:"failures", amount:2 }, cards);
updateCharacterSheetState(state, { type:"toggle-inspiration", cardId:revised.id }, cards);
assert.equal(characterStatus(state, revised).hitDice, 1);
assert.equal(characterStatus(state, revised).temporaryHp, 7);
assert.equal(characterStatus(state, revised).deathFailures, 2);
assert.equal(characterStatus(state, revised).inspiration, true);

recoverCharacterSheets(state, cards);
assert.equal(characterStatus(state, revised).hitDice, 3, "2024 Long Rest restores all Hit Dice.");
assert.equal(characterStatus(state, classic).hitDice, 2, "2014 Long Rest restores half level, rounded down (minimum one).");
assert.equal(characterStatus(state, revised).temporaryHp, 0);
assert.equal(characterStatus(state, revised).deathFailures, 0);
console.log("Character sheet tracker tests passed.");
