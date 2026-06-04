import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { products, categories, type Category } from "@/data/products";
import { sendToWhatsApp } from "@/utils/whatsapp";

export function Menu() {
  const [activeTab, setActiveTab] = useState<Category | "All">("All");

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Menu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of freshly baked delights. Everything is made to order for the perfect taste.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("All")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === "All" 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary text-foreground hover:bg-primary/10"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === category 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-secondary text-foreground hover:bg-primary/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="bg-card rounded-3xl overflow-hidden shadow-warm hover:shadow-warm-hover transition-all duration-300 group border border-border/50"
              >
                <div className="relative h-64 overflow-hidden">
                  {/* Using Unsplash placeholder images deterministically based on seed */}
                  {/* menu item beautiful bakery food photo */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground leading-tight pr-4">
                      {product.name}
                    </h3>
                    <span className="text-xl font-bold text-primary shrink-0">
                      ₹{product.price}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => sendToWhatsApp(`Hello! I would like to order: ${product.name} (₹${product.price}) from your menu.`)}
                    className="w-full py-3 rounded-xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
