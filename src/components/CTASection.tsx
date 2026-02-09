import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import showroomImage from "@/assets/showroom.jpg";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gold/10 blur-2xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              We'd Love to Meet You
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Visit Our Yard<br />
              <span className="text-gold">in Pilerne, Goa</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Walk through our stone collection, see slabs up close, and get honest 
              material guidance. Whether you need granite for a kitchen or marble for 
              a temple—we'll help you choose right.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <a 
                href="tel:+919876543210"
                className="flex items-center gap-4 bg-primary-foreground/10 rounded-xl p-4 hover:bg-primary-foreground/15 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wide">Call Us</p>
                  <p className="text-primary-foreground font-medium">+91 98765 43210</p>
                </div>
              </a>
              
              <a 
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-primary-foreground/10 rounded-xl p-4 hover:bg-primary-foreground/15 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wide">WhatsApp</p>
                  <p className="text-primary-foreground font-medium">Chat with Us</p>
                </div>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-primary-foreground/70 text-sm mb-10">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-gold" />
                <span>72/2, Pilerne Industrial Estate,<br />Pilerne, Saligao, Goa – 403511</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 mt-0.5 text-gold" />
                <span>Mon-Sat: 9AM-7PM<br />Sunday: 10AM-4PM</span>
              </div>
            </div>

            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get Directions & Contact
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lifted">
              <img 
                src={showroomImage} 
                alt="Ganpati Marble & Granite Stone Yard" 
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-5 shadow-medium border border-border max-w-[200px]">
              <p className="font-display text-2xl font-bold text-gold">20+</p>
              <p className="text-muted-foreground text-sm">Years serving Goan families with trust</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
