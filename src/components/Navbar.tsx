import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu as MenuIcon, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendToWhatsApp } from "@/utils/whatsapp";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home",      href: "/" },
  { name: "About",     href: "/about" },
  { name: "Menu",      href: "/menu" },
  { name: "Customize", href: "/customize" },
  { name: "Gallery",   href: "/gallery" },
  { name: "Contact",   href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
            : "bg-background/60 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}images/doughandpan-logo.jpg`}
                    alt="Dough & Pan Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif text-xl font-semibold text-foreground hidden sm:block">Dough & Pan</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div className={`text-sm font-medium transition-colors relative group cursor-pointer ${location === link.href ? "text-primary" : "text-foreground/75 hover:text-primary"}`}>
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${location === link.href ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </div>
                </Link>
              ))}

              {/* Cart icon */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[1.1rem] bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center leading-none px-0.5"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => sendToWhatsApp("Hello Dough & Pan! I'd like to place an order.")}
                className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Order Now
              </button>
            </nav>

            {/* Mobile right section */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
              <button
                className="p-2 text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-30 pt-20 bg-background border-l border-border md:hidden flex flex-col"
          >
            <div className="flex flex-col items-center gap-7 p-8 flex-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-3xl font-medium transition-colors cursor-pointer ${location === link.href ? "text-primary" : "text-foreground hover:text-primary"}`}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sendToWhatsApp("Hello Dough & Pan! I'd like to place an order.");
                }}
                className="mt-6 px-8 py-3 rounded-full bg-primary text-primary-foreground text-lg font-medium shadow-md w-full max-w-xs"
              >
                Order Now
              </button>
            </div>
            <div className="p-8 text-center border-t border-border">
              <p className="text-muted-foreground text-sm">4 Nehru Road, Meerut</p>
              <p className="text-muted-foreground text-sm mt-1">+91 95609 85539</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
