# BetterCMS Starter (Next.js)

Reference app that proves the BetterCMS headless chain end-to-end (FLO-95):

**model + reference field → entries → publish → delivery API → reference hydration → SSR render.**

A Blog Post model carries an `author` **reference**. The `[slug]` page fetches a post
with `depth: 1`, so the delivery API hydrates the referenced Author in a single request
(no N+1) and the page renders the author's name/bio inline.

## Run the app

```bash
cp .env.example .env.local   # set BETTERCMS_WORKSPACE + BETTERCMS_API_KEY (content:read)
npm install
npm run dev                  # http://localhost:3000  → blog index → /blog/<slug>
```

Assumes the workspace has a `blog-post` model (override with `BETTERCMS_BLOG_MODEL`)
whose entries have an `author` reference to an `author` model.

## The validation gate (integration test)

`test/chain.integration.test.ts` is the **automated** version of the gate — it
provisions its own model/entries via the Management API, publishes, fetches through the
live delivery API, asserts the Author reference is hydrated at `depth=1` (and is a raw
id at `depth=0`), then tears everything down. No fixtures to maintain, no residue.

```bash
# needs a content:manage key (provisions + cleans up); skipped if unset
BETTERCMS_API_URL=https://api.bettercms.ai \
BETTERCMS_WORKSPACE=<slug> \
BETTERCMS_MGMT_KEY=bcms_xxx \
npm run test:integration
```

Wire those three env vars into CI to make this a real merge gate.
