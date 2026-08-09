import { useEffect, useRef } from "react";
import { Check, Info, Plus, Users, X } from "lucide-react";
import Button from "../../../components/Button";
import type { Customer } from "../customer.types";
import StatusBadge from "./StatusBadge";

type CustomerSuccessModalProps = {
  customer: Customer | null;
  onViewCustomers: () => void;
  onRegisterAnother: () => void;
  onClose: () => void;
};

const CustomerSuccessModal = ({
  customer,
  onViewCustomers,
  onRegisterAnother,
  onClose,
}: CustomerSuccessModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!customer) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const dialog = dialogRef.current;
    const focusableElements = dialog?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    focusableElements?.[0]?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusableElements?.length) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [customer, onClose]);

  if (!customer) return null;

  const registrationDate = new Intl.DateTimeFormat("en-NG", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${customer.dateRegistered}T00:00:00Z`));

  const summaryItems = [
    { label: "Business Name", value: customer.businessName },
    { label: "Business Type", value: customer.customerType },
    { label: "Industry", value: customer.industry },
    { label: "Contact Person", value: customer.contactPerson },
    { label: "Email", value: customer.email, href: `mailto:${customer.email}` },
    { label: "Phone", value: customer.phone, href: `tel:${customer.phone}` },
    { label: "Date Registered", value: registrationDate },
  ];

  const statusMessage =
    {
      Active: "has been onboarded and added to your customer portfolio.",
      Pending:
        "has been added to your customer portfolio and is awaiting onboarding.",
      Inactive:
        "has been added to your customer portfolio and marked as inactive.",
    }[customer.status] ?? "has been added to your customer portfolio.";

  const nextStepMessage =
    {
      Active:
        "Onboarding is complete. The assigned Relationship Manager can continue managing the customer relationship.",
      Pending:
        "A welcome notification has been queued. The assigned Relationship Manager will be notified to complete KYC and onboarding within 2 business days.",
      Inactive:
        "No onboarding actions will begin while this account is inactive. Activate the customer when they are ready to begin onboarding.",
    }[customer.status] ??
    "The assigned Relationship Manager will be notified about this registration.";

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center sm:items-center sm:p-5">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close registration confirmation"
        tabIndex={-1}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="customer-success-title"
        aria-describedby="customer-success-description"
        className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-border bg-card text-card-foreground shadow-2xl sm:rounded-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="icon-button absolute right-4 top-4 z-10"
          aria-label="Close registration confirmation"
        >
          <X aria-hidden="true" size={20} />
        </button>

        <div className="overflow-y-auto px-5 pb-6 pt-8 sm:px-8 sm:pt-9">
          <div className="text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
              <Check aria-hidden="true" size={31} strokeWidth={2.25} />
            </span>
            <h2
              id="customer-success-title"
              className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Customer successfully registered
            </h2>
            <p
              id="customer-success-description"
              className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base"
            >
              <strong className="font-semibold text-card-foreground">
                {customer.businessName}
              </strong>{" "}
              {statusMessage}
            </p>
          </div>

          <section
            className="mt-7 overflow-hidden rounded-lg border border-border"
            aria-labelledby="registration-summary-title"
          >
            <div className="flex items-center justify-between gap-4 bg-muted/70 px-4 py-3.5 sm:px-5">
              <h3 id="registration-summary-title" className="font-semibold">
                Registration summary
              </h3>
              <span className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs font-medium text-primary">
                {customer.id}
              </span>
            </div>
            <dl className="divide-y divide-border px-4 sm:px-5">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 py-3 sm:grid-cols-[145px_1fr] sm:gap-5"
                >
                  <dt className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="min-w-0 wrap-break-word text-sm font-medium text-card-foreground">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:text-primary hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
              <div className="grid gap-1 py-3 sm:grid-cols-[145px_1fr] sm:gap-5">
                <dt className="text-sm font-medium text-muted-foreground">
                  Status
                </dt>
                <dd>
                  <StatusBadge status={customer.status} />
                </dd>
              </div>
            </dl>
          </section>

          <div className="mt-4 flex gap-3 rounded-lg border border-border bg-secondary/60 p-4 text-sm leading-6 text-muted-foreground">
            <Info
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-primary"
              size={18}
            />
            <p>{nextStepMessage}</p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-border bg-muted/40 px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={onRegisterAnother}
            className="secondary-button"
          >
            <Plus aria-hidden="true" size={17} />
            Register another customer
          </button>
          <Button
            action={onViewCustomers}
            Icon={Users}
            label="View all customers"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerSuccessModal;
