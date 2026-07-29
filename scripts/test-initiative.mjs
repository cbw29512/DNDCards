import assert from "node:assert/strict";
import { finishTurn, rollInitiative } from "../src/initiative.js";

try {
  const base = {
    players: [
      { characterId:"pc-wendy" }, { characterId:"pc-bob" }
    ],
    roomId:"inn", placedByRoom:{ inn:["monster-gremlin","monster-gremlin"] },
    initiative:[], activeTurn:0, round:0, usedResources:[]
  };
  const rolls = [0.99, 0.5, 0.25];
  const state = rollInitiative(base, () => rolls.shift());
  assert.equal(state.initiative[0].openingTurn, true);
  assert.equal(state.initiative.filter(entry => entry.id === "monster-gremlin").length, 1);
  assert.equal(state.initiative.find(entry => entry.id === "monster-gremlin").groupSize, 2);
  assert.equal(state.round, 0);
  assert.equal(finishTurn(state).round, 1);
  console.log("Initiative tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Initiative test failed.", error);
  process.exitCode = 1;
}
