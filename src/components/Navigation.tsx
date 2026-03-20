import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { companyDetails } from "@/data/content";
import logo from "@/assets/logo.png";
import whatsappIcon from "@/assets/whatsapp.png";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/our-story", label: "Our Story" },
  { path: "/collections", label: "Collections" },
  { path: "/craftsmanship", label: "Craftsmanship" },
  { path: "/work", label: "Work" },
  { path: "/contact", label: "Contact" },
];

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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-border/60 bg-background/70 shadow-soft backdrop-blur-[14px]"
          : "border-transparent bg-background/30 backdrop-blur-[8px]"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={logo}
              alt="Ganpati Marble Goa"
              className="block h-10 w-auto shrink-0 object-contain transition duration-300 group-hover:opacity-90 sm:h-11 lg:h-14 xl:h-16"
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative text-sm font-medium transition-all duration-300 hover:text-foreground ${
                  isActive(link.path) ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <Link to="/admin/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
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

          <button onClick={() => setIsOpen((current) => !current)} className="p-2 text-foreground lg:hidden" aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="animate-fade-in-down border-t border-border bg-background lg:hidden">
          <div className="container mx-auto space-y-4 px-4 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 text-lg font-display font-medium transition-colors ${
                  isActive(link.path) ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="space-y-4 border-t border-border pt-6">
              <a href={`tel:${companyDetails.phoneHref}`} className="flex items-center gap-3 text-base font-medium text-foreground">
                <Phone className="h-5 w-5 text-gold" />
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
              <Link to="/admin/login" className="block text-base font-medium text-muted-foreground">
                Admin Login
              </Link>
              <Button variant="warm" className="mt-4 w-full" asChild>
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navigation;
