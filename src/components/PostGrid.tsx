"use client";

import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export type Post = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
  publishedAt: string;
  image?: any;
  excerpt?: string;
  readingTime?: number;
  highlight?: string;
  tags?: string[];
  language?: string;
};

export default function PostGrid({ posts }: { posts: Post[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = async (slug: string, id: string) => {
    const url = `${window.location.origin}/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <p className="text-gray-300 text-base md:text-md leading-relaxed mb-0">
          This project is more than just a blog. It's a living playground where I experiment with modern technologies like{" "}
          <span className="text-orange-400 font-medium">Next.js</span>,{" "}
          <span className="text-orange-400 font-medium">Sanity</span>,{" "}
          <span className="text-orange-400 font-medium">Tailwind CSS</span>, and{" "}
          <span className="text-orange-400 font-medium">Typescript</span>, while documenting what I learn along the way.
        </p>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md transition-all hover:shadow-xl"
          >
            <Link href={`/${post.slug.current}`}>
              {post.image && (
                <img
                  src={urlFor(post.image).width(800).height(400).url()}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
                />
              )}
            </Link>

            <div className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Link href={`/${post.slug.current}`}>
                  <h3 className="text-xl font-semibold text-white hover:text-teal-300 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <button
                  onClick={() => handleShare(post.slug.current, post._id)}
                  title="Copiar enlace"
                  className="text-gray-400 hover:text-teal-300 transition"
                >
                  <FaShareAlt />
                </button>
              </div>

              {post.subtitle && (
                <p className="text-sm text-gray-300 italic">{post.subtitle}</p>
              )}

              <p className="text-sm text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                {post.readingTime && ` • ${post.readingTime} min`}
                {post.language && ` • 🌐 ${post.language.toUpperCase()}`}
              </p>

              {post.highlight && (
                <p className="italic text-teal-400 text-sm">“{post.highlight}”</p>
              )}

              {post.excerpt && (
                <p className="text-sm text-gray-300 line-clamp-3">{post.excerpt}</p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {copiedId === post._id && (
                <span className="absolute top-2 right-2 text-xs bg-teal-600 text-white px-2 py-1 rounded shadow">
                  Copiado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
