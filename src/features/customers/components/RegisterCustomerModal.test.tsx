import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, afterEach } from "vitest";
import RegisterCustomerModal from "./RegisterCustomerModal";

afterEach(() => {
  cleanup();
});

describe("RegisterCustomerModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onCreate: vi.fn().mockResolvedValue(undefined),
    creationError: null,
  };

  it("renders the registration form", () => {
    render(<RegisterCustomerModal {...defaultProps} />);

    expect(
      screen.getByRole("dialog", {
        name: "Register new customer",
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Business name")).toBeInTheDocument();
    expect(screen.getByLabelText("Customer type")).toBeInTheDocument();
    expect(screen.getByLabelText("Industry")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact person")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone number")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Register Customer" }),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitted with invalid data", async () => {
    const user = userEvent.setup();

    render(<RegisterCustomerModal {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: "Register Customer" }));

    expect(defaultProps.onCreate).not.toHaveBeenCalled();

    expect(screen.getByText("Business Name is required")).toBeInTheDocument();

    expect(screen.getByLabelText("Business name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );

    expect(screen.getByLabelText("Business name")).toHaveAttribute(
      "aria-describedby",
      "business-name-error",
    );
  });

  it("submits valid customer data", async () => {
    const user = userEvent.setup();

    render(<RegisterCustomerModal {...defaultProps} />);

    await user.type(
      screen.getByLabelText("Business name"),
      "Acme Technologies",
    );

    await user.selectOptions(
      screen.getByLabelText("Customer type"),
      "Corporate",
    );

    await user.selectOptions(screen.getByLabelText("Industry"), "Technology");

    await user.type(screen.getByLabelText("Contact person"), "Samuel Johnson");

    await user.type(screen.getByLabelText("Email address"), "samuel@acme.com");

    await user.type(screen.getByLabelText("Phone number"), "+2348012345678");

    await user.click(screen.getByRole("button", { name: "Register Customer" }));

    expect(defaultProps.onCreate).toHaveBeenCalledWith({
      businessName: "Acme Technologies",
      customerType: "Corporate",
      industry: "Technology",
      contactPerson: "Samuel Johnson",
      email: "samuel@acme.com",
      phone: "+2348012345678",
      status: "Pending",
    });
  });

  it("prevents repeat submission while customer creation is in progress", async () => {
    const user = userEvent.setup();
    let resolveCreation: () => void = () => undefined;
    const creationPromise = new Promise<void>((resolve) => {
      resolveCreation = resolve;
    });
    const onCreate = vi.fn(() => creationPromise);

    render(<RegisterCustomerModal {...defaultProps} onCreate={onCreate} />);

    await user.type(
      screen.getByLabelText("Business name"),
      "Acme Technologies",
    );
    await user.selectOptions(
      screen.getByLabelText("Customer type"),
      "Corporate",
    );
    await user.selectOptions(screen.getByLabelText("Industry"), "Technology");
    await user.type(screen.getByLabelText("Contact person"), "Samuel Johnson");
    await user.type(screen.getByLabelText("Email address"), "samuel@acme.com");
    await user.type(screen.getByLabelText("Phone number"), "+2348012345678");

    await user.click(screen.getByRole("button", { name: "Register Customer" }));

    const submittingButton = await screen.findByRole("button", {
      name: "Registering...",
    });

    expect(submittingButton).toBeDisabled();
    expect(submittingButton).toHaveAttribute("aria-busy", "true");

    await user.click(submittingButton);

    expect(onCreate).toHaveBeenCalledTimes(1);

    resolveCreation();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Register Customer" }),
      ).toBeEnabled();
    });
  });

  it("displays the creation error", () => {
    render(
      <RegisterCustomerModal
        {...defaultProps}
        creationError="Unable to create customer"
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Unable to create customer",
    );
  });
});
