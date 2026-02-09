import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/story", label: "Our Story" },
    { path: "/products", label: "Products" },
    { path: "/craftsmanship", label: "Crafting" },
    { path: "/gallery", label: "Our Work" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-background/98 backdrop-blur-md shadow-soft border-b border-border" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-22">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
              <span className="text-gold font-display text-xl font-bold">G</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-display text-xl font-semibold leading-tight transition-colors duration-300 ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}>
                Ganpati Marble
              </h1>
              <p className={`text-xs tracking-wider transition-colors duration-300 ${
                scrolled ? "text-muted-foreground" : "text-primary-foreground/70"
              }`}>& Granite</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-gold relative group ${
                  scrolled 
                    ? (isActive(link.path) ? "text-gold" : "text-muted-foreground")
                    : (isActive(link.path) ? "text-gold" : "text-primary-foreground/90")
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-foreground hover:text-gold" : "text-primary-foreground hover:text-gold"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <Button variant={scrolled ? "warm" : "heroGold"} size="sm" asChild>
              <Link to="/contact">Visit Our Yard</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in-down">
          <div className="container mx-auto px-4 py-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-display font-medium transition-colors py-2 ${
                  isActive(link.path)
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-border space-y-4">
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-3 text-base font-medium text-foreground"
              >
                <Phone className="w-5 h-5 text-gold" />
                <span>+91 98765 43210</span>
              </a>
              <a 
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-base font-medium text-foreground"
              >
                <MessageCircle className="w-5 h-5 text-gold" />
                <span>Chat on WhatsApp</span>
              </a>
              <Button variant="warm" className="w-full mt-4" asChild>
                <Link to="/contact">Visit Our Yard</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
