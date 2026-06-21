import { createBetterCMS } from "@betttercms/next";

const apiBase = process.env.BETTERCMS_API_URL ?? "https://api.bettercms.ai";

/**
 * The one CMS client the app reads through. Workspace + delivery key come from env;
 * `revalidate` sets the default ISR window so published edits appear without a redeploy.
 * `baseUrl` is the full delivery base (the SDK appends `/:workspace/...`).
 */
export const cms = createBetterCMS<{ "blog-post": BlogPostFields }>({
  workspace: process.env.BETTERCMS_WORKSPACE!,
  apiKey: process.env.BETTERCMS_API_KEY,
  baseUrl: `${apiBase}/api/v1/delivery`,
  revalidate: 60,
});

export type Author = { name: string; bio?: string };

/**
 * A hydrated reference is the nested referenced entry. Read its data defensively:
 * the adapter normalizes a top-level entry's `data` → `fields`, but a nested hydrated
 * ref arrives in the raw delivery shape (`data`), so we accept either.
 */
export type HydratedAuthor = { slug: string; fields?: Author; data?: Author };

/** Blog Post field shape. `author` is a raw id at depth 0, hydrated at depth >= 1. */
export type BlogPostFields = { title: string; author?: HydratedAuthor | string };

export function authorData(author: BlogPostFields["author"]): Author | null {
  if (!author || typeof author === "string") return null;
  return author.fields ?? author.data ?? null;
}
