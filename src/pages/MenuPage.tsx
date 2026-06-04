import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check, Plus, Minus, Loader2 } from "lucide-react";
import { categories, type Category } from "@/data/products";
import { useVisibleProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

const FALLBACK =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80";

function ProductCard({ product }: { product: Product }) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-border/40 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.imageUrl || FALLBACK}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK;
          }}
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-md px-3 py-1 rounded-full font-bold text-primary text-sm shadow-sm">
          ₹{product.price}
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
          {product.category}
        </div>
        {/* Cart qty overlay */}
        {qty > 0 && (
          <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-bold shadow">
            {qty} in cart
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg font-bold text-foreground line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-foreground/65 font-light line-clamp-2 flex-1 mb-4">
          {product.description}
        </p>

        {qty === 0 ? (
          <button
            onClick={handleAdd}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              justAdded
                ? "bg-green-500 text-white"
                : "bg-primary/8 border border-primary/25 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" /> Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-primary/8 rounded-xl px-3 py-2 border border-primary/20">
            <button
              onClick={() =>
                qty === 1
                  ? removeFromCart(product.id)
                  : updateQuantity(product.id, qty - 1)
              }
              className="w-8 h-8 rounded-full bg-primary/15 hover:bg-primary hover:text-primary-foreground text-primary flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-primary text-sm">{qty} in cart</span>
            <button
              onClick={handleAdd}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { totalItems, totalPrice, setIsOpen } = useCart();
  const { data: products = [], isLoading, error } = useVisibleProducts();

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full bg-background pt-24 pb-28 min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary font-medium tracking-widest uppercase text-sm mb-3"
        >
          Handcrafted Daily
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4"
        >
          Our Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-foreground/70 font-light max-w-xl mx-auto"
        >
          From artisan breads to delicate pastries — baked fresh every morning
          with premium ingredients.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 }}
          className="w-16 h-1 bg-primary mx-auto rounded-full mt-6"
        />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-card text-foreground border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16 text-foreground/50">
            <p className="text-lg font-serif">
              Could not load products. Please try again.
            </p>
          </div>
        )}

        {/* Product grid */}
        {!isLoading && !error && (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24 text-foreground/50">
                <p className="text-xl font-serif">
                  No products found in this category.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Sticky cart bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-full bg-primary text-primary-foreground rounded-2xl py-4 px-6 flex items-center justify-between shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="font-semibold">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-primary-foreground/70 text-sm">
                  → View Cart
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}