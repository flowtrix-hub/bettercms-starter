# BetterCMS Marketing Starter (Next.js)

The **Next.js** starter for the BetterCMS *Marketing Starter* template: a polished marketing
site rendered entirely from a BetterCMS project.

- **Home / About / Contact** — CMS pages rendered from their block tree with `<BcmsBlocks>`.
  The Contact page carries a real **form block**, so submissions land in your project's inbox.
- **Blog** and **Case Studies** — content collections, listed and rendered from the Delivery API.

Create a site from this template in the BetterCMS dashboard (pick *Marketing Starter* →
*Next.js*) and it's deployed and wired automatically. Or run it locally below.

## The slug contract

This site reads these slugs from the CMS — they match the template's seeded content. Keep them in
sync if you rename models/pages (and mirror changes in `bettercms-starter-astro`):

| Kind  | Slugs |
|-------|-------|
| Pages | `home`, `about`, `contact` |
| Models| `blog-post`, `case-study`, `author` |

## Run locally

```bash
cp .env.example .env.local        # set BETTERCMS_WORKSPACE + BETTERCMS_API_KEY (content:read)
npm install
npm run fetch-content             # writes bcms-content.json (pages, forms, entries)
npm run dev                       # http://localhost:3000
```

This is a **static** site (`output: "export"`): every page, entry, and the contact form render
from `bcms-content.json`. Regenerate it with `npm run fetch-content` after editing content. On
BetterCMS hosting the deploy Action generates `bcms-content.json` for you before each build, then
serves the static `out/`.

## Integration test

`test/chain.integration.test.ts` provisions its own model/entries via the Management API,
publishes, fetches through the live Delivery API, asserts reference hydration at `depth=1`, then
tears everything down.

```bash
BETTERCMS_API_URL=https://api.bettercms.ai \
BETTERCMS_WORKSPACE=<slug> \
BETTERCMS_MGMT_KEY=bcms_xxx \
npm run test:integration
```
