import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { companyDetails, serviceOptions } from "@/data/content";
import { submitEnquiry } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Provide a valid email"),
  service: z.string().min(2, "Select a service"),
  message: z.string().min(10, "Tell us more about your requirement"),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

const Contact = () => {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get("service") || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryForm>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: defaultService,
      message: "",
    },
  });

  const serviceValue = watch("service");

  const onSubmit = async (values: EnquiryForm) => {
    try {
      await submitEnquiry(values);
      toast.success("Enquiry submitted. We'll call you shortly.");
      reset({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit enquiry";
      toast.error(message);
    }
  };

  return (
    <div className="bg-background">
      <Helmet>
        <title>Contact Ganpati Marble Goa | Book a Yard Visit or Request a Quote</title>
        <meta
          name="description"
          content="Send enquiries for marble, granite, vitrified tiles, temple crafting, and custom stone work. Visit Ganpati Marble Goa at Pilerne Industrial Estate."
        />
      </Helmet>

      <section className="bg-secondary px-4 py-16 md:py-24">
        <div className="container mx-auto text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Let&apos;s talk stone</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">Share your drawings, ask for samples, or book a visit.</h1>
          <p className="mt-6 text-lg text-muted-foreground md:max-w-3xl">
            Expect a call from {companyDetails.owner} or our project desk within 24 hours. We&apos;ll walk you through options for marble, granite, temple work,
            custom crafting, tiles, Kota, or rough stone supply.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1fr,0.85fr]">
          <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-lifted">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" placeholder="Your full name" {...register("name")} />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" placeholder="+91 98229 83752" {...register("phone")} />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" placeholder="you@example.com" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Service Interested In *</Label>
                <Select value={serviceValue || undefined} onValueChange={(value) => setValue("service", value, { shouldValidate: true })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-sm text-destructive">{errors.service.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Tell us about your project *</Label>
                <Textarea id="message" rows={5} placeholder="Floor area, temple size, counter length, drawings..." {...register("message")} />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>
              <Button type="submit" variant="warm" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
              <h2 className="font-display text-2xl">Come see the slabs</h2>
              <p className="mt-4 text-sm text-muted-foreground">Visit our yard at {companyDetails.address}</p>
              <div className="mt-6 space-y-4 text-sm text-foreground">
                <a href={`tel:${companyDetails.phoneHref}`} className="flex items-center gap-3 rounded-2xl border border-border/60 px-4 py-3 transition hover:border-gold">
                  <Phone className="h-4 w-4 text-gold" />
                  {companyDetails.phone}
                </a>
                <a href={`mailto:${companyDetails.email}`} className="flex items-center gap-3 rounded-2xl border border-border/60 px-4 py-3 transition hover:border-gold">
                  <Mail className="h-4 w-4 text-gold" />
                  {companyDetails.email}
                </a>
                <div className="flex items-start gap-3 rounded-2xl border border-border/60 px-4 py-3">
                  <MapPin className="mt-1 h-4 w-4 text-gold" />
                  <span>{companyDetails.address}</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-soft" style={{ minHeight: 300 }}>
              <iframe
                src={companyDetails.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ganpati Marble Goa Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
