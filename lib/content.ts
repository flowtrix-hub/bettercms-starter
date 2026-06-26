import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Read content entries from the deploy Action's build snapshot (`bcms-content.json`,
 * `collections` keyed by model slug, depth-1 hydrated). Pages + forms come from the SDK's
 * readers (`getPage`/`readForms`); entries we read here. Absent file → empty (e.g. before
 * `npm run fetch-content` locally).
 */
export type SnapshotEntry<T> = { slug: string; data: T };

let cache: Record<string, SnapshotEntry<unknown>[]> | null = null;

function collections(): Record<string, SnapshotEntry<unknown>[]> {
  if (cache) return cache;
  try {
    const raw = readFileSync(resolve(process.cwd(), "bcms-content.json"), "utf8");
    cache = (JSON.parse(raw).collections ?? {}) as Record<string, SnapshotEntry<unknown>[]>;
  } catch {
    cache = {};
  }
  return cache;
}

export function listEntries<T>(model: string): SnapshotEntry<T>[] {
  return (collections()[model] ?? []) as SnapshotEntry<T>[];
}

export function getEntry<T>(model: string, slug: string): SnapshotEntry<T> | undefined {
  return listEntries<T>(model).find((e) => e.slug === slug);
}
