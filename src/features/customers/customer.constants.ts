export const customerStatuses = [
  "All",
  "Active",
  "Pending",
  "Inactive",
] as const;

export const customerTypes = [
  "All",
  "Corporate",
  "SME",
  "Institutional",
  "Government",
] as const;

export const industries = [
  "All",
  "Agriculture",
  "Construction",
  "Education",
  "Energy",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Technology",
  "Transportation",
  "Utilities",
  "Public Service",
] as const;

export const registrationCustomerStatuses = customerStatuses.slice(1) as [
  "Active",
  "Pending",
  "Inactive",
];

export const registrationCustomerTypes = customerTypes.slice(1) as [
  "Corporate",
  "SME",
  "Institutional",
  "Government",
];

export const registrationIndustries = industries.slice(1) as [
  "Agriculture",
  "Construction",
  "Education",
  "Energy",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Technology",
  "Transportation",
  "Utilities",
  "Public Service",
];

export const previewStates = ["normal", "loading", "empty", "error"] as const;
