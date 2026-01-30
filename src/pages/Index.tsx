import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ServicesPreview from "@/components/ServicesPreview";
import GalleryPreview from "@/components/GalleryPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TrustSection />
      <ServicesPreview />
      <GalleryPreview />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
