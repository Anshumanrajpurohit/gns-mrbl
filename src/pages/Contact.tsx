import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import showroomImage from "@/assets/showroom.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for reaching out! We'll get back to you shortly.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Get in Touch
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              We'd Love to<br />
              <span className="text-gold">Hear from You</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Whether you have a question, need guidance, or want to see our 
              collection in person—we're here to help. No pressure, just 
              honest conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl bg-card border-border/50 focus:border-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl bg-card border-border/50 focus:border-gold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">Email (Optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 rounded-xl bg-card border-border/50 focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-medium">How Can We Help? *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, ask questions, or just say hello..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[150px] rounded-xl bg-card border-border/50 focus:border-gold resize-none"
                  />
                </div>
                <Button type="submit" variant="warm" size="lg" className="w-full sm:w-auto">
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Showroom Image */}
              <div className="rounded-2xl overflow-hidden shadow-medium">
                <img 
                  src={showroomImage} 
                  alt="Our Showroom" 
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>

              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Visit Our Showroom
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Come experience our collection in person. Touch the stone, explore 
                  options, and let us help you find the perfect match for your home.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50 hover:border-gold/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Call Us</p>
                    <p className="text-muted-foreground text-sm">+91 98765 43210</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50 hover:border-gold/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">WhatsApp</p>
                    <p className="text-muted-foreground text-sm">Chat with us</p>
                  </div>
                </a>

                <a
                  href="mailto:info@ganpatimarble.com"
                  className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50 hover:border-gold/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Email</p>
                    <p className="text-muted-foreground text-sm">info@ganpatimarble.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Hours</p>
                    <p className="text-muted-foreground text-sm">Mon-Sat: 9AM-7PM<br />Sun: 10AM-4PM</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-card rounded-xl p-5 border border-border/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Our Location</p>
                    <p className="text-muted-foreground text-sm">
                      Pilerne Industrial Estate,<br />
                      Pilerne, Bardez, Goa 403511
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-soft h-[250px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.8897989024!2d73.79!3d15.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDMxJzQ4LjAiTiA3M8KwNDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ganpati Marble & Granite Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
