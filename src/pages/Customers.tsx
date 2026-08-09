import { useCallback, useState } from "react";
import CustomerFilters from "../features/customers/components/CustomerFilters";
import {
  CustomerEmpty,
  CustomerError,
  CustomerLoading,
} from "../features/customers/components/CustomerFeedback";
import CustomerHeader from "../features/customers/components/CustomerHeader";
import CustomerPagination from "../features/customers/components/CustomerPagination";
import CustomerSearchbar from "../features/customers/components/CustomerSearchbar";
import CustomerState from "../features/customers/components/CustomerState";
import CustomerSummary from "../features/customers/components/CustomerSummary";
import CustomerTable from "../features/customers/components/CustomerTable";
import RegisterCustomerModal from "../features/customers/components/RegisterCustomerModal";
import CustomerSuccessModal from "../features/customers/components/CustomerSuccessModal";
import type { CustomerFormData } from "../features/customers/customer.schema";
import type {
  Customer,
  CustomerFiltersTypes,
  State,
} from "../features/customers/customer.types";
import {
  useCreateCustomer,
  useCustomers,
} from "../features/customers/hooks/useCustomers";
import { filterCustomers } from "../features/customers/utils/customer.utils";
import { paginateCustomers } from "../features/customers/utils/pagination.utils";

const initialFilters: CustomerFiltersTypes = {
  status: "All",
  type: "All",
  industry: "All",
};

const PAGE_SIZE = 10;

const Customers = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [state, setState] = useState<State>("normal");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [createdCustomer, setCreatedCustomer] = useState<Customer | null>(null);
  const {
    mutateAsync: createCustomer,
    reset: resetCreateCustomer,
    error: createCustomerError,
  } = useCreateCustomer();
  const {
    data: customers = [],
    isError,
    isLoading,
    refetch,
    isRefetching,
  } = useCustomers();

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;
  const pendingReview = customers.filter(
    (customer) => customer.status === "Pending",
  ).length;
  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive",
  ).length;

  const filteredCustomers = filterCustomers(customers, search, filters);
  const hasNoMatches =
    customers.length > 0 && filteredCustomers.length === 0;

  const totalPages = Math.ceil(filteredCustomers.length / PAGE_SIZE);
  const totalItems = filteredCustomers.length;
  const paginatedCustomers = paginateCustomers(
    filteredCustomers,
    currentPage,
    PAGE_SIZE,
  );

  const handleRetry = async () => {
    const { isSuccess } = await refetch();

    if (isSuccess) {
      setState("normal");
    }
  };

  const closeRegisterModal = useCallback(() => {
    setIsRegisterOpen(false);
    resetCreateCustomer();
  }, [resetCreateCustomer]);

  const closeSuccessModal = useCallback(() => {
    setCreatedCustomer(null);
  }, []);

  const handleViewCustomers = useCallback(() => {
    setSearch("");
    setFilters(initialFilters);
    setCurrentPage(Math.max(1, Math.ceil(customers.length / PAGE_SIZE)));
    setCreatedCustomer(null);
  }, [customers.length]);

  const handleCreateCustomer = async (data: CustomerFormData) => {
    try {
      const customer = await createCustomer(data);
      setCreatedCustomer(customer);
      setIsRegisterOpen(false);
    } catch {
      // The mutation exposes the error to the registration modal.
    }
  };

  const handleRegisterAnother = useCallback(() => {
    setCreatedCustomer(null);
    resetCreateCustomer();
    setIsRegisterOpen(true);
  }, [resetCreateCustomer]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <CustomerHeader onRegister={() => setIsRegisterOpen(true)} />
      <CustomerSummary
        values={{
          activeCustomers,
          pendingReview,
          inactiveCustomers,
        }}
      />

      <section
        className="surface-card overflow-hidden"
        aria-labelledby="customer-list-title"
      >
        <div className="flex flex-col gap-4 border-b border-border px-4 py-4 sm:px-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2
              id="customer-list-title"
              className="font-semibold text-card-foreground"
            >
              Customer directory
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              View and manage all registered customer accounts
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-2 md:flex-row xl:justify-end">
            <CustomerSearchbar
              search={search}
              setSearch={setSearch}
              setCurrentPage={setCurrentPage}
            />
            <CustomerFilters
              filters={filters}
              setFilters={setFilters}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <CustomerState state={state} setState={setState} />

        {isLoading || state === "loading" ? (
          <CustomerLoading />
        ) : isError || state === "error" ? (
          <CustomerError
            handleRetry={handleRetry}
            isRefetching={isRefetching}
          />
        ) : state === "empty" || paginatedCustomers.length === 0 ? (
          <CustomerEmpty
            onRegister={() => setIsRegisterOpen(true)}
            hasNoMatches={state === "normal" && hasNoMatches}
          />
        ) : (
          <CustomerTable customers={paginatedCustomers} />
        )}

        {!isLoading &&
          !isError &&
          state === "normal" &&
          filteredCustomers.length > 0 && (
          <CustomerPagination
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>

      <RegisterCustomerModal
        isOpen={isRegisterOpen}
        onClose={closeRegisterModal}
        onCreate={handleCreateCustomer}
        creationError={
          createCustomerError instanceof Error
            ? createCustomerError.message
            : null
        }
      />
      <CustomerSuccessModal
        customer={createdCustomer}
        onClose={closeSuccessModal}
        onViewCustomers={handleViewCustomers}
        onRegisterAnother={handleRegisterAnother}
      />
    </div>
  );
};

export default Customers;
