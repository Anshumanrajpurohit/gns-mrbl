import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryLiving from "@/assets/gallery-living.jpg";
import galleryStaircase from "@/assets/gallery-staircase.jpg";

const galleryImages = [
  { src: galleryKitchen, alt: "Marble kitchen countertops", span: "md:col-span-2 md:row-span-2" },
  { src: galleryBathroom, alt: "Luxurious marble bathroom", span: "md:col-span-1 md:row-span-1" },
  { src: galleryLiving, alt: "Marble living room flooring", span: "md:col-span-1 md:row-span-1" },
  { src: galleryStaircase, alt: "Grand marble staircase", span: "md:col-span-2 md:row-span-1" },
];

const GalleryPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-gold text-sm font-medium mb-4 tracking-wider uppercase">
              Our Craftsmanship
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Stories Written<br />
              <span className="text-gold">In Stone</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Every project is a story of trust—from the moment you walk into 
              our showroom to the final polish on your new floor.
            </p>
          </div>
          <Button variant="elegant" size="lg" asChild>
            <Link to="/gallery">
              View Full Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px] md:auto-rows-[200px]">
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
