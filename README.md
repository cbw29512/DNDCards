# Find Your Table + Dungeon Cards

A static, accessible tabletop roleplaying hub with two connected products:

- **Find Your Table:** beginner and Game Master guides for multiple roleplaying systems, a licensing center, editorial blog, and a safety-first community-discovery prototype.
- **Dungeon Cards:** the existing card-driven adventure platform, library, combat tools, printable cards, and DM/player table views.

## Supported guide baselines

- D&D fifth edition — 2014 rules / SRD 5.1
- D&D fifth edition — 2024 rules / SRD 5.2.1
- Pathfinder Second Edition Remaster
- Call of Cthulhu Seventh Edition — educational commentary only
- Daggerheart
- Vampire: The Masquerade Fifth Edition — educational commentary only

Every system module contains separate player and GM learning paths, official source links, license status, attribution or disclaimer text, and prohibited-content guidance.

## Community status

The table finder currently demonstrates discovery filters, listings, a trust ladder, and a privacy-oriented data schema. It does **not** claim that secure accounts, identity review, private messaging, reports, blocking, or moderation are live. See `COMMUNITY_SAFETY.md` for the secure-backend Definition of Done.

## Licensing and editorial controls

Review these files before adding or monetizing system content:

- `THIRD_PARTY_LICENSES.md`
- `CONTENT_POLICY.md`
- `COMMUNITY_SAFETY.md`

Open rules do not automatically include publisher trademarks, settings, characters, artwork, logos, maps, or trade dress.

## Run locally

Serve the repository root with any static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Validation

```bash
npm run test:system-guides
```

The test validates unique system IDs, player and GM curriculum coverage, legal/source fields, blog data, community privacy requirements, filters, routing, and routed guide tabs.
