import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LockKeyhole, Sparkles } from "lucide-react";
import { toast } from "sonner";

import adminLogo from "@/assets/admin-logo.png";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAdminAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      login(values);
      toast.success("Admin session started");
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Admin Login | Ganpati Marble Goa</title>
      </Helmet>
      <Navigation />
      <main className="relative overflow-hidden px-4 pb-20 pt-32 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,156,84,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(153,93,52,0.12),_transparent_28%)]" />
        <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-lifted lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden border-r border-border/60 bg-secondary/35 p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold">Custom admin</p>
              <h1 className="mt-4 font-display text-5xl leading-none text-foreground">Frontend-first content control</h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Login is intentionally simple for now: credentials are checked locally and the session is stored in localStorage, while all content CRUD runs against the Django API.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "No Django admin redirect",
                "Collections, craftsmanship, and work CRUD",
                "Responsive UI matched to the public website",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-4">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">
              <img src={adminLogo} alt="Admin Panel" className="h-16 w-16 rounded-2xl object-cover shadow-soft" />
              <div className="mt-6">
                <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold">
                  <LockKeyhole className="h-3.5 w-3.5" />
                  Secure entry
                </p>
                <h2 className="mt-4 font-display text-4xl text-foreground">Admin login</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Configure `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` for deployment. Defaults are local-only fallback credentials.
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" autoComplete="username" placeholder="Enter username" {...register("username")} />
                  {errors.username ? <p className="text-sm text-destructive">{errors.username.message}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" autoComplete="current-password" placeholder="Enter password" {...register("password")} />
                  {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
                </div>
                <Button type="submit" className="w-full" variant="warm" disabled={loading}>
                  {loading ? "Signing in..." : "Access admin panel"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer minimal />
    </div>
  );
};

export default AdminLogin;
