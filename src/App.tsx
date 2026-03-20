import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import OurStory from "./pages/OurStory";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Craftsmanship from "./pages/Craftsmanship";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CollectionsPage from "./pages/admin/CollectionsPage";
import CraftsmanshipPage from "./pages/admin/CraftsmanshipPage";
import WorkPage from "./pages/admin/WorkPage";
import NotFound from "./pages/NotFound";
import PublicLayout from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AdminAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/craftsmanship" element={<Craftsmanship />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<WorkDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="collections" element={<CollectionsPage />} />
                <Route path="craftsmanship" element={<CraftsmanshipPage />} />
                <Route path="work" element={<WorkPage />} />
                <Route path="dashboard" element={<Navigate to="/admin" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
