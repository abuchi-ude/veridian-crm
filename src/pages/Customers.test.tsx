import {
  fireEvent,
  render,
  screen,
  within,
  cleanup,
} from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import Customers from "./Customers";

afterEach(() => {
  cleanup();
});

const mockCreateCustomer = vi.fn();
const mockRefetch = vi.fn();

vi.mock("../features/customers/hooks/useCustomers", () => ({
  useCustomers: () => ({
    data: [],
    isError: false,
    isLoading: false,
    refetch: mockRefetch,
    isRefetching: false,
  }),

  useCreateCustomer: () => ({
    mutateAsync: mockCreateCustomer,
    reset: vi.fn(),
    error: null,
  }),
}));

describe("Customers", () => {
  it("opens the registration form", async () => {
    render(<Customers />);

    const header = screen.getByRole("banner");

    const registerButton = within(header).getByRole("button", {
      name: "Register Customer",
    });

    fireEvent.click(registerButton);

    expect(
      await screen.findByRole("dialog", {
        name: /register new customer/i,
      }),
    ).toBeInTheDocument();
  });

  it("creates a customer and shows the success state", async () => {
    const createdCustomer = {
      id: "C004",
      businessName: "Acme Ltd",
      customerType: "Corporate",
      industry: "Technology",
      contactPerson: "John Doe",
      email: "john@acme.com",
      phone: "+2348012345678",
      dateRegistered: "2026-08-06",
      status: "Pending",
    };

    mockCreateCustomer.mockResolvedValue(createdCustomer);

    render(<Customers />);

    // Target the page-level Register Customer button.
    const header = screen.getByRole("banner");

    const registerButton = within(header).getByRole("button", {
      name: "Register Customer",
    });

    fireEvent.click(registerButton);

    // Wait for the registration modal.
    const registerDialog = await screen.findByRole("dialog", {
      name: /register new customer/i,
    });

    // Fill in the customer form.
    fireEvent.change(within(registerDialog).getByLabelText(/business name/i), {
      target: { value: "Acme Ltd" },
    });

    fireEvent.change(within(registerDialog).getByLabelText(/customer type/i), {
      target: { value: "Corporate" },
    });

    fireEvent.change(within(registerDialog).getByLabelText(/industry/i), {
      target: { value: "Technology" },
    });

    fireEvent.change(within(registerDialog).getByLabelText(/contact person/i), {
      target: { value: "John Doe" },
    });

    fireEvent.change(within(registerDialog).getByLabelText(/email/i), {
      target: { value: "john@acme.com" },
    });

    fireEvent.change(within(registerDialog).getByLabelText(/phone/i), {
      target: { value: "+2348012345678" },
    });

    // Submit the registration form.
    const submitButton = within(registerDialog).getByRole("button", {
      name: "Register Customer",
    });

    fireEvent.click(submitButton);

    // The success modal should appear after creation.
    const successDialog = await screen.findByRole("dialog", {
      name: /customer successfully registered/i,
    });

    expect(successDialog).toBeInTheDocument();

    // Verify the success heading.
    expect(
      within(successDialog).getByRole("heading", {
        name: "Customer successfully registered",
      }),
    ).toBeInTheDocument();

    // Acme Ltd appears twice, so target the <strong> specifically.
    expect(
      within(successDialog).getByText("Acme Ltd", {
        selector: "strong",
      }),
    ).toBeInTheDocument();

    // Verify the generated customer ID.
    expect(within(successDialog).getByText("C004")).toBeInTheDocument();

    // Verify the customer status.
    expect(
      within(successDialog).getByText("Pending", {
        exact: true,
      }),
    ).toBeInTheDocument();

    // Verify the next action is available.
    expect(
      within(successDialog).getByRole("button", {
        name: "View all customers",
      }),
    ).toBeInTheDocument();
  });
});
