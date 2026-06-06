import { motion } from "framer-motion";

const galleryImages = [
  "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&h=800&fit=crop", // elegant tall cake
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&h=600&fit=crop", // cupcakes
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop", // chocolate cake wide
  "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&h=800&fit=crop", // fruit tart
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop", // macarons
  "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800&h=600&fit=crop", // bread assortment
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Masterpieces</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual treat of what we do best. Follow our Instagram for daily updates!
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-2xl break-inside-avoid"
            >
              {/* gallery masonry layout photo */}
              <img 
                src={src} 
                alt={`Gallery image ${i+1}`} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  DoughandPan's Special
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
