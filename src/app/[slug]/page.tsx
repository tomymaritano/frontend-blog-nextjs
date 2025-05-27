import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";

import PostHeader from "@/components/PostHeader";
import PostBody from "@/components/PostBody";
import PostTags from "@/components/PostTags";
import PostAttachments from "@/components/PostAttachments";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  subtitle,
  slug,
  publishedAt,
  image,
  excerpt,
  body,
  readingTime,
  highlight,
  tags,
  language,
  featured,
  authorName,
  cta,
  attachments[]{
    asset->{
      url,
      originalFilename
    }
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.image ? urlFor(post.image)?.width(1000).height(500).url() : null;

  return (
    <main className="max-w-3xl mx-auto px-6 py-6">
      {/* Back link */}
      <Link href="/" className="text-orange-400 hover:underline text-sm mb-12 block">
        ← Back to homepage
      </Link>

      {/* Cover image */}
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="w-full h-auto rounded-xl mb-8"
        />
      )}

      {/* Title + Subtitle + Meta */}
      <PostHeader
        title={post.title}
        subtitle={post.subtitle}
        publishedAt={post.publishedAt}
        readingTime={post.readingTime}
        language={post.language}
        authorName={post.authorName}
      />

      {/* Highlight */}
      {post.highlight && (
        <blockquote className="border-l-4 border-teal-500 pl-4 italic text-teal-300 mb-10">
          “{post.highlight}”
        </blockquote>
      )}

      {/* Body */}
      <PostBody value={post.body} />

      {/* Tags */}
      <PostTags tags={post.tags} />

      {/* Attachments */}
      <PostAttachments attachments={post.attachments} />

      {/* Call to action */}
      {post.cta?.text && post.cta?.url && (
        <div className="mt-16 text-center">
          <a
            href={post.cta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-teal-500 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-400 transition"
          >
            {post.cta.text}
          </a>
        </div>
      )}
    </main>
  );
}
