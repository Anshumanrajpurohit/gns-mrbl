import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { galleryCategories, galleryItems } from "@/data/content";

const Gallery = () => {
  const [category, setCategory] = useState<string>("All");
  const filteredItems = category === "All" ? galleryItems : galleryItems.filter((item) => item.category === category);

  return (
    <div className="bg-background">
      <Helmet>
        <title>Gallery | Stone Projects by Ganpati Marble Goa</title>
        <meta
          name="description"
          content="Browse marble, granite, temple crafting, and custom stone projects completed by Ganpati Marble Goa across villas, resorts, and sacred spaces."
        />
      </Helmet>

      {/* Page Header */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="max-w-2xl">
              <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
                Our Craftsmanship
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Stories Written<br />
                <span className="text-gold">In Stone</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Temple craftsmanship, marble floors, granite kitchens, vitrified tile 
                lobbies, and Kota stone steps—delivered by our in-house teams across Goa.
              </p>
            </div>
            <Button variant="warm" size="lg" asChild>
              <Link to="/contact">
                Start a Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {galleryCategories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  category === item
                    ? "bg-gold text-primary-foreground shadow-soft"
                    : "bg-secondary text-muted-foreground hover:text-gold hover:bg-secondary border border-border/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((project) => (
              <Link
                key={project.id}
                to={`/contact?service=${encodeURIComponent(project.category)}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-soft hover:shadow-lifted transition-all duration-500"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold text-xs font-medium tracking-wider uppercase">{project.category}</span>
                    <span className="text-primary-foreground/60 text-xs">{project.location}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold font-medium mt-4 group-hover:gap-3 transition-all text-sm">
                    Enquire About This <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* No results fallback */}
          {filteredItems.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
            Start Your Project
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Seen Something You Like?<br />
            <span className="text-gold">Let's Discuss Your Space</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Walk into our yard at Pilerne, see the slabs in person, and get 
            honest guidance on what stone will work best for your project.
          </p>
          <Button variant="warm" size="xl" asChild>
            <Link to="/contact">
              Get a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
