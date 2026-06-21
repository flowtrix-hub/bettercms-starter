import { notFound } from "next/navigation";
import { cms, authorData } from "../../../lib/cms";

// Single Blog Post. depth:1 hydrates the Author reference in one request (no N+1),
// so we can render the author inline without a second fetch — the crux of FLO-95.
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await cms.getEntry<{ title: string; author?: unknown }>(slug, {
    depth: 1,
    tags: [`post:${slug}`],
  });
  if (!post) notFound();

  const author = authorData(post.fields.author as never);

  return (
    <article>
      <h1>{post.fields.title}</h1>
      {author && (
        <p style={{ color: "#666" }}>
          By <strong>{author.name}</strong>
          {author.bio ? ` — ${author.bio}` : ""}
        </p>
      )}
    </article>
  );
}
