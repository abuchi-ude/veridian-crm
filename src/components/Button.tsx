import type { LucideIcon } from "lucide-react";

type ButtonProps = {
  Icon?: LucideIcon;
  action?: () => void;
  label: string;
};

const Button = ({ Icon, action, label }: ButtonProps) => {
  return (
    <button type="button" onClick={action} className="primary-button">
      {Icon && <Icon aria-hidden="true" size={18} />}
      {label}
    </button>
  );
};

export default Button;
