import assert from "node:assert/strict";

globalThis.localStorage = {
  value: null,
  getItem() { return this.value; },
  setItem(_key, value) { this.value = value; }
};

try {
  const { loadState, updateState } = await import("../src/state.js");
  let state = loadState();
  assert.deepEqual(state.healthByCard["MON-002"], { current:16, maximum:16 });
  state = updateState(state, { type:"adjust-health", id:"MON-002", amount:-5 });
  assert.equal(state.healthByCard["MON-002"].current, 11);
  state = updateState(state, { type:"adjust-health", id:"pc-wendy", amount:-5 });
  state = updateState(state, { type:"rest", restType:"long" });
  assert.equal(state.healthByCard["MON-002"].current, 11);
  assert.equal(state.healthByCard["pc-wendy"].current, 32);
  console.log("Combat state tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Combat state test failed.", error);
  process.exitCode = 1;
}
