import {
  Activity,
  ArrowUpDown,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
  isDesktopViewport: boolean;
};

const mainMenu = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Customers", icon: Users, active: true },
  { label: "Transactions", icon: ArrowUpDown },
  { label: "Reports", icon: Activity },
  { label: "Compliance", icon: Shield },
];

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapsed,
  isDesktopViewport,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || isDesktopViewport) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const focusFrame = window.requestAnimationFrame(() => {
      mobileCloseButtonRef.current?.focus();
    });

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const focusableElements = Array.from(
        sidebar.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => {
        const styles = window.getComputedStyle(element);
        return styles.display !== "none" && styles.visibility !== "hidden";
      });

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const focusIsOutsideSidebar = !sidebar.contains(document.activeElement);

      if (event.shiftKey && (document.activeElement === first || focusIsOutsideSidebar)) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || focusIsOutsideSidebar)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleTabKey);
      previousFocusRef.current?.focus();
    };
  }, [isDesktopViewport, isOpen]);

  const isHiddenMobileNavigation = !isDesktopViewport && !isOpen;

  return (
    <aside
      ref={sidebarRef}
      id="primary-navigation"
      aria-label="Primary navigation"
      aria-hidden={isHiddenMobileNavigation || undefined}
      inert={isHiddenMobileNavigation}
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-(--sidebar-bg) text-(--sidebar-fg) shadow-2xl transition-[width,transform] duration-200 ease-out lg:translate-x-0 lg:shadow-none ${
        isCollapsed ? "lg:w-20" : "lg:w-64"
      } ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`relative flex h-16 items-center gap-3 border-b border-white/15 px-5 ${
          isCollapsed ? "lg:justify-center lg:px-3" : ""
        }`}
      >
        <span className="flex size-9 items-center justify-center rounded-lg border border-white/30 bg-white/10 text-sm font-bold">
          VF
        </span>
        <div className={`min-w-0 flex-1 ${isCollapsed ? "lg:hidden" : ""}`}>
          <p className="truncate text-sm font-semibold">Veridian Financial</p>
          <p className="truncate text-xs text-(--sidebar-muted)">
            Relationship CRM
          </p>
        </div>
        <button
          ref={mobileCloseButtonRef}
          type="button"
          onClick={onClose}
          className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
          aria-label="Close navigation menu"
        >
          <X aria-hidden="true" size={19} />
        </button>
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="absolute -right-3 top-1/2 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-(--sidebar-bg) text-white/75 shadow-md transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:flex"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          aria-controls="primary-navigation"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen aria-hidden="true" size={15} />
          ) : (
            <PanelLeftClose aria-hidden="true" size={15} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className={`mb-2 px-3 text-[11px] font-semibold tracking-[0.12em] text-(--sidebar-muted) ${isCollapsed ? "lg:sr-only" : ""}`}>
          MAIN MENU
        </p>
        <ul className="space-y-1">
          {mainMenu.map(({ label, icon: Icon, active }) => (
            <li key={label}>
              <button
                type="button"
                aria-label={label}
                title={isCollapsed ? label : undefined}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isCollapsed ? "lg:justify-center lg:px-0" : ""
                } ${
                  active
                    ? "bg-(--sidebar-active) text-white"
                    : "text-(--sidebar-muted) hover:bg-(--sidebar-hover) hover:text-white"
                }`}
              >
                <Icon aria-hidden="true" size={18} />
                <span className={isCollapsed ? "lg:hidden" : ""}>{label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="my-5 border-t border-white/15" />
        <p className={`mb-2 px-3 text-[11px] font-semibold tracking-[0.12em] text-(--sidebar-muted) ${isCollapsed ? "lg:sr-only" : ""}`}>
          CONFIGURATION
        </p>
        <button
          type="button"
          aria-label="Settings"
          title={isCollapsed ? "Settings" : undefined}
          className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium text-(--sidebar-muted) hover:bg-(--sidebar-hover) hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}
        >
          <Settings aria-hidden="true" size={18} />
          <span className={isCollapsed ? "lg:hidden" : ""}>Settings</span>
        </button>
      </nav>

      <div className={`border-t border-white/15 p-3 ${isCollapsed ? "lg:px-2" : ""}`}>
        <div className={`flex items-center gap-3 rounded-lg bg-white/10 p-3 ${isCollapsed ? "lg:justify-center lg:px-2" : ""}`}>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
            JD
          </span>
          <div className={`min-w-0 ${isCollapsed ? "lg:hidden" : ""}`}>
            <p className="truncate text-sm font-medium">James Davidson</p>
            <p className="truncate text-xs text-(--sidebar-muted)">
              Relationship Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
