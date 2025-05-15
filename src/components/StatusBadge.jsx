import clsx from 'clsx';

const colorMap = {
  NEW: 'bg-status-new',
  UNDER_REVIEW: 'bg-status-review',
  PRICED: 'bg-status-priced',
  SENT: 'bg-status-sent',
};

export default function StatusBadge({ label }) {
  return (
    <span
      className={clsx(
        'text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap',
        colorMap[label] ?? 'bg-gray-400'
      )}
    >
      {label.replace('_', ' ')}
    </span>
  );
}