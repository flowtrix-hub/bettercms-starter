import Link from "next/link";
import type { Metadata } from "next";
import { listEntries } from "../../lib/content";
import type { CaseStudyFields } from "../../lib/cms";
import { SiteChrome } from "../../components/SiteChrome";

export const metadata: Metadata = { title: "Case Studies — Acme", description: "How teams ship faster with Acme." };

export default function CaseStudiesIndex() {
  const items = listEntries<CaseStudyFields>("case-study");
  return (
    <SiteChrome>
      <main className="container">
        <header className="page-head">
          <h1>Case Studies</h1>
          <p>Real teams, real results.</p>
        </header>
        {items.length === 0 ? (
          <p>No published case studies yet.</p>
        ) : (
          <div className="card-grid">
            {items.map(({ slug, data }) => (
              <article className="card" key={slug}>
                <Link href={`/case-studies/${slug}`}>
                  {data.coverImage?.url && (
                    <img className="thumb" src={data.coverImage.url} alt={data.coverImage.alt ?? ""} />
                  )}
                  <div className="body">
                    {data.result && <span className="eyebrow">{data.result}</span>}
                    <h3>{data.title}</h3>
                    {data.summary && <p>{data.summary}</p>}
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
