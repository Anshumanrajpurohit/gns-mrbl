import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Gem, Hammer, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchCollections, fetchCraftsmanship, fetchWorks } from "@/services/adminApi";

const AdminDashboard = () => {
  const collectionsQuery = useQuery({
    queryKey: ["admin", "collections"],
    queryFn: fetchCollections,
  });

  const craftsmanshipQuery = useQuery({
    queryKey: ["admin", "craftsmanship"],
    queryFn: fetchCraftsmanship,
  });

  const workQuery = useQuery({
    queryKey: ["admin", "work"],
    queryFn: fetchWorks,
  });

  const recentEntries = useMemo(() => {
    const collections = (collectionsQuery.data ?? []).map((item) => ({
      id: `collection-${item.id}`,
      title: item.name,
      meta: item.type,
      createdAt: item.created_at,
      route: "/admin/collections",
    }));
    const craftsmanship = (craftsmanshipQuery.data ?? []).map((item) => ({
      id: `craft-${item.id}`,
      title: item.title,
      meta: `${item.features.length} features`,
      createdAt: item.created_at,
      route: "/admin/craftsmanship",
    }));
    const work = (workQuery.data ?? []).map((item) => ({
      id: `work-${item.id}`,
      title: item.title,
      meta: item.location,
      createdAt: item.created_at,
      route: "/admin/work",
    }));

    return [...collections, ...craftsmanship, ...work]
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
      .slice(0, 6);
  }, [collectionsQuery.data, craftsmanshipQuery.data, workQuery.data]);

  const stats = [
    {
      label: "Collections",
      value: collectionsQuery.data?.length ?? 0,
      description: `${(collectionsQuery.data ?? []).filter((item) => item.status === "published").length} published`,
      icon: Gem,
      route: "/admin/collections",
    },
    {
      label: "Craftsmanship",
      value: craftsmanshipQuery.data?.length ?? 0,
      description: `${(craftsmanshipQuery.data ?? []).filter((item) => item.status === "published").length} published`,
      icon: Hammer,
      route: "/admin/craftsmanship",
    },
    {
      label: "Work Projects",
      value: workQuery.data?.length ?? 0,
      description: `${(workQuery.data ?? []).filter((item) => item.status === "published").length} published`,
      icon: BriefcaseBusiness,
      route: "/admin/work",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Ganpati Marble Goa</title>
      </Helmet>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Overview</p>
            <h2 className="font-display text-4xl text-foreground">Custom admin dashboard</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage collections, craftsmanship sections, and completed work from the frontend without leaving the site experience.
            </p>
          </div>
          <Badge variant="outline" className="rounded-full border-gold/40 bg-gold/5 px-4 py-2 text-sm text-foreground">
            API connected to `http://127.0.0.1:8000/api`
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-lifted">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
                    <p className="mt-3 font-display text-5xl text-foreground">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/70 p-3 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <Button className="mt-6" variant="elegant" asChild>
                  <Link to={stat.route}>
                    Open manager
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>

        <div className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-lifted">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Recent updates</p>
              <h3 className="font-display text-3xl text-foreground">Latest content activity</h3>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {collectionsQuery.isLoading || craftsmanshipQuery.isLoading || workQuery.isLoading ? (
              <div className="rounded-2xl border border-border/70 bg-secondary/30 px-4 py-6 text-sm text-muted-foreground">
                Loading dashboard data...
              </div>
            ) : recentEntries.length === 0 ? (
              <div className="rounded-2xl border border-border/70 bg-secondary/30 px-4 py-6 text-sm text-muted-foreground">
                No content has been created yet.
              </div>
            ) : (
              recentEntries.map((entry) => (
                <Link
                  key={entry.id}
                  to={entry.route}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-secondary/20 px-4 py-4 transition hover:border-gold/40 hover:bg-secondary/40"
                >
                  <div>
                    <p className="font-medium text-foreground">{entry.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{entry.meta}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {format(new Date(entry.createdAt), "dd MMM")}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
