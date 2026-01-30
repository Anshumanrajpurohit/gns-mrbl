import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-display text-xl font-bold">G</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-background leading-tight">
                  Ganpati Marble
                </h3>
                <p className="text-xs text-background/60 tracking-wide">& Granite</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              A trusted family business serving Goan homes with premium 
              marble and granite since 2004. Quality you can trust, 
              craftsmanship you can see.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-background/80" />
              </a>
              <a 
                href="tel:+919876543210"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <Phone className="w-5 h-5 text-background/80" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold text-background">Explore</h4>
            <div className="space-y-3">
              {[
                { path: "/story", label: "Our Story" },
                { path: "/products", label: "Stone Collections" },
                { path: "/craftsmanship", label: "Craftsmanship" },
                { path: "/gallery", label: "Our Work" },
                { path: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-background/60 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold text-background">Get in Touch</h4>
            <div className="space-y-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-background/60 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-background/60 hover:text-gold transition-colors"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="mailto:info@ganpatimarble.com"
                className="flex items-center gap-3 text-sm text-background/60 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@ganpatimarble.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-background/60">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Pilerne Industrial Estate,<br />Bardez, Goa 403511</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="font-display text-lg font-semibold text-background">Showroom Hours</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-background/60">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-background mb-1">Monday – Saturday</p>
                  <p>9:00 AM – 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-background/60">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0" />
                <div>
                  <p className="text-background mb-1">Sunday</p>
                  <p>10:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>
            <p className="text-background/50 text-xs italic">
              Walk-ins welcome. For large projects, we recommend scheduling a consultation.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} Ganpati Marble & Granite. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm text-background/50">
                Made with care in Goa 🌴
              </p>
              <button 
                onClick={scrollToTop}
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-background/80" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
