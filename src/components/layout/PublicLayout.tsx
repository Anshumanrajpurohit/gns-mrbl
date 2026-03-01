import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const PublicLayout = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <main className="pt-24 md:pt-32">
      <Outlet />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </div>
);

export default PublicLayout;
