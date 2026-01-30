import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import ServicesPreview from "@/components/ServicesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import GalleryPreview from "@/components/GalleryPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TrustSection />
      <ApplicationsSection />
      <ServicesPreview />
      <TestimonialsSection />
      <GalleryPreview />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
