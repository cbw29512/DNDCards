import assert from "node:assert/strict";
import {
  finishTurn,
  readyAction,
  rollInitiative,
  triggerReadyAction
} from "../src/initiative.js";

try {
  const base = {
    players: [
      { characterId:"pc-wendy" }, { characterId:"pc-bob" }
    ],
    roomId:"inn", placedByRoom:{ inn:["monster-gremlin","monster-gremlin"] },
    initiative:[], activeTurn:0, round:0, usedResources:[],
    readyByEntryId:{}, reactionSpentCardIds:[], readyHistory:[]
  };
  const rolls = [0.99, 0.5, 0.25];
  const state = rollInitiative(base, () => rolls.shift());
  assert.equal(state.initiative[0].openingTurn, true);
  assert.equal(state.initiative.filter(entry => entry.id === "monster-gremlin").length, 1);
  assert.equal(state.initiative.find(entry => entry.id === "monster-gremlin").groupSize, 2);
  assert.equal(state.round, 0);
  const openingReady = readyAction(state, "The gremlin moves", "Wendy casts a spell");
  const openingEntryId = openingReady.initiative[openingReady.activeTurn].entryId;
  assert.ok(openingReady.usedResources.includes("Action"));
  assert.equal(openingReady.readyByEntryId[openingEntryId].trigger, "The gremlin moves");

  const normalTurn = finishTurn(openingReady);
  assert.equal(normalTurn.round, 1);
  assert.equal(
    normalTurn.readyByEntryId[openingEntryId],
    undefined,
    "The natural-20 opening entry expires when that creature's normal turn begins."
  );

  const readied = readyAction(normalTurn, "The gremlin moves", "Wendy casts a spell");
  const readyEntryId = readied.initiative[readied.activeTurn].entryId;
  const afterTurn = finishTurn(readied);
  assert.ok(afterTurn.readyByEntryId[readyEntryId], "A held action persists after ending the normal turn.");

  const triggered = triggerReadyAction(afterTurn, readyEntryId);
  assert.equal(triggered.readyByEntryId[readyEntryId], undefined);
  assert.ok(triggered.reactionSpentCardIds.includes(
    triggered.readyHistory[0].cardId
  ));
  assert.equal(triggered.readyHistory[0].response, "Wendy casts a spell");

  let expiring = afterTurn;
  for (let step = 0; step < expiring.initiative.length; step += 1) {
    const nextIndex = expiring.activeTurn >= expiring.initiative.length - 1
      ? 0
      : expiring.activeTurn + 1;
    expiring = finishTurn(expiring);
    if (expiring.initiative[nextIndex].id === readied.readyByEntryId[readyEntryId].cardId) break;
  }
  assert.equal(
    expiring.readyByEntryId[readyEntryId],
    undefined,
    "A held action expires when that creature's next turn begins."
  );

  const originalConsoleError = console.error;
  console.error = () => {};
  const cannotReadyWithoutAction = readyAction(
    { ...state, usedResources:["Action"] },
    "A door opens",
    "Attack"
  );
  console.error = originalConsoleError;
  assert.match(cannotReadyWithoutAction.lastError, /already used its Action/);
  console.log("Initiative tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Initiative test failed.", error);
  process.exitCode = 1;
}
