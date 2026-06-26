import { notFound } from "next/navigation";
import Link from "next/link";
import { listEntries, getEntry } from "../../../lib/content";
import { authorData, type BlogPostFields } from "../../../lib/cms";
import { SiteChrome } from "../../../components/SiteChrome";

export const dynamicParams = false;
export function generateStaticParams() {
  return listEntries<BlogPostFields>("blog-post").map((e) => ({ slug: e.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getEntry<BlogPostFields>("blog-post", slug);
  if (!post) notFound();

  const f = post.data;
  const author = authorData(f.author);

  return (
    <SiteChrome>
      <article className="article">
        <Link className="back-link" href="/blog">← Back to blog</Link>
        <h1>{f.title}</h1>
        <p className="byline">
          {author && <>By <strong>{author.name}</strong>{author.role ? `, ${author.role}` : ""}</>}
          {author && f.publishedDate ? " · " : ""}
          {f.publishedDate}
        </p>
        {f.coverImage?.url && <img className="cover" src={f.coverImage.url} alt={f.coverImage.alt ?? ""} />}
        {f.body?.html && <div className="prose" dangerouslySetInnerHTML={{ __html: f.body.html }} />}
      </article>
    </SiteChrome>
  );
}
