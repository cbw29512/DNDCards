import { siteView, routeStateFromHash } from "./site/siteView.js";

const currentRouteState = () => routeStateFromHash(globalThis.location?.hash || "");

const currentView = error => {
  const state = currentRouteState();
  return siteView(state.route, error, { communityFilters:state.communityFilters });
};

const scrollToRouteSection = root => {
  try {
    const { section } = currentRouteState();
    if (section) root.querySelector(`#${section}`)?.scrollIntoView({ block:"start" });
  } catch (error) {
    console.error("[Find Your Table] Guide section could not scroll.", error);
  }
};

const bindHashNavigation = () => {
  try {
    if (!globalThis.addEventListener || globalThis.__findYourTableHashBound) return;
    globalThis.__findYourTableHashBound = true;
    globalThis.addEventListener("hashchange", () => {
      const root = globalThis.document?.querySelector("#app");
      if (root?.querySelector(".hub-main")) {
        root.innerHTML = currentView();
        scrollToRouteSection(root);
      }
    });
  } catch (error) {
    console.error("[Find Your Table] Hash navigation could not bind.", error);
  }
};

bindHashNavigation();
export const landingView = error => currentView(error);