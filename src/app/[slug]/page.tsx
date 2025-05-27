import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";

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
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link href="/" className="text-teal-400 hover:underline text-sm mb-6 block">
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

      {/* Title and subtitle */}
      <h1 className="text-4xl font-bold mb-2 text-white">{post.title}</h1>
      {post.subtitle && (
        <p className="text-xl text-gray-300 italic mb-6">{post.subtitle}</p>
      )}

      {/* Meta info */}
      <div className="text-sm text-gray-400 mb-10 flex flex-wrap gap-4">
        <span>{new Date(post.publishedAt).toLocaleDateString("es-AR")}</span>
        {post.readingTime && <span>• ⏱ {post.readingTime} min</span>}
        {post.language && <span>• 🌐 {post.language.toUpperCase()}</span>}
        {post.authorName && <span>• ✍️ {post.authorName}</span>}
      </div>

      {/* Highlight */}
      {post.highlight && (
        <blockquote className="border-l-4 border-teal-500 pl-4 italic text-teal-300 mb-10">
          “{post.highlight}”
        </blockquote>
      )}

      {/* Body content */}
      <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-gray-300 prose-h2:text-white prose-h2:mt-8 prose-h2:mb-3 prose-li:text-gray-400 max-w-none mb-12">
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Attachments */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2 text-white">📎 Attachments</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-teal-300">
            {post.attachments.map((file: any) => (
              <li key={file.asset.url}>
                <a
                  href={file.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {file.asset.originalFilename}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

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
