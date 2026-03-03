import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyDetails } from "@/data/content";
import logo from "@/assets/logo.png";
import whatsappIcon from "@/assets/whatsapp.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const updateScrolledState = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled((previous) => (previous === nextScrolled ? previous : nextScrolled));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrolledState);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-border/60 bg-background/65 backdrop-blur-[12px] shadow-soft"
          : "border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Ganpati Marble Goa"
              className="block h-10 w-auto shrink-0 object-contain sm:h-11 lg:h-14 xl:h-16"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative text-sm font-medium transition-all duration-300 hover:text-foreground ${
                  isActive(link.path) ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
          </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/admin/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Admin
              </Link>
            <a
              href={companyDetails.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/90 shadow-soft transition duration-300 hover:scale-105 hover:text-gold"
              aria-label="Open WhatsApp"
            >
              <img src={whatsappIcon} alt="" className="h-6 w-6 object-contain" />
            </a>
            <Button variant="warm" size="sm" asChild>
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
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
                href={`tel:${companyDetails.phoneHref}`}
                className="flex items-center gap-3 text-base font-medium text-foreground"
              >
                <Phone className="w-5 h-5 text-gold" />
                <span>{companyDetails.phone}</span>
              </a>
              <a 
                href={companyDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card shadow-soft transition duration-300 hover:scale-105"
                aria-label="Open WhatsApp"
              >
                <img src={whatsappIcon} alt="" className="h-7 w-7 object-contain" />
              </a>
              <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block text-base font-medium text-muted-foreground">
                Admin Login
              </Link>
              <Button variant="warm" className="w-full mt-4" asChild>
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
