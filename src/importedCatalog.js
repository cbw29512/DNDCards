import { importedCreatures2014 } from "./importedCreatures2014.js?v=hero-roster-1";
import { importedCreatures2024 } from "./importedCreatures2024.js?v=hero-roster-1";
import { importedPregens } from "./importedPregens.js?v=hero-roster-1";
import { importedRules } from "./importedRules.js?v=hero-roster-1";

import { importedEquipment } from "./importedEquipment.js?v=hero-roster-1";

export const importedCatalog = [
  ...importedCreatures2014,
  ...importedCreatures2024,
  ...importedPregens,
  ...importedRules,
  ...importedEquipment
];
