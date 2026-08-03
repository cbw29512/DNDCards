import { systems, systemById } from "./catalog.js";
import { blogPosts, blogPostById } from "./blogData.js";
import { homeView } from "./homeView.js";
import { systemsIndexView, systemGuideView } from "./systemView.js";
import { blogIndexView, blogPostView } from "./blogView.js";
import { communityView } from "./communityView.js";
import { legalView } from "./legalView.js";
import { pageShell } from "./components.js";

export const routeStateFromHash = hash => {
  try {
    const raw = hash.replace(/^#\/?/, "").replace(/\/+$/, "") || "home";
    const [route, query = ""] = raw.split("?");
    const params = new URLSearchParams(query);
    return {
      route,
      communityFilters: {
        system: params.get("system") || "all",
        role: params.get("role") || "all"
      }
    };
  } catch (error) {
    console.error("[Find Your Table] Route parsing failed.", error);
    return { route:"home", communityFilters:{ system:"all", role:"all" } };
  }
};

export const siteView = (route, error, options = {}) => {
  try {
    if (route === "home") return homeView();
    if (route === "systems") return systemsIndexView(systems);
    if (route === "blog") return blogIndexView(blogPosts);
    if (route === "community") return communityView(options.communityFilters || { system:"all", role:"all" });
    if (route === "legal") return legalView(systems);
    if (route.startsWith("system/")) {
      const system = systemById(route.split("/")[1]);
      return system ? systemGuideView(system) : notFoundView();
    }
    if (route.startsWith("blog/")) {
      const post = blogPostById(route.split("/")[1]);
      return post ? blogPostView(post) : notFoundView();
    }
    return notFoundView();
  } catch (cause) {
    console.error("[Find Your Table] Site route failed.", cause);
    return errorView(error || "This page could not be displayed.");
  }
};

const notFoundView = () => pageShell(`<section class="page-hero"><p class="eyebrow">404</p><h1>That page is not in the adventure.</h1><p>Return to the system chooser and take another path.</p><a class="primary-action" href="#/home">Return home</a></section>`);
const errorView = message => pageShell(`<section class="page-hero"><p class="eyebrow">Interface error</p><h1>The guide could not load.</h1><p role="alert">${message}</p><a class="primary-action" href="#/home">Return home</a></section>`);