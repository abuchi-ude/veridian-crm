import type { Dispatch, SetStateAction } from "react";
import {
  customerStatuses,
  customerTypes,
  industries,
} from "../customer.constants";
import type { CustomerFiltersTypes } from "../customer.types";

type CustomerFiltersProps = {
  filters: CustomerFiltersTypes;
  setFilters: Dispatch<SetStateAction<CustomerFiltersTypes>>;
  setCurrentPage: (v: number) => void;
};

const formatOption = (value: string, allLabel: string) =>
  value === "All" ? allLabel : value;

const CustomerFilters = ({
  filters,
  setFilters,
  setCurrentPage,
}: CustomerFiltersProps) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
      <span className="sr-only">Filter customers</span>

      <label className="sr-only" htmlFor="statuses">
        Filter by customer status
      </label>
      <select
        name="statuses"
        id="statuses"
        value={filters.status}
        onChange={(event) => {
          const status = event.target.value as CustomerFiltersTypes["status"];
          setFilters((previous) => ({
            ...previous,
            status,
          }));
          setCurrentPage(1);
        }}
        className="form-control sm:w-auto"
      >
        {customerStatuses.map((status) => (
          <option value={status} key={status}>
            {formatOption(status, "All Statuses")}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="industries">
        Filter by industry
      </label>
      <select
        name="industries"
        id="industries"
        value={filters.industry}
        onChange={(event) => {
          const industry = event.target
            .value as CustomerFiltersTypes["industry"];
          setFilters((previous) => ({
            ...previous,
            industry,
          }));
          setCurrentPage(1);
        }}
        className="form-control sm:w-auto"
      >
        {industries.map((industry) => (
          <option value={industry} key={industry}>
            {formatOption(industry, "All Industries")}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="types">
        Filter by customer type
      </label>
      <select
        name="types"
        id="types"
        value={filters.type}
        onChange={(event) => {
          const type = event.target.value as CustomerFiltersTypes["type"];
          setFilters((previous) => ({
            ...previous,
            type,
          }));
          setCurrentPage(1);
        }}
        className="form-control sm:w-auto"
      >
        {customerTypes.map((type) => (
          <option value={type} key={type}>
            {formatOption(type, "All Types")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerFilters;
