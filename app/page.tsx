import Link from "next/link";
import { cms } from "../lib/cms";

// Blog index — lists published Blog Posts from the delivery API.
export default async function Home() {
  const { items } = await cms.listEntries("blog-post", { perPage: 20 });

  return (
    <main>
      <h1>Blog</h1>
      {items.length === 0 && <p>No published posts yet.</p>}
      <ul>
        {items.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.fields.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
