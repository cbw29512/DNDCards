import { dnd2014 } from "./systems/dnd2014.js";
import { dnd2024 } from "./systems/dnd2024.js";
import { pathfinder2e } from "./systems/pathfinder2e.js";
import { cthulhu7e } from "./systems/cthulhu7e.js";
import { daggerheart } from "./systems/daggerheart.js";
import { vampire5e } from "./systems/vampire5e.js";

export const systems = [dnd2014, dnd2024, pathfinder2e, cthulhu7e, daggerheart, vampire5e];
export const systemById = id => systems.find(system => system.id === id);

export const comingSoon = [
  ["Cyberpunk RED", "Action-focused science fiction"],
  ["Savage Worlds", "Fast, pulpy, multi-genre play"],
  ["Mothership", "Rules-light science-fiction horror"],
  ["Shadowdark", "Fast dungeon-crawling fantasy"]
];