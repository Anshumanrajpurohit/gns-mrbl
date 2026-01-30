import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryLiving from "@/assets/gallery-living.jpg";
import galleryStaircase from "@/assets/gallery-staircase.jpg";

const galleryImages = [
  { src: galleryKitchen, alt: "Marble kitchen countertops", span: "col-span-2 row-span-2" },
  { src: galleryBathroom, alt: "Marble bathroom", span: "col-span-1 row-span-1" },
  { src: galleryLiving, alt: "Marble living room flooring", span: "col-span-1 row-span-1" },
  { src: galleryStaircase, alt: "Grand marble staircase", span: "col-span-2 row-span-1" },
];

const GalleryPreview = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Work Speaks
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Every project tells a story of care and craftsmanship. See how we've 
              transformed Goan homes with premium stone.
            </p>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link to="/gallery">
              View Full Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`${image.span} rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 group`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
