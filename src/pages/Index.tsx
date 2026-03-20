import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import ServicesPreview from "@/components/ServicesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import GalleryPreview from "@/components/GalleryPreview";
import CTASection from "@/components/CTASection";

const Index = () => (
  <>
    <Helmet>
      <title>Premium Marble & Granite Solutions | Ganpati Marble Goa</title>
      <meta
        name="description"
        content="Premium Marble & Granite Solutions in Goa, including temple crafting, vitrified tiles, Kota stone, and custom fabrication from Ganpati Marble Goa."
      />
    </Helmet>
    <HeroSection />
    <TrustSection />
    <ApplicationsSection />
    <ServicesPreview />
    <TestimonialsSection />
    <GalleryPreview />
    <CTASection />
  </>
);

export default Index;
