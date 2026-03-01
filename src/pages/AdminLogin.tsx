import { useAdminAuth } from "@/hooks/useAdminAuth";
import { loginAdmin } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import adminLogo from "@/assets/admin-logo.png";

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, token } = useAdminAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      const data = await loginAdmin(values);
      login(data.token, data.admin);
      toast.success("Logged in successfully");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to login";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <Helmet>
        <title>Admin Login | Ganpati Marble Goa</title>
      </Helmet>
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-8 shadow-lifted">
        <div className="mb-8 text-center">
          <img src={adminLogo} alt="Admin Panel" className="mx-auto mb-6 h-24 w-24 rounded-2xl object-contain shadow-soft sm:h-28 sm:w-28" />
          <h1 className="mt-2 font-display text-3xl">Secure Dashboard Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Only authorized Ganpati Marble Goa team members may access.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter username" autoComplete="username" {...register("username")} />
            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" autoComplete="current-password" {...register("password")} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" variant="warm" className="w-full" disabled={loading}>
            {loading ? "Authenticating..." : "Access Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
