import { describe, it, expect } from "vitest";
import { customerSchema } from "./customer.schema";

const validCustomer = {
  businessName: "Greenfield Farms",
  customerType: "SME",
  industry: "Agriculture",
  contactPerson: "John Doe",
  email: "john@greenfield.com",
  phone: "08012345678",
  status: "Pending",
};

describe("customerSchema", () => {
  it("accepts valid customer data", () => {
    const result = customerSchema.safeParse(validCustomer);

    expect(result.success).toBe(true);
  });
  it("rejects an empty business name", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      businessName: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects business name less than 3 characters", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      businessName: "AB",
    });

    expect(result.success).toBe(false);
  });
  it("rejects empty customer type", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      customerType: "",
    });

    expect(result.success).toBe(false);
  });
  it("rejects empty industry", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      industry: "",
    });

    expect(result.success).toBe(false);
  });
  it("rejects an empty contact person", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      contactPerson: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects contact person less than 3 characters", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      contactPerson: "AB",
    });

    expect(result.success).toBe(false);
  });
  it("rejects invalid email", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      email: "jeffery@gmail",
    });

    expect(result.success).toBe(false);
  });
  it("rejects invalid phone number", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      phone: "090234",
    });

    expect(result.success).toBe(false);
  });
  it("rejects non-phone characters in the phone number", () => {
    const result = customerSchema.safeParse({
      ...validCustomer,
      phone: "0801-call-now",
    });

    expect(result.success).toBe(false);
  });
});
