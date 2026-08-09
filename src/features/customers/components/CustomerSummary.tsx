import { Users } from "lucide-react";

type CustomerSummaryProps = {
  values: {
    activeCustomers: number;
    pendingReview: number;
    inactiveCustomers: number;
  };
};

const CustomerSummary = ({ values }: CustomerSummaryProps) => {
  const totalCustomers =
    values.activeCustomers + values.pendingReview + values.inactiveCustomers;
  const activePercentage =
    totalCustomers > 0
      ? ((values.activeCustomers / totalCustomers) * 100).toFixed(1)
      : 0;

  const kpis = [
    {
      label: "Total Customers",
      value: totalCustomers,
      detail: "All registered accounts",
      color: "bg-primary",
    },
    {
      label: "Active Customers",
      value: values.activeCustomers,
      detail: `${activePercentage}% of portfolio`,
      color: "bg-emerald-500",
    },
    {
      label: "Pending Review",
      value: values.pendingReview,
      detail: "Awaiting onboarding",
      color: "bg-amber-500",
    },
    {
      label: "Inactive Customers",
      value: values.inactiveCustomers,
      detail: "Dormant accounts",
      color: "bg-slate-400",
    },
  ];

  return (
    <section aria-labelledby="portfolio-summary-title">
      <h2 id="portfolio-summary-title" className="sr-only">
        Customer portfolio summary
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item, index) => (
          <article key={item.label} className="surface-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-card-foreground">
                  {item.value}
                </p>
              </div>
              {index === 0 && (
                <span className="rounded-lg bg-secondary p-2.5 text-primary">
                  <Users aria-hidden="true" size={20} />
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`size-2 rounded-full ${item.color}`} />
              {item.detail}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CustomerSummary;
