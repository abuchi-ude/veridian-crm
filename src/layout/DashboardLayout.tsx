import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    window.matchMedia("(min-width: 1024px)").matches,
  );

  const isMobileModalOpen =
    isMobileNavigationOpen && !isDesktopViewport;

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateViewport = (event: MediaQueryListEvent) => {
      setIsDesktopViewport(event.matches);
    };

    desktopMediaQuery.addEventListener("change", updateViewport);
    return () =>
      desktopMediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isMobileModalOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileNavigationOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMobileModalOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        isOpen={isMobileNavigationOpen}
        onClose={() => setIsMobileNavigationOpen(false)}
        isCollapsed={isDesktopSidebarCollapsed}
        onToggleCollapsed={() =>
          setIsDesktopSidebarCollapsed((isCollapsed) => !isCollapsed)
        }
        isDesktopViewport={isDesktopViewport}
      />

      {isMobileModalOpen && (
        <button
          type="button"
          onClick={() => setIsMobileNavigationOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-[2px] lg:hidden"
          aria-label="Close navigation menu"
          tabIndex={-1}
        />
      )}

      <div
        inert={isMobileModalOpen}
        aria-hidden={isMobileModalOpen || undefined}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header
          onOpenNavigation={() => setIsMobileNavigationOpen(true)}
          onToggleTheme={() =>
            document.documentElement.classList.toggle("dark")
          }
          isSidebarCollapsed={isDesktopSidebarCollapsed}
        />
        <main
          id="main-content"
          className={`transition-[margin] duration-200 ${
            isDesktopSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
