import { useEffect, useRef } from "react";
import { Building2, X } from "lucide-react";
import {
  registrationCustomerTypes,
  registrationIndustries,
  registrationCustomerStatuses,
} from "../customer.constants";
import { useForm } from "react-hook-form";
import type { CustomerFormData } from "../customer.schema";
import { customerSchema } from "../customer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, SelectField } from "../../../components/FormField";

type RegisterCustomerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CustomerFormData) => Promise<void>;
  creationError: string | null;
};

const businessTypes = registrationCustomerTypes;
const industryOptions = registrationIndustries;
const statusRadioOptions = registrationCustomerStatuses;

const RegisterCustomerModal = ({
  isOpen,
  onClose,
  onCreate,
  creationError,
}: RegisterCustomerModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const dialog = dialogRef.current;
    const focusableElements = dialog?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
  }, [isOpen, onClose]);

  const onSubmit = async (data: CustomerFormData) => {
    await onCreate(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center sm:items-center sm:p-5">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close register customer form"
        tabIndex={-1}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-customer-title"
        aria-describedby="register-customer-description"
        className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-border bg-card text-card-foreground shadow-2xl sm:rounded-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-7">
          <div className="flex gap-3">
            <span className="mt-0.5 rounded-lg bg-secondary p-2.5 text-primary">
              <Building2 aria-hidden="true" size={21} />
            </span>
            <div>
              <h2
                id="register-customer-title"
                className="text-xl font-semibold"
              >
                Register new customer
              </h2>
              <p
                id="register-customer-description"
                className="mt-1 text-sm text-muted-foreground"
              >
                Add a business customer and their primary contact details.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="icon-button"
            aria-label="Close form"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <form
          className="overflow-y-auto"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          {creationError && (
            <div
              role="alert"
              className="mx-5 mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/25 dark:bg-red-400/10 dark:text-red-300 sm:mx-7"
            >
              {creationError}
            </div>
          )}
          <div className="space-y-7 px-5 py-6 sm:px-7">
            <fieldset>
              <legend className="text-sm font-semibold text-card-foreground">
                Business information
              </legend>
              <p className="mt-1 text-xs text-muted-foreground">
                Basic information about the customer account.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FormField
                    id="business-name"
                    label="Business name"
                    placeholder="Enter registered business name"
                    error={errors.businessName?.message}
                    {...register("businessName")}
                  />
                </div>
                <SelectField
                  id="customer-type"
                  label="Customer type"
                  placeholder="Select customer type"
                  options={businessTypes}
                  defaultValue=""
                  error={errors.customerType?.message}
                  {...register("customerType")}
                />
                <SelectField
                  id="customer-industry"
                  label="Industry"
                  placeholder="Select industry"
                  options={industryOptions}
                  defaultValue=""
                  error={errors.industry?.message}
                  {...register("industry")}
                />
              </div>
            </fieldset>

            <div className="border-t border-border" />

            <fieldset>
              <legend className="text-sm font-semibold text-card-foreground">
                Primary contact
              </legend>
              <p className="mt-1 text-xs text-muted-foreground">
                Contact information for the account representative.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FormField
                    id="contact-person"
                    label="Contact person"
                    placeholder="Enter full name"
                    autoComplete="off"
                    error={errors.contactPerson?.message}
                    {...register("contactPerson")}
                  />
                </div>
                <FormField
                  id="contact-email"
                  label="Email address"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="off"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <FormField
                  id="contact-phone"
                  label="Phone number"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  autoComplete="off"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </div>
            </fieldset>

            <div className="border-t border-border" />

            <fieldset>
              <legend className="text-sm font-semibold text-card-foreground">
                Account status
              </legend>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose the customer’s initial onboarding status.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {statusRadioOptions.map((status) => (
                  <label
                    key={status}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm hover:bg-muted/60 has-checked:border-primary has-checked:bg-secondary"
                  >
                    <input
                      type="radio"
                      value={status}
                      defaultChecked={status === "Pending"}
                      className="size-4 accent-primary"
                      {...register("status")}
                    />
                    {status}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-border bg-card px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className="secondary-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCustomerModal;
