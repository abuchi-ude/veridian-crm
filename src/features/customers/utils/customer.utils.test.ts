import { describe, it, expect } from "vitest";
import { filterCustomers } from "./customer.utils";
import { customers } from "../customers.mock";

describe("filterCustomers", () => {
  it("returns all customers when no filter is applied", () => {
    const result = filterCustomers(customers, "", {
      status: "All",
      industry: "All",
      type: "All",
    });

    expect(result).toEqual(customers);
  });
  it("finds customer by business name", () => {
    const result = filterCustomers(customers, "heri", {
      status: "All",
      industry: "All",
      type: "All",
    });

    expect(result).toEqual(
      customers.filter((customer) =>
        customer.businessName.toLowerCase().includes("heri"),
      ),
    );
  });
  it("finds customer by contact person", () => {
    const result = filterCustomers(customers, "sam", {
      status: "All",
      industry: "All",
      type: "All",
    });

    expect(result).toEqual(
      customers.filter((customer) =>
        customer.contactPerson.toLowerCase().includes("sam"),
      ),
    );
  });
  it("finds customer by email", () => {
    const result = filterCustomers(customers, "mich", {
      status: "All",
      industry: "All",
      type: "All",
    });

    expect(result).toEqual(
      customers.filter((customer) =>
        customer.email.toLowerCase().includes("mich"),
      ),
    );
  });
  it("filters by status", () => {
    const result = filterCustomers(customers, "", {
      status: "Pending",
      industry: "All",
      type: "All",
    });

    expect(result).toEqual(
      customers.filter((customer) => customer.status === "Pending"),
    );
  });
  it("filters by type", () => {
    const result = filterCustomers(customers, "", {
      status: "All",
      industry: "All",
      type: "SME",
    });

    expect(result).toEqual(
      customers.filter((customer) => customer.customerType === "SME"),
    );
  });
  it("filters by industry", () => {
    const result = filterCustomers(customers, "", {
      status: "All",
      industry: "Finance",
      type: "All",
    });

    expect(result).toEqual(
      customers.filter((customer) => customer.industry === "Finance"),
    );
  });
  it("combines search and filters", () => {
    const result = filterCustomers(customers, "heri", {
      status: "Inactive",
      industry: "Education",
      type: "All",
    });

    expect(result).toEqual([
      expect.objectContaining({
        businessName: "Heritage University",
        status: "Inactive",
        industry: "Education",
      }),
    ]);
  });
  it("returns an empty array when nothing matches", () => {
    const result = filterCustomers(customers, "hericage", {
      status: "Inactive",
      industry: "Finance",
      type: "All",
    });

    expect(result).toEqual([]);
  });
});
