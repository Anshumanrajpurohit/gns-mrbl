import { Link } from "react-router-dom";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

import { companyDetails } from "@/data/content";
import logo from "@/assets/logo.png";
import whatsappIcon from "@/assets/whatsapp.png";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Our Story", path: "/our-story" },
  { label: "Collections", path: "/collections" },
  { label: "Craftsmanship", path: "/craftsmanship" },
  { label: "Work", path: "/work" },
  { label: "Contact", path: "/contact" },
];

const hours = [
  { label: "Monday - Saturday", value: "9:00 AM - 7:00 PM" },
  { label: "Sunday", value: "10:00 AM - 4:00 PM" },
];

interface FooterProps {
  minimal?: boolean;
}

const Footer = ({ minimal = false }: FooterProps) => {
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (minimal) {
    return (
      <footer className="border-t border-border/60 bg-background">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <p>
            © {year} {companyDetails.name}. All rights reserved.
          </p>
          <Link to="/" className="font-medium text-foreground transition hover:text-gold">
            Back to website
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-5">
            <div>
              <img src={logo} alt="Ganpati Marble Goa" className="mb-3 h-14 w-14 rounded-xl bg-white/90 object-contain p-1 shadow-soft" />
              <p className="text-sm uppercase tracking-[0.4em] text-gold">{companyDetails.name}</p>
              <h3 className="mt-2 font-display text-2xl">{companyDetails.owner}</h3>
              <p className="text-xs uppercase tracking-[0.4em] text-background/70">Founder</p>
            </div>
            <p className="text-sm text-background/70">
              Premium marble, granite, temple crafting, vitrified tiles, Kota stone, and custom fabrications from our yard at Pilerne Industrial Estate.
            </p>
            <div className="flex gap-3">
              <a
                href={companyDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/10 transition hover:bg-gold/25"
                aria-label="Open WhatsApp"
              >
                <img src={whatsappIcon} alt="" className="h-5 w-5 object-contain" />
              </a>
              <a href={`tel:${companyDetails.phoneHref}`} className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/10 transition hover:bg-gold/25">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg">Navigate</h4>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link className="transition hover:text-gold" to={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="transition hover:text-gold" to="/admin/login">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-sm text-background/70">
            <h4 className="font-display text-lg">Reach Us</h4>
            <a href={`tel:${companyDetails.phoneHref}`} className="flex items-center gap-3 transition hover:text-gold">
              <Phone className="h-4 w-4" />
              {companyDetails.phone}
            </a>
            <a href={`mailto:${companyDetails.email}`} className="flex items-center gap-3 transition hover:text-gold">
              <Mail className="h-4 w-4" />
              {companyDetails.email}
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4" />
              <span>{companyDetails.address}</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg">Yard Hours</h4>
            <div className="mt-4 space-y-2 text-sm text-background/70">
              {hours.map((slot) => (
                <p key={slot.label}>
                  <span className="font-medium text-background">{slot.label}</span>
                  <br />
                  {slot.value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-6 text-sm text-background/60 md:flex-row md:justify-between">
          <p>
            © {year} {companyDetails.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition hover:bg-gold/25"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
