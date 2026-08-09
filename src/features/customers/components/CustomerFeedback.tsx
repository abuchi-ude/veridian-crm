import { AlertTriangle, Inbox, Plus, RefreshCw } from "lucide-react";
import Button from "../../../components/Button";

type CustomerEmptyProp = {
  onRegister: () => void;
  hasNoMatches?: boolean;
};
type CustomerErrorProp = {
  handleRetry: () => void;
  isRefetching: boolean;
};

export const CustomerLoading = () => (
  <div
    className="p-5"
    role="status"
    aria-live="polite"
    aria-label="Loading customers"
  >
    <span className="sr-only">Loading customers...</span>
    <div className="space-y-4 animate-pulse" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, row) => (
        <div
          key={row}
          className="grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1.5fr] gap-5 py-2"
        >
          {Array.from({ length: 5 }).map((__, column) => (
            <div
              key={column}
              className={`h-4 rounded bg-muted ${column === 0 ? "w-4/5" : "w-full"}`}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const CustomerEmpty = ({
  onRegister,
  hasNoMatches = false,
}: CustomerEmptyProp) => (
  <div
    className="flex min-h-80 flex-col items-center justify-center px-6 py-14 text-center"
    role="status"
  >
    <span className="mb-4 rounded-full bg-secondary p-4 text-primary">
      <Inbox aria-hidden="true" size={28} />
    </span>
    <h3 className="text-lg font-semibold text-card-foreground">
      {hasNoMatches ? "No matching customers" : "No customers yet"}
    </h3>
    <p className="my-2 max-w-sm text-sm leading-6 text-muted-foreground">
      {hasNoMatches
        ? "No customers match your current search or filters. Adjust them and try again, or register a new customer."
        : "There are no customers to display yet. Register a customer to get started."}
    </p>
    <Button action={onRegister} Icon={Plus} label="Register Customer" />
  </div>
);

export const CustomerError = ({
  handleRetry,
  isRefetching,
}: CustomerErrorProp) => (
  <div
    className="flex min-h-80 flex-col items-center justify-center px-6 py-14 text-center"
    role="alert"
  >
    <span className="mb-4 rounded-full bg-red-50 p-4 text-red-600 dark:bg-red-400/10 dark:text-red-300">
      <AlertTriangle aria-hidden="true" size={28} />
    </span>
    <h3 className="text-lg font-semibold text-card-foreground">
      Unable to load customers
    </h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
      Something went wrong while retrieving the customer list. Please try again.
    </p>
    <button
      type="button"
      className="secondary-button mt-5"
      disabled={isRefetching}
      onClick={handleRetry}
    >
      <RefreshCw aria-hidden="true" size={16} />
      {isRefetching ? "Trying..." : "Try again"}
    </button>
  </div>
);
