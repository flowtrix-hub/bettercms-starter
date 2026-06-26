import { notFound } from "next/navigation";
import Link from "next/link";
import { listEntries, getEntry } from "../../../lib/content";
import type { CaseStudyFields } from "../../../lib/cms";
import { SiteChrome } from "../../../components/SiteChrome";

export function generateStaticParams() {
  return listEntries<CaseStudyFields>("case-study").map((e) => ({ slug: e.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getEntry<CaseStudyFields>("case-study", slug);
  if (!cs) notFound();

  const f = cs.data;
  return (
    <SiteChrome>
      <article className="article">
        <Link className="back-link" href="/case-studies">← Back to case studies</Link>
        <h1>{f.title}</h1>
        <p className="byline">
          {f.client}
          {f.client && f.result ? " · " : ""}
          {f.result && <strong>{f.result}</strong>}
        </p>
        {f.coverImage?.url && <img className="cover" src={f.coverImage.url} alt={f.coverImage.alt ?? ""} />}
        {f.summary && <p className="prose"><em>{f.summary}</em></p>}
        {f.body?.html && <div className="prose" dangerouslySetInnerHTML={{ __html: f.body.html }} />}
      </article>
    </SiteChrome>
  );
}
