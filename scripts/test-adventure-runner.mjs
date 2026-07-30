import assert from "node:assert/strict";

globalThis.localStorage = {
  value: null,
  getItem() { return this.value; },
  setItem(_key, value) { this.value = value; }
};

try {
  const { loadState, updateState } = await import("../src/state.js");
  let state = loadState();
  state = updateState(state, { type:"load-adventure", id:"wishing-cake" });
  assert.equal(state.roomId, "square");
  assert.deepEqual(state.placedByRoom.square, ["room-square", "npc-wendy"]);
  state.revealedIds = ["room-square"];
  state = updateState(state, { type:"next-room" });
  assert.equal(state.roomId, "inn");
  assert.deepEqual(state.completedRoomIds, ["square"]);
  assert.deepEqual(state.revealedIds, []);
  assert.ok(state.placedByRoom.inn.includes("monster-gremlin"));
  state = updateState(state, { type:"previous-room" });
  assert.equal(state.roomId, "square");
  for (const roomId of ["inn", "chapel", "shop"]) {
    state.roomId = roomId;
    state = updateState(state, { type:"next-room" });
  }
  assert.equal(state.adventureComplete, true);
  console.log("Adventure runner tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Adventure runner test failed.", error);
  process.exitCode = 1;
}
