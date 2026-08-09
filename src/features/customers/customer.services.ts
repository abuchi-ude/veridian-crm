import { customers } from "./customers.mock";
import type { CustomerFormData } from "./customer.schema";
import type { Customer } from "./customer.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCustomers(): Promise<Customer[]> {
  await delay(800);

  return [...customers];
}

export async function createCustomer(
  customerData: CustomerFormData,
): Promise<Customer> {
  await delay(600);

  const nextCustomerNumber =
    Math.max(
      0,
      ...customers.map((customer) => Number(customer.id.replace("C", ""))),
    ) + 1;

  const customer: Customer = {
    ...customerData,
    id: `C${String(nextCustomerNumber).padStart(3, "0")}`,
    dateRegistered: new Date().toISOString().slice(0, 10),
  };

  customers.push(customer);

  return customer;
}
