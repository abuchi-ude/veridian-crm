import { Bell, Menu, Moon, Sun } from "lucide-react";

type HeaderProps = {
  onOpenNavigation: () => void;
  onToggleTheme: () => void;
  isSidebarCollapsed: boolean;
};

export default function Header({
  onOpenNavigation,
  onToggleTheme,
  isSidebarCollapsed,
}: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/95 px-4 text-card-foreground backdrop-blur transition-[margin] duration-200 lg:px-8 ${
        isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenNavigation}
          className="icon-button lg:hidden"
          aria-label="Open navigation menu"
          aria-controls="primary-navigation"
        >
          <Menu aria-hidden="true" size={20} />
        </button>
        <p className="text-sm text-muted-foreground">
          CRM <span aria-hidden="true">/</span>{" "}
          <span className="font-medium text-foreground">Customers</span>
        </p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          className="icon-button"
          aria-label="Toggle light and dark mode"
        >
          <Moon aria-hidden="true" size={19} className="dark:hidden" />
          <Sun aria-hidden="true" size={19} className="hidden dark:block" />
        </button>
        <button type="button" className="icon-button" aria-label="Notifications">
          <Bell aria-hidden="true" size={19} />
        </button>
        <div className="ml-1 flex items-center gap-2 border-l border-border pl-3">
          <span
            className="flex size-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground"
            aria-hidden="true"
          >
            JD
          </span>
          <span className="sr-only">Signed in as James Davidson</span>
        </div>
      </div>
    </header>
  );
}
