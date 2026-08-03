import { siteView, routeStateFromHash } from "./site/siteView.js";

const currentView = error => {
  const state = routeStateFromHash(globalThis.location?.hash || "");
  return siteView(state.route, error, { communityFilters:state.communityFilters });
};

const bindHashNavigation = () => {
  try {
    if (!globalThis.addEventListener || globalThis.__findYourTableHashBound) return;
    globalThis.__findYourTableHashBound = true;
    globalThis.addEventListener("hashchange", () => {
      const root = globalThis.document?.querySelector("#app");
      if (root?.querySelector(".hub-main")) root.innerHTML = currentView();
    });
  } catch (error) {
    console.error("[Find Your Table] Hash navigation could not bind.", error);
  }
};

bindHashNavigation();
export const landingView = error => currentView(error);
