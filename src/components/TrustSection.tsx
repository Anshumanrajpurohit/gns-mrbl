import { Shield, Heart, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality You Can Trust",
    description: "Every stone we supply is hand-selected for durability and beauty. No shortcuts, ever.",
  },
  {
    icon: Heart,
    title: "Personal Care",
    description: "We treat every home like our own. Your vision matters to us personally.",
  },
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description: "Our skilled craftsmen bring decades of experience to every custom design.",
  },
  {
    icon: Users,
    title: "Family Values",
    description: "Built on relationships, not transactions. We're here for the long run.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Families Trust Ganpati
          </h2>
          <p className="text-muted-foreground text-lg">
            For over two decades, we've been helping Goan families build beautiful homes 
            with stone that lasts generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-accent-foreground group-hover:text-gold-foreground transition-colors duration-300" />
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
