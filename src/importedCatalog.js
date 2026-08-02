import { importedCreatures2014 } from "./importedCreatures2014.js?v=rules-ui-audit-1";
import { importedCreatures2024 } from "./importedCreatures2024.js?v=rules-ui-audit-1";
import { importedPregens } from "./importedPregens.js?v=rules-ui-audit-1";
import { importedRules } from "./importedRules.js?v=rules-ui-audit-1";

import { importedEquipment } from "./importedEquipment.js?v=rules-ui-audit-1";
import { levelThreePregens } from "./levelThreePregens.js?v=rules-ui-audit-1";

const starterPregensById = new Map(levelThreePregens.map(card => [card.id, card]));
const enrichedImportedPregens = importedPregens.map(card => starterPregensById.get(card.id) || card);
const importedPregenIds = new Set(importedPregens.map(card => card.id));
const mergedPregens = [
  ...enrichedImportedPregens,
  ...levelThreePregens.filter(card => !importedPregenIds.has(card.id))
];

export const importedCatalog = [
  ...importedCreatures2014,
  ...importedCreatures2024,
  ...mergedPregens,
  ...importedRules,
  ...importedEquipment
];
