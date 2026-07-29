import assert from "node:assert/strict";

globalThis.localStorage = {
  value: null,
  getItem() { return this.value; },
  setItem(_key, value) { this.value = value; }
};

try {
  const { loadState, updateState } = await import("../src/state.js");
  let state = loadState();
  assert.deepEqual(state.healthByCard["monster-gremlin"], { current:18, maximum:18 });
  state = updateState(state, { type:"adjust-health", id:"monster-gremlin", amount:-5 });
  assert.equal(state.healthByCard["monster-gremlin"].current, 13);
  state = updateState(state, { type:"adjust-health", id:"pc-wendy", amount:-5 });
  state = updateState(state, { type:"rest", restType:"long" });
  assert.equal(state.healthByCard["monster-gremlin"].current, 13);
  assert.equal(state.healthByCard["pc-wendy"].current, 32);
  console.log("Combat state tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Combat state test failed.", error);
  process.exitCode = 1;
}
