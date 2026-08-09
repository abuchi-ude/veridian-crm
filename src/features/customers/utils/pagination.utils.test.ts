import { describe, it, expect } from "vitest";
import { paginateCustomers } from "./pagination.utils";
import { customers } from "../customers.mock";

describe("paginateCustomers", () => {
  it("returns the first page of customers", () => {
    const result = paginateCustomers(customers, 1, 10);

    expect(result).toEqual(customers.slice(0, 10));
  });
  it("returns the remaining customers on the last page", () => {
    const result = paginateCustomers(customers, 2, 10);

    expect(result).toEqual(customers.slice(10));
  });
  it("returns an empty array when the page has no customers", () => {
    const result = paginateCustomers(customers, 3, 10);

    expect(result).toEqual([]);
  });
  it("uses the provided page size", () => {
    const result = paginateCustomers(customers, 2, 5);

    expect(result).toEqual(customers.slice(5, 10));
  });
});
