import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Star, Clock, ShieldCheck, Heart, ArrowDown, ShoppingBag, Check, Plus, Minus, Loader2, Play, Instagram } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef, useState, useEffect, Component, type ReactNode } from "react";
import * as THREE from "three";
import { sendToWhatsApp } from "@/utils/whatsapp";
import { useCart } from "@/context/CartContext";
import { useFeaturedProducts } from "@/hooks/useProducts";
import type { Product } from "@/lib/types";

/* ── WebGL ────────────────────────────────────────────────────────────── */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch { return false; }
}
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

/* ── 3D Cake ──────────────────────────────────────────────────────────── */
function RotatingCake() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.35; });
  return (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -1, 0]}>
        <mesh position={[0, -0.05, 0]}><cylinderGeometry args={[2.2, 2.2, 0.08, 64]} /><meshStandardMaterial color="#E5D3B3" roughness={0.8} /></mesh>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow><cylinderGeometry args={[1.9, 1.9, 1.1, 64]} /><meshStandardMaterial color="#6B3A2A" roughness={0.3} /></mesh>
        <mesh position={[0, 1.15, 0]}><cylinderGeometry args={[1.95, 1.95, 0.12, 64]} /><meshStandardMaterial color="#FFF8F0" roughness={0.2} /></mesh>
        <mesh position={[0, 1.75, 0]} castShadow receiveShadow><cylinderGeometry args={[1.4, 1.4, 0.9, 64]} /><meshStandardMaterial color="#C87941" roughness={0.25} /></mesh>
        <mesh position={[0, 2.22, 0]}><cylinderGeometry args={[1.45, 1.45, 0.1, 64]} /><meshStandardMaterial color="#FFF8F0" roughness={0.2} /></mesh>
        <mesh position={[0, 2.8, 0]} castShadow receiveShadow><cylinderGeometry args={[0.9, 0.9, 0.75, 64]} /><meshStandardMaterial color="#F0D9A8" roughness={0.2} /></mesh>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.55, 3.2, Math.sin(angle) * 0.55]} castShadow>
            <sphereGeometry args={[0.13, 32, 32]} /><meshStandardMaterial color="#CC2030" roughness={0.1} />
          </mesh>
        ))}
        <mesh position={[0, 3.3, 0]} castShadow><sphereGeometry args={[0.15, 32, 32]} /><meshStandardMaterial color="#CC2030" roughness={0.1} /></mesh>
      </group>
    </Float>
  );
}

function CakeFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center">
        <div className="flex gap-5 mb-1">{[0,1,2].map(i => (<div key={i} className="flex flex-col items-center"><motion.div animate={{ opacity: [1,0.4,1] }} transition={{ duration: 0.9, repeat: Infinity, delay: i*0.25 }} className="w-3 h-3 rounded-full bg-yellow-300 mb-1"/><div className="w-2 h-8 bg-gradient-to-b from-yellow-100 to-yellow-400 rounded-sm"/></div>))}</div>
        <div className="w-28 h-14 bg-gradient-to-b from-amber-50 to-amber-100 rounded-t-2xl border-2 border-pink-200"/>
        <div className="w-40 h-16 bg-gradient-to-b from-amber-300 to-amber-500 border-y-2 border-amber-200"/>
        <div className="w-56 h-20 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-2xl shadow-2xl"/>
        <div className="w-60 h-3 bg-amber-200 rounded-full mt-1 shadow-lg"/>
      </motion.div>
    </div>
  );
}

/* ── Featured card ────────────────────────────────────────────────────── */
const FALLBACK = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80";

