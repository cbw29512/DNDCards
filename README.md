# Dungeon Cards

Standalone card-based tabletop adventure platform.

## Product boundary

This repository contains Dungeon Cards: the D&D-focused card adventure product, reusable card library, digital DM/player table, combat/initiative helpers, printable cards, and level-ready hero packs.

The dormant `agent/multi-system-ttrpg-hub` branch is an experimental expansion and is not the production baseline.

## Run locally

Serve the repository root with any static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Quality gates

The repository has one canonical regression command:

```bash
npm test
```

It runs every `scripts/test-*.mjs` regression plus the library validator.

Build the clean production artifact with:

```bash
npm run build
```

The deployable site is written to `_site/`. GitHub Pages deploys that exact artifact after tests pass, and `netlify.toml` uses the same tested build for the planned Netlify production path.

Run the full test + build contract with:

```bash
npm run check
```
