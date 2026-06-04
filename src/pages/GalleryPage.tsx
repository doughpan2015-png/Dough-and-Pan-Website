import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=900&q=85", category: "Cakes",    alt: "Celebration chocolate cake" },
  { src: "https://plus.unsplash.com/premium_photo-1667806845059-51fa9165bda1?w=900&q=85",    category: "Pastries", alt: "Golden butter croissants" },
  { src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=85", category: "Breads",   alt: "Artisan sourdough loaf" },
  { src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=900&q=85",    category: "Cakes",    alt: "Red velvet celebration cake" },
  { src: "https://images.unsplash.com/photo-1683718203612-077be92890cd?w=900&q=85", category: "Pastries", alt: "Almond danish pastry" },
  { src: "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?w=900&q=85", category: "Cakes",    alt: "Fresh fruit cake" },
  { src: "https://plus.unsplash.com/premium_photo-1673111979369-0222c7314b82?w=900&q=85", category: "Breads",   alt: "Multigrain loaf" },
  { src: "https://plus.unsplash.com/premium_photo-1692805433455-ff41be96b357?w=900&q=85",    category: "Pastries", alt: "Colourful French macarons" },
  { src: "https://images.unsplash.com/photo-1571942948809-74637bfc59b9?w=900&q=85", category: "Events",   alt: "Chocolate fondant dessert" },
  { src: "https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?w=900&q=85", category: "Pastries",    alt: "Chocolaye Pastry" },
  { src: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=900&q=85", category: "Breads", alt: "Chocolate éclairs" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQMvz7ud23uYtNLqcIlWqQX1GpEP5qRXUcYSY8bUUn3jRqwbfz-2qCKX51hkNzqUrryroF2EnLnusGZiyqmb9b2u-2xhoKF1SDVn2BQ&s=10", category: "Breads",   alt: "Focaccia with rosemary" },
  { src: "https://images.unsplash.com/photo-1686515266396-080c4939e6b4?w=900&q=85", category: "Events",   alt: "Freshly baked cookies" },
  { src: "https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=900&q=85", category: "Cakes", alt: "Pain au chocolat" },
  { src: "/images/hamper2.jpg", category: "Hampers", alt: "Elegant hamper with wine and chocolates" },
  { src: "https://images.unsplash.com/photo-1677825948767-5d379d012bda?w=900&q=85", category: "Breads",   alt: "Hazelnut tart slice" },
  { src: "/images/hamper11.jpg", category: "Hampers", alt: "Festive hamper with cookies and pastries" },
  { src: "/images/black-coffee.png", category: "Beverages",   alt: "Artisan café latte" },
  { src: "/images/ice-tea.png", category: "Beverages", alt: "Iced tea" },
  { src: "/images/cold-coffee.png", category: "Beverages", alt: "Cold coffee" },
  { src: "/images/hamper1.jpg", category: "Hampers", alt: "Gourmet hamper with assorted treats" },
];

const categories = ["All", "Cakes", "Pastries", "Breads", "Events", "Hampers", "Beverages"];

const FALLBACK = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="w-full bg-background pt-24 pb-24 min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
          Visual Feast
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4"
        >
          Our Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-foreground/70 font-light max-w-xl mx-auto"
        >
          Every creation tells a story — baked with love, crafted with artistry.
        </motion.p>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="w-16 h-1 bg-primary mx-auto rounded-full mt-6" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-card text-foreground border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.06 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm cursor-pointer"
                onClick={() => setLightbox({ src: img.src, alt: img.alt })}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <ZoomIn className="w-9 h-9 text-white mb-2 drop-shadow" />
                  <span className="text-white font-semibold text-sm uppercase tracking-widest drop-shadow">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-serif text-xl">No images in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
