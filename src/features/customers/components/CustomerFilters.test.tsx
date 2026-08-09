import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import CustomerFilters from "./CustomerFilters";

afterEach(() => {
  cleanup();
});

describe("CustomerFilters", () => {
  it("changes the status and resets the page", async () => {
    const user = userEvent.setup();

    const setFilters = vi.fn();
    const setCurrentPage = vi.fn();

    const filters = {
      status: "All",
      industry: "All",
      type: "All",
    } as const;

    render(
      <CustomerFilters
        filters={filters}
        setCurrentPage={setCurrentPage}
        setFilters={setFilters}
      />,
    );

    const statusSelect = screen.getByRole("combobox", {
      name: "Filter by customer status",
    });

    await user.selectOptions(statusSelect, "Active");

    expect(setFilters).toHaveBeenCalled();

    const updateFilters = setFilters.mock.calls[0][0];
    const updatedFilters = updateFilters(filters);

    expect(updatedFilters.status).toBe("Active");
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });
  it("changes the industry and resets the page", async () => {
    const user = userEvent.setup();

    const setFilters = vi.fn();
    const setCurrentPage = vi.fn();

    const filters = {
      status: "All",
      industry: "All",
      type: "All",
    } as const;

    render(
      <CustomerFilters
        filters={filters}
        setCurrentPage={setCurrentPage}
        setFilters={setFilters}
      />,
    );

    const industrySelect = screen.getByRole("combobox", {
      name: "Filter by industry",
    });

    await user.selectOptions(industrySelect, "Finance");

    const updateFilters = setFilters.mock.calls[0][0];
    const updatedFilters = updateFilters(filters);

    expect(updatedFilters.industry).toBe("Finance");
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });
  it("changes the customer type and resets the page", async () => {
    const user = userEvent.setup();

    const setFilters = vi.fn();
    const setCurrentPage = vi.fn();

    const filters = {
      status: "All",
      industry: "All",
      type: "All",
    } as const;

    render(
      <CustomerFilters
        filters={filters}
        setCurrentPage={setCurrentPage}
        setFilters={setFilters}
      />,
    );

    const typeSelect = screen.getByRole("combobox", {
      name: "Filter by customer type",
    });

    await user.selectOptions(typeSelect, "SME");

    const updateFilters = setFilters.mock.calls[0][0];
    const updatedFilters = updateFilters(filters);

    expect(updatedFilters.type).toBe("SME");
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });
  it("preserves the other filters when changing status", async () => {
    const user = userEvent.setup();

    const setFilters = vi.fn();
    const setCurrentPage = vi.fn();

    const filters = {
      status: "All",
      industry: "Finance",
      type: "SME",
    } as const;

    render(
      <CustomerFilters
        filters={filters}
        setCurrentPage={setCurrentPage}
        setFilters={setFilters}
      />,
    );

    const statusSelect = screen.getByRole("combobox", {
      name: "Filter by customer status",
    });

    await user.selectOptions(statusSelect, "Active");

    const updateFilters = setFilters.mock.calls[0][0];
    const updatedFilters = updateFilters(filters);

    expect(updatedFilters).toEqual({
      status: "Active",
      industry: "Finance",
      type: "SME",
    });
  });
});
