import { companyDetails } from "@/data/content";
import whatsappIcon from "@/assets/whatsapp.png";

const FloatingWhatsApp = () => (
  <a
    href={companyDetails.whatsappHref}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 p-3 text-white shadow-lifted transition-transform duration-300 hover:scale-105"
    aria-label="Chat on WhatsApp"
  >
    <img src={whatsappIcon} alt="" className="h-7 w-7 object-contain" />
  </a>
);

export default FloatingWhatsApp;
