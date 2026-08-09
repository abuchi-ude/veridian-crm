import { Search } from "lucide-react";

type CustomerSearchbarProps = {
  search: string;
  setSearch: (query: string) => void;
  setCurrentPage: (v: number) => void;
};

const CustomerSearchbar = ({
  search,
  setSearch,
  setCurrentPage,
}: CustomerSearchbarProps) => {
  return (
    <div className="relative min-w-0 flex-1 sm:min-w-64">
      <label htmlFor="customer-search" className="sr-only">
        Search customers and contacts
      </label>
      <Search
        aria-hidden="true"
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        id="customer-search"
        type="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search customers, contacts..."
        className="form-control pl-10"
      />
    </div>
  );
};

export default CustomerSearchbar;
