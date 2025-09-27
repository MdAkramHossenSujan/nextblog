"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Book,
  Menu,
  Bell,
  X,
} from "lucide-react";

// Minimal Kinde user shape (adjust to your project)
type KindeUser = {
  id?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  email?: string;
  picture?: string;
};

type NavItem = {
  name: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "My Blogs", icon: FileText, path: "/dashboard/myblogs" },
  { name: "Add Blog", icon: FileText, path: "/dashboard/addblog" },
  { name: "Read By", icon: Book, path: "/dashboard/readby" },
  { name: "All Users", icon: Users, path: "/dashboard/users" },
  { name: "Manage Blogs", icon: FileText, path: "/dashboard/manageblogs" },
];

export default function DashboardApp({
  user,
  children,
}: {
  user: KindeUser | null;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);  // desktop rail
  const [mobileOpen, setMobileOpen] = useState(false);   // mobile drawer

  // Close both modes
  const closeSidebar = () => {
    setMobileOpen(false);
    setSidebarOpen(false);
  };

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSidebar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Active link: exact match for /dashboard, prefix for the rest
  const isActive = (path: string) =>
    path === "/dashboard" ? pathname === "/dashboard" : pathname?.startsWith(path);

  const desktopOffsetClass = useMemo(
    () => (sidebarOpen ? "left-64" : "left-0"),
    [sidebarOpen]
  );

  // ✅ Build classes so only ONE md:translate-* is applied at once
  const asideBase =
    "fixed left-0 top-0 z-50 md:z-20 h-screen w-64 bg-gray-50 border-r border-gray-200 transition-transform duration-300 ease-out";
  const mobileTransform = mobileOpen ? "translate-x-0" : "-translate-x-full";
  const desktopTransform = sidebarOpen
    ? "md:translate-x-0 md:static"
    : "md:-translate-x-64 md:fixed";

  return (
    <div className="relative flex min-h-screen bg-white text-gray-900">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        id="app-sidebar"
        className={[asideBase, mobileTransform, desktopTransform].join(" ")}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Blog<span className="text-blue-600">Bites</span>
          </Link>
        </div>

        <nav className="px-2 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                href={item.path}
                className={[
                  "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-blue-50 text-blue-900" : "text-gray-700 hover:bg-gray-100",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-gray-200 p-4 text-xs text-gray-500">
          © {new Date().getFullYear()} BlogBites
        </div>
      </aside>

      {/* Topbar */}
      <header
        className={[
          "fixed top-0 right-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60",
          "flex h-16 items-center justify-between px-4",
          desktopOffsetClass,
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          {/* Desktop toggle */}
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="hidden md:inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100"
            aria-controls="app-sidebar"
            aria-expanded={sidebarOpen}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100"
            aria-controls="app-sidebar"
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            title="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          {user ? (
            <Link href="/dashboard/profile" className="inline-flex items-center gap-2">
              <Image
                src={user.picture || "/default-avatar.png"}
                alt={user.given_name || user.name || "User"}
                width={36}
                height={36}
                className="rounded-full border border-gray-200"
                priority
              />
              <span className="hidden sm:block text-sm font-medium text-gray-800">
                {user.given_name || user.name || "Account"}
              </span>
            </Link>
          ) : (
            <Link
              href="/api/auth/login"
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className={["flex-1 pt-20 px-4 pb-8", desktopOffsetClass].join(" ")}>
        {children}
      </main>
    </div>
  );
}
