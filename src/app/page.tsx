import PostGrid, { type Post } from "@/components/PostGrid";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  subtitle,
  slug,
  publishedAt,
  image,
  excerpt,
  readingTime,
  highlight,
  tags,
  language
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts: Post[] = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <>
      <PostGrid posts={posts} />
    </>
  );
}
