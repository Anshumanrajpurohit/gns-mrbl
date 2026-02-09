import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import poojaRoom from "@/assets/pooja-room.jpg";
import staircaseLuxury from "@/assets/staircase-luxury.jpg";
import kitchenGranite from "@/assets/kitchen-granite.jpg";
import livingFlooring from "@/assets/living-flooring.jpg";

const applications = [
  {
    title: "Temples & Spiritual Spaces",
    description: "Tulsi Vrindavan, temple pillars, steps & sacred stone work crafted with devotion.",
    image: poojaRoom,
  },
  {
    title: "Villas & Bungalows",
    description: "Grand staircases, premium flooring & custom stone elements for luxury homes.",
    image: staircaseLuxury,
  },
  {
    title: "Kitchens & Platforms",
    description: "Durable granite countertops and platforms built for the demands of Indian cooking.",
    image: kitchenGranite,
  },
  {
    title: "Hotels & Resorts",
    description: "Large-scale stone supply and finishing for Goa's hospitality and commercial spaces.",
    image: livingFlooring,
  },
];

const ApplicationsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Where Our Stone Goes
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Built for Every<br />
              <span className="text-gold">Space & Purpose</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From sacred temples to modern kitchens, luxury villas to commercial 
              projects—we supply and craft stone solutions that fit perfectly.
            </p>
          </div>
          <Button variant="elegant" size="lg" asChild>
            <Link to="/craftsmanship">
              View All Applications
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app, index) => (
            <Link
              key={index}
              to="/craftsmanship"
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-soft hover:shadow-lifted transition-all duration-500"
            >
              <img
                src={app.image}
                alt={app.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                  {app.title}
                </h3>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  {app.description}
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-medium mt-4 group-hover:gap-3 transition-all text-sm">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
