const logError = (message, error) => console.error(`[Dungeon Cards] ${message}`, error);

export const resourceKey = (cardId, resourceId) => `${cardId}:${resourceId}`;

export const resourceRemaining = (state, card, resource) => {
  try {
    const maximum = Number(resource.maximum);
    if (!Number.isFinite(maximum)) return resource.maximum;
    const stored = state.resourceRemainingById?.[resourceKey(card.id, resource.id)];
    return Number.isFinite(stored) ? stored : maximum;
  } catch (error) {
    logError("Resource total could not be read.", error);
    return 0;
  }
};

export const adjustResourceState = (next, action, allCards) => {
  try {
    const card = allCards.find(candidate => candidate.id === action.cardId);
    const resource = card?.resources?.find(candidate => candidate.id === action.resourceId);
    const maximum = Number(resource?.maximum);
    if (!card || !resource || !Number.isFinite(maximum)) {
      throw new Error("That limited-use resource could not be found.");
    }
    next.resourceRemainingById ||= {};
    const key = resourceKey(card.id, resource.id);
    const current = resourceRemaining(next, card, resource);
    next.resourceRemainingById[key] = Math.max(0, Math.min(maximum, current + Number(action.amount)));
    return true;
  } catch (error) {
    logError("Resource use could not be adjusted.", error);
    throw error;
  }
};

export const recoverResources = (next, restType, allCards) => {
  try {
    next.resourceRemainingById ||= {};
    for (const card of allCards) {
      for (const resource of card.resources || []) {
        const maximum = Number(resource.maximum);
        if (!Number.isFinite(maximum)) continue;
        const key = resourceKey(card.id, resource.id);
        if (restType === "long" && ["short-rest", "long-rest"].includes(resource.refresh)) {
          next.resourceRemainingById[key] = maximum;
        } else if (restType === "short" && resource.refresh === "short-rest") {
          next.resourceRemainingById[key] = maximum;
        } else if (restType === "short" && Number(resource.shortRestRecovery) > 0) {
          const current = resourceRemaining(next, card, resource);
          next.resourceRemainingById[key] = Math.min(maximum, current + Number(resource.shortRestRecovery));
        }
      }
    }
  } catch (error) {
    logError("Rest resources could not be recovered.", error);
    throw error;
  }
};

export const recoverTurnResources = (next, allCards) => {
  try {
    next.resourceRemainingById ||= {};
    for (const card of allCards) {
      for (const resource of card.resources || []) {
        if (resource.refresh !== "turn" || !Number.isFinite(Number(resource.maximum))) continue;
        next.resourceRemainingById[resourceKey(card.id, resource.id)] = Number(resource.maximum);
      }
    }
  } catch (error) {
    logError("Turn resources could not be recovered.", error);
  }
};
