import type { Customer, CustomerFiltersTypes } from "../customer.types";

export function filterCustomers(
  customers: Customer[],
  search: string,
  filters: CustomerFiltersTypes,
) {
  const query = search.trim().toLowerCase();
  return customers.filter((customer) => {
    const matchesSearch =
      query === "" ||
      customer.businessName.toLowerCase().includes(query) ||
      customer.contactPerson.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query);

    const matchesStatus =
      filters.status === "All" || customer.status === filters.status;
    const matchesType =
      filters.type === "All" || customer.customerType === filters.type;
    const matchesIndustry =
      filters.industry === "All" || customer.industry === filters.industry;

    return matchesSearch && matchesStatus && matchesType && matchesIndustry;
  });
}
