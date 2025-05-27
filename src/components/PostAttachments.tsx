type Attachment = {
  asset: {
    url: string;
    originalFilename: string;
  };
};

export default function PostAttachments({ attachments }: { attachments: Attachment[] }) {
  if (!attachments?.length) return null;

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-2 text-white">📎 Attachments</h3>
      <ul className="list-disc pl-5 space-y-1 text-sm text-teal-300">
        {attachments.map((file) => (
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
  );
}
