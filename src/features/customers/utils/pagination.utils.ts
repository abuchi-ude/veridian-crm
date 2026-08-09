import type { Customer } from "../customer.types";

export const paginateCustomers = (
  customers: Customer[],
  currentPage: number,
  pageSize: number,
) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  return customers.slice(startIndex, endIndex);
};
