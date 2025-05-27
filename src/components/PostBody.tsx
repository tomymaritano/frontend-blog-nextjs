import { PortableText } from "next-sanity";

export default function PostBody({ value }: { value: any }) {
  return (
    <div className="prose prose-invert lg:prose-lg max-w-none leading-relaxed text-gray-300">
      <PortableText value={value} />
    </div>
  );
}