function FeaturedCard({ product }: { product: Product }) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find(i => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    if (!product.isInStock) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-w-[280px] sm:min-w-0 bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 snap-center group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-background/92 backdrop-blur-sm rounded-full text-[11px] font-semibold text-primary uppercase tracking-wider">
          {product.category}
        </div>
        {qty > 0 && product.isInStock && (
          <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-bold">
            {qty}×
          </div>
        )}
        <img
          src={product.imageUrl || FALLBACK}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!product.isInStock ? "opacity-60" : ""}`}
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
        />
        {!product.isInStock && (
          <div className="absolute inset-0 bg-background/40 flex items-center justify-center z-10">
            <span className="bg-foreground/80 text-background text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          <span className="text-primary font-bold text-sm ml-2 flex-shrink-0">₹{product.price}</span>
        </div>
        <p className="text-xs text-foreground/65 mb-4 line-clamp-2 flex-1">{product.description}</p>
        {!product.isInStock ? (
          <button disabled className="w-full py-2.5 rounded-xl font-semibold text-sm bg-muted text-foreground/40 border border-border cursor-not-allowed">
            Out of Stock
          </button>
        ) : qty === 0 ? (
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              justAdded ? "bg-green-500 text-white" : "bg-primary/8 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {justAdded ? <><Check className="w-4 h-4" />Added!</> : <><ShoppingBag className="w-4 h-4" />Add to Cart</>}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-primary/8 rounded-xl px-3 py-2 border border-primary/20">
            <button onClick={() => qty === 1 ? removeFromCart(product.id) : updateQuantity(product.id, qty - 1)} className="w-7 h-7 rounded-full bg-primary/15 hover:bg-primary hover:text-primary-foreground text-primary flex items-center justify-center transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-bold text-primary text-xs">{qty} in cart</span>
            <button onClick={handleAdd} className="w-7 h-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 flex items-center justify-center transition-colors">
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Viral Video Section ──────────────────────────────────────────────── */
function ViralVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
      setStarted(true);
    }
  };

  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest">
              <Instagram className="w-3.5 h-3.5" />
              Trending on Instagram
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
              The Reel Everyone's<br />
              <span className="text-primary italic">Talking About</span>
            </h2>
            <p className="text-lg text-foreground/70 font-light leading-relaxed">
              From our kitchen to your feed, It is a sigh of relief for us when our cakes are devoured by people.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://www.instagram.com/reel/DYtma5XSNmV/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                View on Instagram
              </a>
              <a
                href="https://www.instagram.com/doughandpan_/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Follow @doughandpan_
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
              <div className="absolute -inset-3 rounded-[2.5rem] border-2 border-primary/20 -rotate-2" />
              <div className="absolute -inset-3 rounded-[2.5rem] border border-accent/40 rotate-1" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-foreground aspect-[9/16]">
                <video
                  ref={videoRef}
                  src="/videos/viral-reel.mp4"
                  className="w-full h-full object-cover"
                  playsInline
                  loop
                  onEnded={() => setPlaying(false)}
                />
                {!started && (
                  <div className="absolute inset-0 bg-foreground/30 backdrop-blur-[2px]" />
                )}
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label={playing ? "Pause video" : "Play video"}
                >
                  <motion.div
                    animate={{ scale: playing ? 0.85 : 1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-opacity duration-300 ${
                      playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                    } bg-white/90 backdrop-blur-sm`}
                  >
                    {playing
                      ? <div className="flex gap-1.5"><div className="w-1.5 h-6 bg-foreground rounded-full" /><div className="w-1.5 h-6 bg-foreground rounded-full" /></div>
                      : <Play className="w-7 h-7 text-foreground fill-foreground ml-1" />
                    }
                  </motion.div>
                </button>
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Instagram className="w-3.5 h-3.5" />
                  @doughandpan_
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Riya Sharma",  text: "The mango cake was absolutely divine! Best bakery in Meerut.", initials: "RS" },
  { name: "Arjun Mehta",  text: "Sourdough loaf reminds me of European bakeries. Incredible quality.", initials: "AM" },
  { name: "Priya Kapoor", text: "Ordered a custom wedding cake — it was more beautiful than I imagined.", initials: "PK" },
];

const instagramImages = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&q=80",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
  "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80",
];

