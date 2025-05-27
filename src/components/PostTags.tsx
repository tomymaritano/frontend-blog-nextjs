export default function PostTags({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;

  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full border border-white/10"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
