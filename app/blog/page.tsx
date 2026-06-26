import Link from "next/link";
import type { Metadata } from "next";
import { listEntries } from "../../lib/content";
import type { BlogPostFields } from "../../lib/cms";
import { SiteChrome } from "../../components/SiteChrome";

export const metadata: Metadata = { title: "Blog — Acme", description: "Articles and updates from the Acme team." };

export default function BlogIndex() {
  const items = listEntries<BlogPostFields>("blog-post");
  return (
    <SiteChrome>
      <main className="container">
        <header className="page-head">
          <h1>Blog</h1>
          <p>Ideas on shipping faster with structured content.</p>
        </header>
        {items.length === 0 ? (
          <p>No published posts yet.</p>
        ) : (
          <div className="card-grid">
            {items.map(({ slug, data }) => (
              <article className="card" key={slug}>
                <Link href={`/blog/${slug}`}>
                  {data.coverImage?.url && (
                    <img className="thumb" src={data.coverImage.url} alt={data.coverImage.alt ?? ""} />
                  )}
                  <div className="body">
                    {data.publishedDate && <span className="eyebrow">{data.publishedDate}</span>}
                    <h3>{data.title}</h3>
                    {data.excerpt && <p>{data.excerpt}</p>}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </SiteChrome>
  );
}
