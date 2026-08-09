import {
  industries,
  customerStatuses,
  customerTypes,
  previewStates,
} from "./customer.constants";
export type Customer = {
  id: string;
  businessName: string;
  customerType: CustomerType;
  industry: Industry;
  contactPerson: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  dateRegistered: string;
};

export type State = (typeof previewStates)[number];
export type Industry = Exclude<(typeof industries)[number], "All">;
export type CustomerStatus = Exclude<
  (typeof customerStatuses)[number],
  "All"
>;
export type CustomerType = Exclude<(typeof customerTypes)[number], "All">;

export type CustomerFiltersTypes = {
  status: (typeof customerStatuses)[number];
  type: (typeof customerTypes)[number];
  industry: (typeof industries)[number];
};
