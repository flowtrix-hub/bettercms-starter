import type { Metadata } from "next";
import { getPage, readForms } from "@bettercms-ai/next";
import { BcmsBlocks } from "@bettercms-ai/next/blocks";
import { SiteChrome } from "../components/SiteChrome";

/** Render a CMS page (Home/About/Contact) from the build snapshot, inside the site's nav/footer
 *  chrome. The page's block tree is the body; a `form` block resolves against `readForms()` and
 *  renders <BcmsForm>. */
export function CmsPage({ slug }: { slug: string }) {
  const page = getPage(slug);
  const { forms, turnstileSiteKey } = readForms();
  return (
    <SiteChrome>
      <main className="page-body">
        {page ? (
          <BcmsBlocks blocks={page.blocks} forms={forms} turnstileSiteKey={turnstileSiteKey ?? undefined} />
        ) : (
          <p>This page hasn’t been published yet.</p>
        )}
      </main>
    </SiteChrome>
  );
}

/** Per-page <title>/<meta description> from the snapshot, for the route's generateMetadata. */
export function pageMetadata(slug: string): Metadata {
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
  };
}
