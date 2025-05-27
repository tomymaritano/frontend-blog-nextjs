import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

type PostBodyProps = {
  value: PortableTextBlock[];
};

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export default function PostBody({ value }: PostBodyProps) {
  return (
    <div className="prose prose-invert prose-pre:bg-gray-900 prose-img:rounded-xl prose-a:text-orange-400 hover:prose-a:text-orange-300 lg:prose-lg max-w-none leading-relaxed text-gray-300">
      <PortableText
        value={value}
        components={{
          types: {
            image: ({ value }) => {
              const imageUrl = value?.asset?._ref ? urlFor(value).width(800).height(450).url() : null;

              if (!imageUrl) return null;

              return (
                <Image
                  src={imageUrl}
                  alt={value?.alt || "Post image"}
                  width={800}
                  height={450}
                  className="rounded-xl my-6"
                />
              );
            },
            code: ({ value }) => (
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{value.code}</code>
              </pre>
            ),
          },
        }}
      />
    </div>
  );
}
