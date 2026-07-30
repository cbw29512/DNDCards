# Dungeon Cards print-production standard

This specification applies to official cards, homebrew exports, print-at-home sheets, and files supplied to a professional printer.

## Finished size and resolution

| Measurement | Inches | Pixels at 300 DPI |
| --- | ---: | ---: |
| Full file including bleed | 2.75 × 3.75 | 825 × 1125 |
| Finished poker-card trim | 2.5 × 3.5 | 750 × 1050 |
| Recommended live/safe area | 2.25 × 3.25 | 675 × 975 |

- Bleed extends 0.125 inch past every trim edge.
- Important text, icons, statistics, QR codes, and faces remain at least 0.125 inch inside the trim.
- Corner rounding is applied after trimming and must not remove live content.
- Artwork must cover the entire bleed area without stretching. Source art should be at least 825 × 1125 pixels; larger masters are preferred.

## Type and legibility

- Export cards as print PDFs with live vector text. Do not rasterize rules text merely to call the file “300 DPI.”
- Use a minimum 7.5-point body size, 9-point quick-stat size, and 13-point title size at final trim.
- Use high-contrast text/background combinations that remain distinguishable without relying on hue alone.
- Keep each action to a consistent pattern: icon, action name, attack or save, range, damage, then effect.
- Use the official Symbol Key in every pack and the same icon meaning on every card.
- Never bake titles or rules text into generated artwork.

## Fronts, backs, and accordion cards

- The front is the player-facing illustrated side.
- The back is the playable or DM-facing quick-reference side, depending on card type.
- Complex creatures use ordered accordion backs. Put spells on the final card.
- Duplex files must use the printer’s required back orientation and include a registration proof.
- Home-print sheets must also offer a single-sided fold-and-glue option.

## Images, color, and proofing

- Keep archival art masters lossless. Use optimized WebP previews only for the website.
- Convert production PDFs to the print vendor’s supplied color profile; do not guess a generic CMYK profile.
- Preserve rich blacks and gold accents only within the vendor’s ink limits.
- Print a 100% scale proof and verify trim, contrast, text size, QR readability, and front/back registration before approving a deck.

## QR codes

- Each QR code resolves to a stable card or pack identifier, not directly to mutable game statistics.
- Keep the required quiet zone clear and use dark ink on a light, untextured background.
- Test each code from a printed proof under ordinary room lighting.
- A QR code may unlock purchased content, load a character, or add a card to a collection; authorization stays server-side.

## Current flagship art

`Mara Ironjaw` uses a 948 × 1659-pixel master. It exceeds the 825 × 1125 full-bleed requirement. The repository stores an optimized WebP preview for the website; the lossless, 300-DPI-tagged master remains the production source.
