import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Naik",
    role: "Homeowner, Porvorim",
    content: "Ganpati Marble supplied all the granite for our villa and even crafted a beautiful Tulsi Vrindavan for our courtyard. Their quality and care is unmatched.",
    rating: 5,
  },
  {
    name: "Architect Rajan Desai",
    role: "Desai & Associates, Panjim",
    content: "I recommend Ganpati to all my clients. They understand stone deeply—from the right material for kitchen platforms to temple-grade marble. Reliable and honest.",
    rating: 5,
  },
  {
    name: "Suresh & Kavita Shetty",
    role: "Homeowners, Mapusa",
    content: "From our pooja room marble to the staircase granite—everything was handled with such care. It feels like family taking care of our home.",
    rating: 5,
  },
];

const stats = [
  { value: "20+", label: "Years of Trust" },
  { value: "2000+", label: "Happy Homes" },
  { value: "500+", label: "Projects in Goa" },
  { value: "100%", label: "Quality Focus" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-secondary border border-border/50">
              <p className="font-display text-3xl md:text-4xl font-bold text-gold mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
            Words from Our Customers
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by Families<br />
            <span className="text-gold">Across Goa</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our greatest achievement is the trust customers place in us. 
            Here's what they say about working with Ganpati Marble & Granite.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-soft border border-border/50 hover:border-gold/30 hover:shadow-medium transition-all duration-500 relative"
            >
              <Quote className="w-10 h-10 text-gold/20 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
