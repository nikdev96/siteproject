interface DocCardProps {
  title: string;
  description: string;
  onDownload?: () => void;
}

export default function DocCard({ title, description, onDownload }: DocCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
        <button
          onClick={onDownload}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Скачать
        </button>
      </div>
    </div>
  );
}
