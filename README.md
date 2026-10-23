# Grão de café estudo

Static GitHub Pages site at https://estudo-coffee.com/.

## Content rules
- One coffee variety; roasted beans and green beans are two processing options, not two varieties.
- Roasted beans: 100g / 1,000 yen, roast number 1–12 entered by the customer on the existing Stripe checkout.
- Green beans: 100g / 800 yen. Maximum combined order: four bags / 400g. Free nationwide shipping.
- Do not invent variety names, origins, delivery deadlines, certifications, or merchant policies. Ask the operator before adding these.
- Existing Stripe, LINE, Instagram, logo, CNAME and address are preserved.

## Implementation
No build step, JavaScript, analytics, cookies, external fonts, or autoplay audio. Serve locally with `python -m http.server 8311`.
The original coffee/cup SVG is authored for this site, with a visible illustration disclaimer. Existing logo.png is the operator's pre-existing asset. No competitor imagery, copy, recordings, or paid stock assets are used.

## Design research (2026-10-23)
Primary competitors reviewed: https://www.doicoffee.com/product/menu/ and https://kohikobo.com/.
Useful patterns: flavor/roast guidance near selection, visible quantities/prices, and clear ordering help. Applied those general usability patterns to this operator's single-variety, 12-roast proposition; no source material copied.

## Checks
Validate unique IDs, fragment targets, one H1, exact preserved checkout URLs, and sitemap XML. Check desktop/mobile layout, keyboard focus, native FAQ toggles, in-page navigation, and reduced-motion behavior. Never submit payments or send real inquiries during QA.

## Deployment / rollback
GitHub Pages publishes the main branch. Keep CNAME unchanged. Revert the refresh commit to restore the preceding design; never rewrite history or force-push.