function FloatingBadge({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute hidden lg:flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 px-4 py-2.5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const { data: featuredProducts = [], isLoading: featuredLoading } = useFeaturedProducts();

  useEffect(() => { setWebglOk(isWebGLAvailable()); }, []);

  return (
    <div className="w-full">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          <img
            src="/images/hero.png"
            alt="Dough & Pan bakery interior"
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555507036-ab1d4075cff3?w=1800&q=80"; }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/88 via-foreground/55 to-foreground/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-amber-950/20 mix-blend-multiply" />

        <FloatingBadge className="top-36 right-16" delay={1.0}>
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"><span className="text-green-600 text-base">🌿</span></div>
          <div><p className="text-xs font-bold text-foreground">100% Fresh</p><p className="text-[10px] text-foreground/60">Baked Today</p></div>
        </FloatingBadge>
        <FloatingBadge className="bottom-44 right-24" delay={1.2}>
          <div className="flex -space-x-2">
            {["RS","AM","PK"].map(i => (<div key={i} className="w-7 h-7 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[9px] font-bold text-primary">{i}</div>))}
          </div>
          <div>
            <div className="flex text-yellow-500">{[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}</div>
            <p className="text-[10px] text-foreground/60 mt-0.5">500+ Happy Customers</p>
          </div>
        </FloatingBadge>
        <FloatingBadge className="top-52 right-72" delay={1.4}>
          <span className="text-xl">🎂</span>
          <div><p className="text-xs font-bold text-foreground">Custom Cakes</p><p className="text-[10px] text-foreground/60">Order Today</p></div>
        </FloatingBadge>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-24">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Artisan Bakery & Pâtisserie · Meerut
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-6">
              Crafted With<br /><span className="italic" style={{ color: "hsl(28 80% 72%)" }}>Love & Joy</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl text-white/75 font-light leading-relaxed mb-4 max-w-lg">
              Artisan breads, handcrafted pastries  & celebration cakes are freshly baked every morning.
            </motion.p>
            <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.45 }}
              className="w-16 h-0.5 rounded-full mb-10" style={{ background: "hsl(28 80% 65%)" }} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <button className="group relative overflow-hidden px-9 py-4 rounded-full font-semibold text-base shadow-2xl transition-all duration-300 w-full sm:w-auto hover:-translate-y-1 hover:shadow-accent/30"
                  style={{ background: "hsl(28 55% 28%)", color: "hsl(38 60% 97%)" }}>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Menu <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </Link>
              <Link href="/customize">
                <button className="px-9 py-4 rounded-full border-2 border-white/50 text-white font-semibold text-base hover:bg-white hover:text-foreground transition-all duration-300 w-full sm:w-auto hover:-translate-y-1 backdrop-blur-sm">
                  Design a Cake 🎂
                </button>
              </Link>
              <button
                onClick={() => sendToWhatsApp("Hello Dough & Pan! I'd like to place an order.")}
                className="px-9 py-4 rounded-full text-white/80 font-medium text-base hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 sm:hidden"
              >
                <svg className="w-5 h-5 fill-current text-green-400" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>
                WhatsApp Order
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/20">
              {[
                { value: "500+", label: "Happy Customers" },
                { value: "50+",  label: "Menu Items" },
                { value: "100%", label: "Fresh Daily" },
                { value: "3+",   label: "Years Baking" },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }}>
                  <div className="font-serif text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-white/55 text-xs uppercase tracking-widest mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 z-10">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ═══════════════════ 3D CAKE ═══════════════════ */}
      <section className="py-28 bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-7 order-2 lg:order-1">
              <div>
                <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Made Just For You</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Cake of your dreams,<br /><span className="text-primary italic">Just as close as it seems</span>
                </h2>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed font-light">
                Cakes are the central part of your special moment. A souvenir for your guests at your birthdays, family gatherings and specially at your weddings. Cakes hold their importance that is some serious responsibility. And that is why at Dough &amp; Pan
              </p>
              <ul className="space-y-3">
                {["You choose from 6+ premium flavours","You can have your cake in the size of your preference from 500gm to 5kg+","You will have the design and your personalized message","And it will be delivered fresh to your door"].map((point, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0"><div className="w-2 h-2 rounded-full bg-primary" /></div>
                    {point}
                  </motion.li>
                ))}
              </ul>
              <Link href="/customize">
                <button className="mt-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300">
                  Design Your Cake →
                </button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <div className="relative h-[420px] sm:h-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-secondary/60 to-background shadow-2xl">
                {webglOk === null ? null : webglOk ? (
                  <WebGLErrorBoundary fallback={<CakeFallback />}>
                    <Canvas camera={{ position: [0, 2, 8], fov: 42 }}>
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[8, 10, 5]} intensity={1.3} castShadow />
                      <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#FFB6C1" />
                      <RotatingCake />
                      <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={12} blur={2.5} far={5} />
                      <Environment preset="apartment" />
                      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.3} />
                    </Canvas>
                  </WebGLErrorBoundary>
                ) : (
                  <CakeFallback />
                )}
                <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-5 right-5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                  🎂 Custom Orders
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED PRODUCTS ═══════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-between items-end mb-12">
            <div>
              <p className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold uppercase text-sm tracking-[0.35em] px-3 py-1.5 mb-2">Best Sellers</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-2">Our Specialties</h2>
              <p className="text-foreground/65 font-light">Handcrafted daily with premium ingredients.</p>
            </div>
            <Link href="/menu">
              <span className="hidden sm:flex items-center text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer group text-sm">
                View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
          {featuredLoading && (
            <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          )}
          {!featuredLoading && featuredProducts.length > 0 && (
            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 snap-x snap-mandatory hide-scrollbar">
              {featuredProducts.map((product) => (
                <FeaturedCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {!featuredLoading && featuredProducts.length === 0 && (
            <div className="text-center py-16 text-foreground/40">
              <p className="font-serif text-lg">No featured products yet.</p>
              <p className="text-sm mt-1">Mark products as featured from the admin panel.</p>
            </div>
          )}
          <div className="mt-8 text-center sm:hidden">
            <Link href="/menu">
              <button className="px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors">View All Menu</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ VIRAL VIDEO ═══════════════════ */}
      <ViralVideoSection />

      {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">The Artisan Uniqueness</h2>
            <p className="text-foreground/70 font-light text-lg">Unhurried baking, honest flavours, and the surety of sharing something truly handmade.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="w-8 h-8" />,       title: "Fresh Baked Daily",    desc: "Every item made fresh every morning before the sun comes up." },
              { icon: <Star className="w-8 h-8" />,        title: "Premium Ingredients",  desc: "Sourced from trusted local suppliers for the finest taste." },
              { icon: <Heart className="w-8 h-8" />,       title: "Custom Orders",        desc: "Personalised, beautiful cakes crafted for your special occasions." },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Hygienic Preparation", desc: "Strict FSSAI-compliant kitchen standards you can trust." },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">{feature.icon}</div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/70 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">What Our Customers Say</h2>
            <div className="flex justify-center gap-1 text-accent">{[...Array(5)].map((_,i) => <Star key={i} className="w-5 h-5 fill-current" />)}</div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background text-foreground p-8 rounded-2xl shadow-xl relative">
                <div className="text-6xl font-serif text-primary/20 absolute top-4 left-6 leading-none">"</div>
                <p className="text-foreground/80 relative z-10 italic mb-8 pt-4">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-bold text-primary">{t.initials}</div>
                  <div>
                    <h4 className="font-bold font-serif">{t.name}</h4>
                    <div className="flex text-accent">{[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3 fill-current" />)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ INSTAGRAM GRID ═══════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <a href="https://www.instagram.com/doughandpan_/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                Follow Our Journey @doughandpan_
              </a>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramImages.map((src, i) => (
              <motion.a key={i} href="https://www.instagram.com/doughandpan_/" target="_blank" rel="noreferrer" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative aspect-square overflow-hidden group rounded-xl">
                <img src={src} alt="Dough & Pan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }} />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <Heart className="text-white w-8 h-8 fill-current" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
