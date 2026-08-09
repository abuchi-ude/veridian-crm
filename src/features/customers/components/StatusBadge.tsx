type StatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  Active:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300",
  Pending:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300",
  Inactive:
    "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-400/10 dark:text-slate-300",
};

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status] ?? statusStyles.Inactive}`}
  >
    <span
      className="mr-1.5 size-1.5 rounded-full bg-current"
      aria-hidden="true"
    />
    {status}
  </span>
);

export default StatusBadge;
