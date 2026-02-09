import { Shield, Heart, Award, Handshake, Gem, MapPin } from "lucide-react";

const features = [
  {
    icon: Handshake,
    title: "Family-Owned Trust",
    description: "We're a family that treats every project like our own home. Honest advice, fair prices, always.",
  },
  {
    icon: Gem,
    title: "Deep Stone Expertise",
    description: "We know stone—from quarry to finish. Our guidance helps you pick the right material for the right space.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Years of serving Goan homes, temples, hotels, and builders. Our work speaks through durability.",
  },
  {
    icon: MapPin,
    title: "Local Goa Presence",
    description: "Based at Pilerne Industrial Estate—visit our yard anytime. We're your neighbours, not a distant seller.",
  },
  {
    icon: Heart,
    title: "Custom Crafting Skills",
    description: "From Tulsi Vrindavan to temple pillars—our craftsmen shape stone by hand with precision and pride.",
  },
  {
    icon: Shield,
    title: "Long-term Durability",
    description: "We focus on finishes that last decades, not just look good on day one. Quality you can trust.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wMykiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
            Why Choose Ganpati Marble & Granite
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Goa's Most Trusted<br />
            <span className="text-gold">Stone Experts</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We've built our reputation on honest guidance, quality materials, 
            and stone work that stands the test of time. Every slab, every cut, 
            every finish—done right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-500 group border border-border/50 hover:border-gold/30"
            >
              <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
