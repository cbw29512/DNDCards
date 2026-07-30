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
  assert.ok(state.placedByRoom.inn.includes("clue-toast"));
  assert.equal(state.players.length, 0);
  state.identity = { role:"dm", name:"DM" };
  state = updateState(state, { type:"preview-character", id:"pc-wendy" });
  assert.equal(state.previewCharacterId, "pc-wendy");
  assert.equal(state.players.length, 0, "DM character preview must not create a player");
  state = updateState(state, { type:"event" });
  assert.match(state.activeEventId, /^event-\d+$/);
  state = updateState(state, { type:"previous-room" });
  assert.equal(state.roomId, "square");
  for (const roomId of ["inn", "chapel", "shop"]) {
    state.roomId = roomId;
    state = updateState(state, { type:"next-room" });
  }
  assert.equal(state.adventureComplete, true);

  localStorage.value = JSON.stringify({
    players:[
      { id:"player-preview", name:"Player Preview", characterId:"pc-wendy", backpackIds:[] },
      { id:"player-real", name:"Real Player", characterId:"pc-bob", backpackIds:[] }
    ],
    activePlayerId:"player-preview",
    equipmentByPlayer:{ "player-preview":{} },
    pendingItemsByPlayer:{ "player-preview":[] }
  });
  const migrated = loadState();
  assert.equal(migrated.previewCharacterId, "pc-wendy");
  assert.deepEqual(migrated.players.map(player => player.id), ["player-real"]);
  assert.equal(migrated.activePlayerId, "player-real");
  console.log("Adventure runner tests passed.");
} catch (error) {
  console.error("[Dungeon Cards] Adventure runner test failed.", error);
  process.exitCode = 1;
}
