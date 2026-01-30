import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryLiving from "@/assets/gallery-living.jpg";
import galleryStaircase from "@/assets/gallery-staircase.jpg";

const galleryItems = [
  {
    src: galleryKitchen,
    title: "Modern Kitchen",
    category: "Countertops",
    description: "White marble countertops with subtle veining for a contemporary family kitchen.",
  },
  {
    src: galleryBathroom,
    title: "Spa Bathroom",
    category: "Full Bathroom",
    description: "Complete marble transformation creating a luxurious spa-like retreat.",
  },
  {
    src: galleryStaircase,
    title: "Grand Staircase",
    category: "Staircases",
    description: "Elegant marble staircase with detailed railings for a Goan villa.",
  },
  {
    src: galleryLiving,
    title: "Living Room Flooring",
    category: "Flooring",
    description: "Spacious living area with polished marble flooring reflecting natural light.",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wide">
              Our Work
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Stories in Stone
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every project we complete becomes a part of someone's home story. 
              Here's a glimpse of the craftsmanship and care we bring to every 
              installation.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-gold uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              Let's discuss your vision. Visit our showroom or give us a call—we'd 
              love to help you choose the perfect stone for your home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+919876543210">Call Now</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
