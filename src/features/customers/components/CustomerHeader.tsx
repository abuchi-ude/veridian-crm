import { Plus } from "lucide-react";
import Button from "../../../components/Button";

type CustomerHeaderProps = {
  onRegister: () => void;
};

const CustomerHeader = ({ onRegister }: CustomerHeaderProps) => {
  return (
    <header
      aria-label="Customer page header"
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Customers
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Manage and monitor your business customer portfolio
        </p>
      </div>
      <Button action={onRegister} Icon={Plus} label="Register Customer" />
    </header>
  );
};

export default CustomerHeader;
