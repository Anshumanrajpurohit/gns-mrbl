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
      <title>Ganpati Marble Goa | Marble, Granite, Temple Crafting & Custom Stone</title>
      <meta
        name="description"
        content="Premium marble, granite, vitrified tiles, Kota stone, and temple crafting in Goa. Visit our stone yard at Pilerne Industrial Estate. Trusted by 2000+ Goan homes."
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
