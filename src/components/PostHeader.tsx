type PostHeaderProps = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  readingTime?: number;
  language?: string;
  authorName?: string;
};

export default function PostHeader({
  title,
  subtitle,
  publishedAt,
  readingTime,
  language,
  authorName,
}: PostHeaderProps) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-2 text-white">{title}</h1>
      {subtitle && (
        <p className="text-xl text-gray-300 italic mb-6">{subtitle}</p>
      )}
      <div className="text-sm text-gray-400 mb-10 flex flex-wrap gap-4">
        <span>{new Date(publishedAt).toLocaleDateString("es-AR")}</span>
        {readingTime && <span>• ⏱ {readingTime} min</span>}
        {language && <span>• 🌐 {language.toUpperCase()}</span>}
        {authorName && <span>• ✍️ {authorName}</span>}
      </div>
    </>
  );
}
