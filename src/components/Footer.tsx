import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-display text-lg font-bold">G</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold leading-tight">
                  Ganpati Marble
                </h3>
                <p className="text-xs text-primary-foreground/70">& Granite</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Trusted for quality stone craftsmanship in Goa. Building dreams, one stone at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Quick Links</h4>
            <div className="space-y-3">
              {[
                { path: "/about", label: "About Us" },
                { path: "/products", label: "Our Products" },
                { path: "/gallery", label: "Work Gallery" },
                { path: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="mailto:info@ganpatimarble.com"
                className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@ganpatimarble.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Pilerne Industrial Estate,<br />Goa, India</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Showroom Hours</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Monday - Saturday</p>
                  <p className="text-primary-foreground">9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0" />
                <div>
                  <p>Sunday</p>
                  <p className="text-primary-foreground">10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Ganpati Marble & Granite. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Crafted with care in Goa 🌴
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
