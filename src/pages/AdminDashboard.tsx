import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import {
  deleteEnquiry,
  fetchActivityLog,
  fetchAdminStats,
  fetchEnquiries,
  fetchLast7DaysStats,
  fetchNotificationEmail,
  fetchServiceDistribution,
  fetchTrashEnquiries,
  restoreEnquiry,
  updateEnquiryStatus,
  updateNotificationEmail,
  type ActivityLogItem,
  type AdminStats,
  type EnquiryResponseItem,
  type Last7DayStat,
  type ServiceDistributionItem,
} from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { token, admin, logout } = useAdminAuth();
  const [search, setSearch] = useState("");
  const [trashSearch, setTrashSearch] = useState("");
  const [contactedFilter, setContactedFilter] = useState<string>("");
  const [showTrash, setShowTrash] = useState(false);
  const [notificationEmailInput, setNotificationEmailInput] = useState("");
  const deferredSearch = useDeferredValue(search);
  const deferredTrashSearch = useDeferredValue(trashSearch);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
  } = useQuery<{ data: EnquiryResponseItem[] } | undefined>({
    queryKey: ["enquiries", token, deferredSearch, contactedFilter],
    queryFn: () =>
      fetchEnquiries({
        token: token as string,
        search: deferredSearch || undefined,
        contacted: contactedFilter || undefined,
      }),
    enabled: Boolean(token),
    retry: false,
  });

  const { data: trashData, isLoading: trashLoading } = useQuery<{ data: EnquiryResponseItem[] } | undefined>({
    queryKey: ["trash-enquiries", token, deferredTrashSearch],
    queryFn: () => fetchTrashEnquiries({ token: token as string, search: deferredTrashSearch || undefined }),
    enabled: Boolean(token) && showTrash,
  });

  const { data: statsData } = useQuery<{ data: AdminStats } | undefined>({
    queryKey: ["admin-stats", token],
    queryFn: () => fetchAdminStats(token as string),
    enabled: Boolean(token),
  });

  const { data: last7DaysData } = useQuery<{ data: Last7DayStat[] } | undefined>({
    queryKey: ["admin-stats-last-7", token],
    queryFn: () => fetchLast7DaysStats(token as string),
    enabled: Boolean(token),
  });

  const { data: serviceDistributionData } = useQuery<{ data: ServiceDistributionItem[] } | undefined>({
    queryKey: ["admin-stats-service-distribution", token],
    queryFn: () => fetchServiceDistribution(token as string),
    enabled: Boolean(token),
  });

  const { data: activityData } = useQuery<{ data: ActivityLogItem[] } | undefined>({
    queryKey: ["admin-activity-log", token],
    queryFn: () => fetchActivityLog(token as string),
    enabled: Boolean(token),
  });

  const { data: notificationEmailData } = useQuery<{ data: { email: string | null } } | undefined>({
    queryKey: ["admin-notification-email", token],
    queryFn: () => fetchNotificationEmail(token as string),
    enabled: Boolean(token),
  });

  useEffect(() => {
    if (error instanceof Error && error.message.toLowerCase().includes("authorization")) {
      toast.error("Session expired. Please login again.");
      logout();
    }
  }, [error, logout]);

  useEffect(() => {
    setNotificationEmailInput(notificationEmailData?.data?.email || "");
  }, [notificationEmailData?.data?.email]);

  const markContactedMutation = useMutation({
    mutationFn: ({ id, contacted }: { id: string; contacted: boolean }) => updateEnquiryStatus(token as string, id, contacted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-activity-log"] });
    },
    onError: (mutationError) => {
      const message = mutationError instanceof Error ? mutationError.message : "Unable to update enquiry";
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEnquiry(token as string, id),
    onSuccess: () => {
      toast.success("Enquiry moved to trash");
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["trash-enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-activity-log"] });
    },
    onError: (mutationError) => {
      const message = mutationError instanceof Error ? mutationError.message : "Unable to delete enquiry";
      toast.error(message);
    },
  });

  const restoreMutation = useMutation({
    mutationFn: (id: string) => restoreEnquiry(token as string, id),
    onSuccess: () => {
      toast.success("Enquiry restored");
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["trash-enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-activity-log"] });
    },
    onError: (mutationError) => {
      const message = mutationError instanceof Error ? mutationError.message : "Unable to restore enquiry";
      toast.error(message);
    },
  });

  const emailMutation = useMutation({
    mutationFn: () => updateNotificationEmail(token as string, notificationEmailInput.trim()),
    onSuccess: () => {
      toast.success("Admin email updated");
      queryClient.invalidateQueries({ queryKey: ["admin-notification-email"] });
      queryClient.invalidateQueries({ queryKey: ["admin-activity-log"] });
    },
    onError: (mutationError) => {
      const message = mutationError instanceof Error ? mutationError.message : "Unable to update admin email";
      toast.error(message);
    },
  });

  const enquiries = data?.data ?? [];
  const trashedEnquiries = trashData?.data ?? [];
  const stats = statsData?.data ?? {
    totalEnquiries: 0,
    todayEnquiries: 0,
    monthEnquiries: 0,
    contactedCount: 0,
    pendingCount: 0,
  };

  const compactTrend = useMemo(() => (last7DaysData?.data || []).map((item) => `${format(new Date(item.date), "dd MMM")}: ${item.count}`), [last7DaysData?.data]);
  const compactDistribution = useMemo(
    () => (serviceDistributionData?.data || []).slice(0, 5).map((item) => `${item.service} (${item.count})`),
    [serviceDistributionData?.data]
  );

  const handleToggleContacted = (item: EnquiryResponseItem) => {
    markContactedMutation.mutate({ id: item._id, contacted: !item.contacted });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Move this enquiry to trash?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleRestore = (id: string) => {
    restoreMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <Helmet>
        <title>Admin Dashboard | Ganpati Marble Goa</title>
      </Helmet>
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Secure dashboard</p>
            <h1 className="font-display text-4xl text-foreground">Enquiries overview</h1>
            <p className="text-sm text-muted-foreground">Manage enquiries, recovery bin, analytics, and notification settings.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="rounded-xl border border-border/60 bg-card px-4 py-2 text-left shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Logged in as</p>
              <p className="font-medium text-foreground">{admin?.username ?? "Admin"}</p>
            </div>
            <Button variant="elegant" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Total</p>
            <p className="mt-3 font-display text-3xl text-foreground">{stats.totalEnquiries}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Today</p>
            <p className="mt-3 font-display text-3xl text-foreground">{stats.todayEnquiries}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">This month</p>
            <p className="mt-3 font-display text-3xl text-foreground">{stats.monthEnquiries}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Pending</p>
            <p className="mt-3 font-display text-3xl text-copper">{stats.pendingCount}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contacted</p>
            <p className="mt-3 font-display text-3xl text-gold">{stats.contactedCount}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Last 7 days</p>
            <p className="mt-3 text-sm text-foreground">{compactTrend.length > 0 ? compactTrend.join(" | ") : "No data available"}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Top services</p>
            <p className="mt-3 text-sm text-foreground">{compactDistribution.length > 0 ? compactDistribution.join(" | ") : "No data available"}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Admin notification email</p>
          <div className="mt-3 flex flex-col gap-3 md:flex-row">
            <Input
              value={notificationEmailInput}
              onChange={(event) => setNotificationEmailInput(event.target.value)}
              placeholder="Enter admin notification email"
              className="h-11 rounded-xl border-border/60"
            />
            <Button
              variant="warm"
              disabled={emailMutation.isPending || !notificationEmailInput.trim()}
              onClick={() => emailMutation.mutate()}
            >
              {emailMutation.isPending ? "Saving..." : "Save Email"}
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-border/60 bg-card p-6 shadow-lifted">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-3">
              <Button variant={!showTrash ? "warm" : "elegant"} onClick={() => setShowTrash(false)}>
                Active Enquiries
              </Button>
              <Button variant={showTrash ? "warm" : "elegant"} onClick={() => setShowTrash(true)}>
                Trash
              </Button>
            </div>

            {!showTrash ? (
              <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
                <Input
                  placeholder="Search by name, phone, service..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-12 rounded-2xl border-border/60 lg:w-96"
                />
                <div className="flex gap-3">
                  <Button
                    variant={contactedFilter === "false" ? "warm" : "elegant"}
                    onClick={() => setContactedFilter(contactedFilter === "false" ? "" : "false")}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={contactedFilter === "true" ? "warm" : "elegant"}
                    onClick={() => setContactedFilter(contactedFilter === "true" ? "" : "true")}
                  >
                    Contacted
                  </Button>
                </div>
              </div>
            ) : (
              <Input
                placeholder="Search in trash..."
                value={trashSearch}
                onChange={(event) => setTrashSearch(event.target.value)}
                className="h-12 rounded-2xl border-border/60 lg:w-96"
              />
            )}
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-muted text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!showTrash && isLoading && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                      Loading enquiries...
                    </td>
                  </tr>
                )}
                {showTrash && trashLoading && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                      Loading trash...
                    </td>
                  </tr>
                )}
                {!showTrash && !isLoading && enquiries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                      No enquiries match your filters yet.
                    </td>
                  </tr>
                )}
                {showTrash && !trashLoading && trashedEnquiries.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                      Trash is empty.
                    </td>
                  </tr>
                )}
                {!showTrash &&
                  enquiries.map((item) => (
                    <tr key={item._id} className="border-b border-border/40">
                      <td className="px-4 py-4 font-medium text-foreground">{item.name}</td>
                      <td className="px-4 py-4">
                        <a className="text-gold" href={`tel:${item.phone}`}>
                          {item.phone}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{item.email || "-"}</td>
                      <td className="px-4 py-4">{item.service}</td>
                      <td className="px-4 py-4 text-muted-foreground">{item.message}</td>
                      <td className="px-4 py-4 text-muted-foreground">{format(new Date(item.createdAt), "dd MMM yyyy")}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.contacted ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                          {item.contacted ? "Contacted" : "New"}
                        </span>
                      </td>
                      <td className="space-x-2 whitespace-nowrap px-4 py-4">
                        <Button
                          size="sm"
                          variant={item.contacted ? "soft" : "warm"}
                          onClick={() => handleToggleContacted(item)}
                          disabled={markContactedMutation.isPending}
                        >
                          {item.contacted ? "Mark Pending" : "Mark Contacted"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(item._id)} disabled={deleteMutation.isPending}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                {showTrash &&
                  trashedEnquiries.map((item) => (
                    <tr key={item._id} className="border-b border-border/40">
                      <td className="px-4 py-4 font-medium text-foreground">{item.name}</td>
                      <td className="px-4 py-4 text-muted-foreground">{item.phone}</td>
                      <td className="px-4 py-4 text-muted-foreground">{item.email || "-"}</td>
                      <td className="px-4 py-4">{item.service}</td>
                      <td className="px-4 py-4 text-muted-foreground">{item.message}</td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {item.deletedAt ? format(new Date(item.deletedAt), "dd MMM yyyy") : "-"}
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">Deleted</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Button size="sm" variant="warm" onClick={() => handleRestore(item._id)} disabled={restoreMutation.isPending}>
                          Restore
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Recent activity</p>
          <div className="mt-3 space-y-2 text-sm">
            {(activityData?.data || []).length === 0 && <p className="text-muted-foreground">No activity recorded yet.</p>}
            {(activityData?.data || []).map((item) => (
              <p key={item.id} className="rounded-xl border border-border/40 px-3 py-2 text-foreground">
                <span className="font-medium">{item.adminUsername || "Admin"}</span> | {item.action} | {item.entity} | {format(new Date(item.createdAt), "dd MMM yyyy, hh:mm a")}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
