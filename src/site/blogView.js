import { pageShell } from "./components.js";

const dateLabel = date => new Intl.DateTimeFormat("en-US", { year:"numeric", month:"long", day:"numeric" }).format(new Date(`${date}T12:00:00`));

export const blogIndexView = posts => pageShell(`
  <section class="page-hero"><p class="eyebrow">Table notes</p><h1>Learn systems, build adventures, and run better tables.</h1>
    <p>Every article uses original explanations and links readers back to official rules or licensing sources.</p></section>
  <section class="hub-section blog-grid">${posts.map(post => `<article>
    <div class="tag-row">${post.tags.map(tag => `<span>${tag}</span>`).join("")}</div><h2>${post.title}</h2>
    <p>${post.excerpt}</p><small>${dateLabel(post.date)}</small><a class="card-link" href="#/blog/${post.id}">Read article →</a>
  </article>`).join("")}</section>`);

export const blogPostView = post => pageShell(`
  <article class="blog-post"><header class="page-hero"><div class="tag-row">${post.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    <h1>${post.title}</h1><p>${post.excerpt}</p><small>${dateLabel(post.date)}</small></header>
    ${post.sections.map(([title, bullets]) => `<section><h2>${title}</h2><ul>${bullets.map(item => `<li>${item}</li>`).join("")}</ul></section>`).join("")}
    <aside><strong>Editorial standard</strong><p>Mechanics are summarized in original language. Product-specific rules should be checked against the linked official source before play or publication.</p></aside>
  </article>`);