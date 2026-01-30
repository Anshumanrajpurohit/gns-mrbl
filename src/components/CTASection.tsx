import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Build Your Dream Home?
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Visit our showroom in Pilerne, give us a call, or simply drop a message. 
            We're always happy to help—no pressure, just honest advice.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" asChild>
              <a href="tel:+919876543210">
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/contact">
                <MapPin className="w-5 h-5" />
                Visit Showroom
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          <p className="text-primary-foreground/60 text-sm">
            Open Monday–Saturday 9AM–7PM | Sunday 10AM–4PM
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
