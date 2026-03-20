import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { BriefcaseBusiness, Hammer, LayoutDashboard, LogOut, Menu, PanelsTopLeft, X } from "lucide-react";

import adminLogo from "@/assets/admin-logo.png";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const navigationItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/collections", label: "Collections", icon: PanelsTopLeft },
  { to: "/admin/craftsmanship", label: "Craftsmanship", icon: Hammer },
  { to: "/admin/work", label: "Work", icon: BriefcaseBusiness },
];

const navigationClassName = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
    isActive
      ? "bg-gold text-gold-foreground shadow-warm"
      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
  ].join(" ");

export const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(190,156,84,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(153,93,52,0.12),_transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <div
          className={`fixed inset-0 z-40 bg-primary/30 backdrop-blur-sm transition lg:hidden ${
            sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border/60 bg-card/95 px-5 py-6 shadow-lifted transition-transform duration-300 lg:sticky lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-start justify-between gap-4">
            <Link to="/admin" className="flex items-center gap-3">
              <img src={adminLogo} alt="Admin Panel" className="h-14 w-14 rounded-2xl object-cover shadow-soft" />
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-gold">Admin panel</p>
                <p className="font-display text-2xl text-foreground">Ganpati Marble</p>
              </div>
            </Link>
            <button type="button" className="rounded-xl p-2 text-muted-foreground lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} end={item.end} className={navigationClassName} onClick={() => setSidebarOpen(false)}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[1.5rem] border border-border/70 bg-secondary/40 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Session</p>
            <p className="mt-2 text-sm font-medium text-foreground">{admin?.username ?? "Admin"}</p>
            <p className="mt-1 text-xs text-muted-foreground">Simple local auth stored in browser localStorage.</p>
            <Button variant="elegant" className="mt-4 w-full" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 px-4 py-4 backdrop-blur-xl md:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card shadow-soft lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">Custom admin</p>
                  <h1 className="font-display text-3xl leading-none text-foreground">Website content control</h1>
                </div>
              </div>
              <div className="hidden rounded-2xl border border-border/70 bg-card px-4 py-3 text-right shadow-soft sm:block">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Live API</p>
                <p className="text-sm font-medium text-foreground">http://127.0.0.1:8000/api</p>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
