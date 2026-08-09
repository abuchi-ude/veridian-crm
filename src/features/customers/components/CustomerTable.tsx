import { MoreHorizontal } from "lucide-react";
import type { Customer } from "../customer.types";
import StatusBadge from "./StatusBadge";

type CustomerTableProps = {
  customers: Customer[];
};

const CustomerTable = ({ customers }: CustomerTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-270 border-collapse text-left text-sm">
        <caption className="sr-only">
          Customer accounts and contact details
        </caption>
        <thead className="bg-muted/70 text-[11px] uppercase tracking-[0.06em] text-muted-foreground">
          <tr>
            <th scope="col" className="table-heading">
              Business name
            </th>
            <th scope="col" className="table-heading">
              Customer type
            </th>
            <th scope="col" className="table-heading">
              Industry
            </th>
            <th scope="col" className="table-heading">
              Contact person
            </th>
            <th scope="col" className="table-heading">
              Email
            </th>
            <th scope="col" className="table-heading">
              Phone
            </th>
            <th scope="col" className="table-heading">
              Status
            </th>
            <th scope="col" className="table-heading">
              Registered
            </th>
            <th scope="col" className="table-heading text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="transition-colors hover:bg-muted/45"
            >
              <th
                scope="row"
                className="table-cell font-semibold text-card-foreground"
              >
                <span className="block">{customer.businessName}</span>
                <span className="mt-0.5 block font-mono text-[11px] font-normal text-muted-foreground">
                  {customer.id}
                </span>
              </th>
              <td className="table-cell">{customer.customerType}</td>
              <td className="table-cell">{customer.industry}</td>
              <td className="table-cell font-medium text-card-foreground">
                {customer.contactPerson}
              </td>
              <td className="table-cell">
                <a
                  className="hover:text-primary hover:underline"
                  href={`mailto:${customer.email}`}
                >
                  {customer.email}
                </a>
              </td>
              <td className="table-cell whitespace-nowrap">{customer.phone}</td>
              <td className="table-cell">
                <StatusBadge status={customer.status} />
              </td>
              <td className="table-cell whitespace-nowrap">
                <time dateTime={customer.dateRegistered}>
                  {customer.dateRegistered}
                </time>
              </td>
              <td className="table-cell text-right">
                <button
                  type="button"
                  className="icon-button ml-auto"
                  aria-label={`Actions for ${customer.businessName}`}
                >
                  <MoreHorizontal aria-hidden="true" size={19} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
