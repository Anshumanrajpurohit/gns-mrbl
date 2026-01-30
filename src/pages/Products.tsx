import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import productMarble from "@/assets/product-marble.jpg";
import productGranite from "@/assets/product-granite.jpg";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";

const marbleTypes = [
  "Italian Carrara White",
  "Makrana Pure White",
  "Rajnagar White",
  "Onyx Marble",
  "Statuario Marble",
  "Calacatta Gold",
];

const graniteTypes = [
  "Black Galaxy",
  "Tan Brown",
  "Kashmir White",
  "Steel Grey",
  "Absolute Black",
  "Imperial Red",
];

const customServices = [
  {
    title: "Custom Staircases",
    description: "Elegant marble and granite staircases crafted to your exact specifications.",
  },
  {
    title: "Kitchen Countertops",
    description: "Durable, beautiful countertops that become the heart of your kitchen.",
  },
  {
    title: "Bathroom Designs",
    description: "Transform your bathroom into a spa-like sanctuary with premium stone.",
  },
  {
    title: "Flooring Solutions",
    description: "From intricate patterns to seamless expanses, flooring that impresses.",
  },
  {
    title: "Wall Cladding",
    description: "Add texture and luxury to any wall with natural stone cladding.",
  },
  {
    title: "Temple & Pooja Room",
    description: "Sacred spaces crafted with devotion and the finest materials.",
  },
];

const Products = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-sm font-medium mb-4 uppercase tracking-wide">
              Our Collection
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Premium Stone,<br />
              <span className="text-gold">Honest Guidance</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We source only the finest marble and granite from trusted quarries. 
              Every piece is selected with care, so you get stone that's beautiful, 
              durable, and perfect for your home.
            </p>
          </div>
        </div>
      </section>

      {/* Marble Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Marble Collection
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From the timeless elegance of Italian Carrara to the pristine beauty 
                of Indian Makrana, our marble collection brings sophistication to 
                every space. Perfect for flooring, countertops, and statement pieces.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {marbleTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm text-foreground">{type}</span>
                  </div>
                ))}
              </div>
              <Button variant="default" size="lg" asChild>
                <Link to="/contact">
                  Inquire About Marble
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={productMarble}
                alt="Premium marble collection"
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Granite Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src={productGranite}
                alt="Premium granite collection"
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-medium"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Granite Collection
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For surfaces that need to withstand the test of time, our granite 
                collection offers unmatched durability and natural beauty. Ideal 
                for kitchen countertops, outdoor spaces, and high-traffic areas.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {graniteTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm text-foreground">{type}</span>
                  </div>
                ))}
              </div>
              <Button variant="default" size="lg" asChild>
                <Link to="/contact">
                  Inquire About Granite
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Custom Design & Crafting
            </h2>
            <p className="text-muted-foreground text-lg">
              Beyond supply, we bring your vision to life. Our skilled craftsmen 
              create custom stone solutions with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {customServices.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Featured Work */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={galleryKitchen}
              alt="Custom kitchen craftsmanship"
              className="w-full aspect-[21/9] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                    See Our Craftsmanship in Action
                  </h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Browse our gallery of completed projects and get inspired 
                    for your own home.
                  </p>
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/gallery">
                      View Gallery
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
