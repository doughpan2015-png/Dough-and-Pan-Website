// import { Canvas, useFrame } from "@react-three/fiber";
// import { Float, OrbitControls, ContactShadows, Environment } from "@react-three/drei";
// import { motion } from "framer-motion";
// import { useRef, useState, useEffect, Component, type ReactNode } from "react";
// import * as THREE from "three";
// import { sendToWhatsApp } from "@/utils/whatsapp";
// import { CalendarDays, Cake, MessageSquare, Phone, User } from "lucide-react";

// /* ── WebGL detection ─────────────────────────────────────────────────── */
// function isWebGLAvailable(): boolean {
//   try {
//     const canvas = document.createElement("canvas");
//     return !!(
//       window.WebGLRenderingContext &&
//       (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
//     );
//   } catch { return false; }
// }

// class WebGLErrorBoundary extends Component<
//   { children: ReactNode; fallback: ReactNode },
//   { hasError: boolean }
// > {
//   constructor(props: { children: ReactNode; fallback: ReactNode }) {
//     super(props);
//     this.state = { hasError: false };
//   }
//   static getDerivedStateFromError() { return { hasError: true }; }
//   render() {
//     if (this.state.hasError) return this.props.fallback;
//     return this.props.children;
//   }
// }

// /* ── 3D Cake ─────────────────────────────────────────────────────────── */
// function Cake3D({ flavor }: { flavor: string }) {
//   const groupRef = useRef<THREE.Group>(null);

//   const colorMap: Record<string, { bottom: string; mid: string; top: string }> = {
//     Chocolate:   { bottom: "#3B1A08", mid: "#6B3A2A", top: "#8B5E3C" },
//     Vanilla:     { bottom: "#D4A96A", mid: "#F0D9A8", top: "#FFF8F0" },
//     Strawberry:  { bottom: "#C0404B", mid: "#E87B7B", top: "#FFB6C1" },
//     "Red Velvet":{ bottom: "#8B0000", mid: "#B22222", top: "#DC143C" },
//     Butterscotch:{ bottom: "#C8860A", mid: "#E8A833", top: "#F5C842" },
//     "Black Forest":{ bottom: "#1A0A00", mid: "#3D1A08", top: "#6B2D0E" },
//   };
//   const colors = colorMap[flavor] || colorMap["Chocolate"];

//   useFrame((state) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
//     }
//   });

//   return (
//     <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
//       <group ref={groupRef} position={[0, -0.8, 0]}>
//         {/* Board */}
//         <mesh position={[0, -0.05, 0]}>
//           <cylinderGeometry args={[2.2, 2.2, 0.08, 64]} />
//           <meshStandardMaterial color="#E5D3B3" roughness={0.8} />
//         </mesh>
//         {/* Bottom tier */}
//         <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
//           <cylinderGeometry args={[1.9, 1.9, 1.1, 64]} />
//           <meshStandardMaterial color={colors.bottom} roughness={0.3} />
//         </mesh>
//         {/* Bottom frosting band */}
//         <mesh position={[0, 1.15, 0]}>
//           <cylinderGeometry args={[1.95, 1.95, 0.12, 64]} />
//           <meshStandardMaterial color="#FFF8F0" roughness={0.2} />
//         </mesh>
//         {/* Middle tier */}
//         <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
//           <cylinderGeometry args={[1.4, 1.4, 0.9, 64]} />
//           <meshStandardMaterial color={colors.mid} roughness={0.3} />
//         </mesh>
//         {/* Middle frosting band */}
//         <mesh position={[0, 2.22, 0]}>
//           <cylinderGeometry args={[1.45, 1.45, 0.1, 64]} />
//           <meshStandardMaterial color="#FFF8F0" roughness={0.2} />
//         </mesh>
//         {/* Top tier */}
//         <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
//           <cylinderGeometry args={[0.9, 0.9, 0.75, 64]} />
//           <meshStandardMaterial color={colors.top} roughness={0.2} />
//         </mesh>
//         {/* Cherries */}
//         {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
//           <mesh key={i} position={[Math.cos(angle) * 0.55, 3.2, Math.sin(angle) * 0.55]} castShadow>
//             <sphereGeometry args={[0.13, 32, 32]} />
//             <meshStandardMaterial color="#CC2030" roughness={0.1} />
//           </mesh>
//         ))}
//         {/* Top cherry */}
//         <mesh position={[0, 3.3, 0]} castShadow>
//           <sphereGeometry args={[0.15, 32, 32]} />
//           <meshStandardMaterial color="#CC2030" roughness={0.1} />
//         </mesh>
//       </group>
//     </Float>
//   );
// }

// function CakeFallback({ flavor }: { flavor: string }) {
//   const colorMap: Record<string, string> = {
//     Chocolate: "from-amber-900 to-amber-800",
//     Vanilla: "from-amber-200 to-amber-100",
//     Strawberry: "from-pink-400 to-pink-300",
//     "Red Velvet": "from-red-700 to-red-600",
//     Butterscotch: "from-yellow-500 to-yellow-400",
//     "Black Forest": "from-gray-900 to-gray-800",
//   };
//   const grad = colorMap[flavor] || colorMap["Chocolate"];
//   return (
//     <div className="flex items-center justify-center h-full">
//       <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center">
//         <div className="flex gap-4 mb-1">
//           {[0,1,2].map(i => (
//             <div key={i} className="flex flex-col items-center">
//               <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} className="w-2.5 h-2.5 rounded-full bg-yellow-300 mb-0.5" />
//               <div className="w-1.5 h-7 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm" />
//             </div>
//           ))}
//         </div>
//         <div className={`w-24 h-12 bg-gradient-to-b from-amber-50 to-amber-100 rounded-t-xl border-2 border-pink-200`} />
//         <div className="w-36 h-14 bg-gradient-to-b from-pink-300 to-pink-400 border-y-2 border-pink-200" />
//         <div className={`w-52 h-16 bg-gradient-to-b ${grad} rounded-b-xl shadow-xl`} />
//         <div className="w-56 h-3 bg-amber-200 rounded-full mt-1 shadow-md" />
//         <p className="mt-4 text-sm text-muted-foreground font-medium italic">{flavor} Cake</p>
//       </motion.div>
//     </div>
//   );
// }

// /* ── Form ────────────────────────────────────────────────────────────── */
// const FLAVORS = ["Chocolate", "Vanilla", "Strawberry", "Red Velvet", "Butterscotch", "Black Forest"];
// const SIZES   = ["500gm (Serves 4)", "1kg (Serves 8)", "1.5kg (Serves 12)", "2kg (Serves 16)", "3kg+ (Custom)"];

// interface FormState {
//   name: string; phone: string; flavor: string;
//   size: string; messageOnCake: string; deliveryDate: string; instructions: string;
// }

// export default function CustomizeCake() {
//   const [webglOk, setWebglOk] = useState<boolean | null>(null);
//   const [form, setForm] = useState<FormState>({
//     name: "", phone: "", flavor: "Chocolate",
//     size: "1kg (Serves 8)", messageOnCake: "", deliveryDate: "", instructions: "",
//   });
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => { setWebglOk(isWebGLAvailable()); }, []);

//   const update = (field: keyof FormState) => (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { name, phone, flavor, size, messageOnCake, deliveryDate, instructions } = form;
//     if (!name || !phone || !deliveryDate) return;
//     const msg = [
//       `🎂 *Custom Cake Order — Dough & Pan*`,
//       ``,
//       `👤 Name: ${name}`,
//       `📞 Phone: ${phone}`,
//       `🎂 Flavor: ${flavor}`,
//       `📏 Size: ${size}`,
//       `✍️ Message on Cake: ${messageOnCake || "None"}`,
//       `📅 Delivery Date: ${deliveryDate}`,
//       `📝 Special Instructions: ${instructions || "None"}`,
//     ].join("\n");
//     sendToWhatsApp(msg);
//     setSubmitted(true);
//   };

//   const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition";
//   const labelClass = "block text-sm font-medium text-foreground/80 mb-1.5";

//   return (
//     <div className="w-full bg-background min-h-screen pt-24 pb-20">

//       {/* Page Hero */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//           className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4"
//         >
//           Design Your Dream Cake
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
//           className="text-lg text-foreground/70 font-light max-w-xl mx-auto"
//         >
//           Choose your flavour, size and details — we'll bake it fresh and deliver with love.
//         </motion.p>
//         <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
//       </section>

//       {/* Main Content */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-start">

//           {/* 3D Cake Preview */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             className="sticky top-28"
//           >
//             <div className="bg-card rounded-3xl shadow-xl overflow-hidden p-6">
//               <h2 className="font-serif text-2xl font-bold text-foreground mb-2 text-center">Live Preview</h2>
//               <p className="text-sm text-foreground/60 text-center mb-4">Select a flavour to see your cake</p>

//               <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
//                 {webglOk === null ? null : webglOk ? (
//                   <WebGLErrorBoundary fallback={<CakeFallback flavor={form.flavor} />}>
//                     <Canvas camera={{ position: [0, 1.5, 7], fov: 42 }}>
//                       <ambientLight intensity={0.6} />
//                       <directionalLight position={[8, 8, 5]} intensity={1.2} castShadow />
//                       <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#FFB6C1" />
//                       <Cake3D flavor={form.flavor} />
//                       <ContactShadows position={[0, -0.85, 0]} opacity={0.35} scale={10} blur={2} far={4} />
//                       <Environment preset="apartment" />
//                       <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.2} />
//                     </Canvas>
//                   </WebGLErrorBoundary>
//                 ) : (
//                   <CakeFallback flavor={form.flavor} />
//                 )}
//               </div>

//               {/* Flavor quick-select */}
//               <div className="mt-4 flex flex-wrap gap-2 justify-center">
//                 {FLAVORS.map(f => (
//                   <button
//                     key={f}
//                     onClick={() => setForm(p => ({ ...p, flavor: f }))}
//                     className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
//                       form.flavor === f
//                         ? "bg-primary text-primary-foreground border-primary shadow-md"
//                         : "border-border text-foreground/70 hover:border-primary hover:text-primary"
//                     }`}
//                   >
//                     {f}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Order Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//           >
//             {submitted ? (
//               <div className="bg-card rounded-3xl shadow-xl p-10 text-center">
//                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <h3 className="font-serif text-3xl font-bold text-foreground mb-3">Order Sent!</h3>
//                 <p className="text-foreground/70 mb-8">Your custom cake request has been sent to us via WhatsApp. We'll confirm your order shortly!</p>
//                 <button
//                   onClick={() => setSubmitted(false)}
//                   className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
//                 >
//                   Place Another Order
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="bg-card rounded-3xl shadow-xl p-8 space-y-6">
//                 <h2 className="font-serif text-2xl font-bold text-foreground">Your Order Details</h2>

//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>
//                       <User className="w-4 h-4 inline mr-1.5 mb-0.5" />Your Name *
//                     </label>
//                     <input required type="text" placeholder="e.g. Priya Sharma" value={form.name} onChange={update("name")} className={inputClass} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>
//                       <Phone className="w-4 h-4 inline mr-1.5 mb-0.5" />Phone Number *
//                     </label>
//                     <input required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={update("phone")} className={inputClass} />
//                   </div>
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div>
//                     <label className={labelClass}>
//                       <Cake className="w-4 h-4 inline mr-1.5 mb-0.5" />Cake Flavour
//                     </label>
//                     <select value={form.flavor} onChange={update("flavor")} className={inputClass}>
//                       {FLAVORS.map(f => <option key={f}>{f}</option>)}
//                     </select>
//                   </div>
//                   <div>
//                     <label className={labelClass}>Cake Size / Weight</label>
//                     <select value={form.size} onChange={update("size")} className={inputClass}>
//                       {SIZES.map(s => <option key={s}>{s}</option>)}
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     <MessageSquare className="w-4 h-4 inline mr-1.5 mb-0.5" />Message on Cake
//                   </label>
//                   <input type="text" placeholder='e.g. "Happy Birthday Priya! 🎂"' value={form.messageOnCake} onChange={update("messageOnCake")} className={inputClass} />
//                 </div>

//                 <div>
//                   <label className={labelClass}>
//                     <CalendarDays className="w-4 h-4 inline mr-1.5 mb-0.5" />Delivery Date *
//                   </label>
//                   <input
//                     required
//                     type="date"
//                     min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
//                     value={form.deliveryDate}
//                     onChange={update("deliveryDate")}
//                     className={inputClass}
//                   />
//                   <p className="text-xs text-foreground/50 mt-1">Please order at least 24 hours in advance.</p>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Special Instructions (optional)</label>
//                   <textarea
//                     rows={3}
//                     placeholder="Nut-free, eggless, fondant design preferences..."
//                     value={form.instructions}
//                     onChange={update("instructions")}
//                     className={`${inputClass} resize-none`}
//                   />
//                 </div>

//                 {/* Order Summary */}
//                 <div className="bg-secondary/50 rounded-2xl p-5 space-y-2 text-sm">
//                   <h4 className="font-semibold text-foreground font-serif">Order Summary</h4>
//                   <div className="flex justify-between text-foreground/70"><span>Flavour</span><span className="font-medium text-foreground">{form.flavor}</span></div>
//                   <div className="flex justify-between text-foreground/70"><span>Size</span><span className="font-medium text-foreground">{form.size}</span></div>
//                   {form.messageOnCake && <div className="flex justify-between text-foreground/70"><span>Message</span><span className="font-medium text-foreground max-w-[60%] text-right">"{form.messageOnCake}"</span></div>}
//                   {form.deliveryDate && <div className="flex justify-between text-foreground/70"><span>Delivery</span><span className="font-medium text-foreground">{new Date(form.deliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></div>}
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
//                 >
//                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
//                   </svg>
//                   Send Order via WhatsApp
//                 </button>
//               </form>
//             )}
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { sendToWhatsApp } from "@/utils/whatsapp";
import {
  User, Phone, MessageSquare, CalendarDays,
  ChevronRight, ChevronLeft, Check, Sparkles, Info
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────────────── */
const FLAVORS = [
  {
    name: "Chocolate",
    emoji: "🍫",
    desc: "Rich dark chocolate with ganache",
    gradient: "from-amber-950 via-amber-800 to-amber-700",
    swatch: ["#3B1A08", "#6B3A2A", "#8B5E3C"],
    accent: "#C87941",
    textLight: true,
  },
  {
    name: "Vanilla",
    emoji: "🍦",
    desc: "Classic Madagascar vanilla bean",
    gradient: "from-amber-100 via-yellow-50 to-amber-50",
    swatch: ["#D4A96A", "#F0D9A8", "#FFF8F0"],
    accent: "#C8860A",
    textLight: false,
  },
  {
    name: "Strawberry",
    emoji: "🍓",
    desc: "Fresh strawberry with cream layers",
    gradient: "from-rose-500 via-pink-400 to-pink-300",
    swatch: ["#C0404B", "#E87B7B", "#FFB6C1"],
    accent: "#E83A5A",
    textLight: true,
  },
  {
    name: "Red Velvet",
    emoji: "❤️",
    desc: "Velvety red with cream cheese frosting",
    gradient: "from-red-900 via-red-700 to-red-500",
    swatch: ["#8B0000", "#B22222", "#DC143C"],
    accent: "#FF4444",
    textLight: true,
  },
  {
    name: "Butterscotch",
    emoji: "🧈",
    desc: "Buttery caramel with toffee crunch",
    gradient: "from-yellow-700 via-yellow-500 to-yellow-300",
    swatch: ["#C8860A", "#E8A833", "#F5C842"],
    accent: "#F59E0B",
    textLight: true,
  },
  {
    name: "Black Forest",
    emoji: "🍒",
    desc: "Dark chocolate with cherry compote",
    gradient: "from-gray-950 via-gray-800 to-gray-700",
    swatch: ["#1A0A00", "#3D1A08", "#6B2D0E"],
    accent: "#CC2030",
    textLight: true,
  },
];

const SIZES = [
  { label: "500gm", sub: "Serves 4", price: 549 },
  { label: "1kg",   sub: "Serves 8", price: 999 },
  { label: "1.5kg", sub: "Serves 12", price: 1399 },
  { label: "2kg",   sub: "Serves 16", price: 1799 },
  { label: "3kg+",  sub: "Custom",    price: null },
];

/* ── Animated Cake Illustration ──────────────────────────────────────── */
/* Preview removed: keeping order details and summary only */

/* ── Order Preview Card ───────────────────────────────────────────────── */
function OrderPreviewCard({
  flavor, size, message, deliveryDate, name,
}: {
  flavor: typeof FLAVORS[0];
  size: typeof SIZES[0];
  message: string;
  deliveryDate: string;
  name: string;
}) {
  const formattedDate = deliveryDate
    ? new Date(deliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : null;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      {/* Header strip */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: `linear-gradient(135deg, ${flavor.swatch[0]}, ${flavor.swatch[1]})` }}
      >
        <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">Order Summary</span>
        <span className="text-lg">{flavor.emoji}</span>
      </div>

      <div className="p-4 space-y-2.5 text-sm">
        {[
          { label: "Customer", value: name || "—" },
          { label: "Flavour", value: flavor.name },
          {
            label: "Size",
            value: size.price
              ? `${size.label} · ₹${size.price.toLocaleString("en-IN")}`
              : `${size.label} · Price on request`,
          },
          { label: "Message", value: message ? `"${message}"` : "—" },
          { label: "Delivery", value: formattedDate || "—" },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <span className="text-foreground/50 flex-shrink-0">{label}</span>
            <span className="font-medium text-foreground text-right">{value}</span>
          </div>
        ))}

        {size.price && (
          <>
            <div className="border-t border-border pt-2.5 flex items-center justify-between">
              <span className="font-semibold text-foreground">Estimated Total</span>
              <span className="font-bold text-primary text-base">
                ₹{size.price.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[11px] text-foreground/40 flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Final price may vary based on design complexity.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Step indicator ───────────────────────────────────────────────────── */
function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i < step
                ? "bg-primary text-primary-foreground"
                : i === step
                ? "bg-primary/20 text-primary ring-2 ring-primary"
                : "bg-muted text-foreground/30"
            }`}
          >
            {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-8 rounded-full transition-all duration-500 ${i < step ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────── */
interface FormState {
  name: string;
  phone: string;
  flavor: string;
  size: string;
  messageOnCake: string;
  deliveryDate: string;
  instructions: string;
}

const STEP_LABELS = ["Your Info", "Cake Details", "Delivery"];

export default function CustomizeCake() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", flavor: "Chocolate",
    size: "1kg", messageOnCake: "", deliveryDate: "", instructions: "",
  });

  const selectedFlavor = FLAVORS.find(f => f.name === form.flavor) || FLAVORS[0];
  const selectedSize = SIZES.find(s => s.label === form.size) || SIZES[1];

  const update = (field: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const canProceed = () => {
    if (step === 0) return form.name.trim() !== "" && form.phone.trim() !== "";
    if (step === 1) return true;
    if (step === 2) return form.deliveryDate !== "";
    return false;
  };

  const handleSubmit = () => {
    const { name, phone, flavor, size, messageOnCake, deliveryDate, instructions } = form;
    const sizeObj = SIZES.find(s => s.label === size);
    const priceStr = sizeObj?.price ? `₹${sizeObj.price.toLocaleString("en-IN")}` : "Price on request";
    const msg = [
      `🎂 *Custom Cake Order — Dough & Pan*`,
      ``,
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      `🎂 Flavour: ${flavor}`,
      `📏 Size: ${size} (${sizeObj?.sub}) — ${priceStr}`,
      `✍️ Message on Cake: ${messageOnCake || "None"}`,
      `📅 Delivery Date: ${deliveryDate}`,
      `📝 Special Instructions: ${instructions || "None"}`,
    ].join("\n");
    sendToWhatsApp(msg);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition text-sm";
  const labelClass = "block text-sm font-medium text-foreground/70 mb-1.5";

  if (submitted) {
    return (
      <div className="w-full bg-background min-h-screen pt-24 pb-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-3xl shadow-xl p-10 text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
          <h3 className="font-serif text-3xl font-bold text-foreground mb-3">Order Sent! 🎉</h3>
          <p className="text-foreground/60 mb-2 text-sm leading-relaxed">
            Your <strong>{form.flavor}</strong> cake order has been sent via WhatsApp.
            We'll confirm shortly!
          </p>
          <p className="text-foreground/40 text-xs mb-8">
            Delivery requested for{" "}
            {new Date(form.deliveryDate).toLocaleDateString("en-IN", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setForm({ name: "", phone: "", flavor: "Chocolate", size: "1kg", messageOnCake: "", deliveryDate: "", instructions: "" }); }}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition text-sm"
          >
            Place Another Order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen pt-24 pb-20">

      {/* ── Page Hero ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Custom Orders
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4"
        >
          Design Your Dream Cake
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-foreground/60 font-light max-w-lg mx-auto"
        >
          Choose your flavour, size and details — we'll bake it fresh and deliver with love.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 }}
          className="w-16 h-1 bg-primary mx-auto rounded-full mt-6"
        />
      </section>

      {/* ── Main layout ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-1 gap-8 xl:gap-12 items-start">

          {/* ── Form & Order Summary (no preview) ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Step header */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-foreground/40 uppercase tracking-widest font-medium">
                    Step {step + 1} of {STEP_LABELS.length}
                  </p>
                  <h2 className="font-serif text-xl font-bold text-foreground mt-0.5">
                    {STEP_LABELS[step]}
                  </h2>
                </div>
                <StepIndicator step={step} total={STEP_LABELS.length} />
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Step content */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <AnimatePresence mode="wait">

                {/* Step 0: Your Info */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 sm:p-6 space-y-4"
                  >
                    <div>
                      <label className={labelClass}>
                        <User className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        <Phone className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={e => update("phone", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <p className="text-xs text-foreground/40 flex items-start gap-1.5 pt-1">
                      <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      We'll use your phone number to confirm the order on WhatsApp.
                    </p>
                  </motion.div>
                )}

                {/* Step 1: Cake Details */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 sm:p-6 space-y-5"
                  >
                    {/* Flavor selector */}
                        <div>
                          <label className={labelClass}>Select Flavour</label>
                          <div className="grid grid-cols-3 gap-2">
                            {FLAVORS.map((f) => (
                              <button
                                key={f.name}
                                type="button"
                                onClick={() => update("flavor", f.name)}
                                className={`relative px-2 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 flex flex-col items-center gap-1 ${
                                  form.flavor === f.name
                                    ? "border-primary bg-primary/8 text-primary shadow-sm scale-[1.03]"
                                    : "border-border text-foreground/60 hover:border-primary/40 hover:text-primary/80"
                                }`}
                              >
                                <span className="text-base">{f.emoji}</span>
                                <span className="leading-tight text-center">{f.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                    {/* Size selector */}
                        <div>
                      <label className={labelClass}>Cake Size & Weight</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {SIZES.map((s) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => update("size", s.label)}
                            className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                              form.size === s.label
                                ? "border-primary bg-primary/8 shadow-sm"
                                : "border-border hover:border-primary/40"
                            }`}
                          >
                            <p className={`font-bold text-sm ${form.size === s.label ? "text-primary" : "text-foreground"}`}>
                              {s.label}
                            </p>
                            <p className="text-xs text-foreground/50 mt-0.5">{s.sub}</p>
                            {s.price ? (
                              <p className={`text-xs font-semibold mt-1 ${form.size === s.label ? "text-primary" : "text-foreground/60"}`}>
                                ₹{s.price.toLocaleString("en-IN")}
                              </p>
                            ) : (
                              <p className="text-xs text-foreground/40 mt-1">On request</p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message on cake */}
                    <div>
                      <label className={labelClass}>
                        <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
                        Message on Cake
                        <span className="text-foreground/40 font-normal ml-1">(optional)</span>
                      </label>
                      <input
                        type="text"
                        maxLength={40}
                        placeholder='e.g. "Happy Birthday Priya! 🎂"'
                        value={form.messageOnCake}
                        onChange={e => update("messageOnCake", e.target.value)}
                        className={inputClass}
                      />
                      <p className="text-xs text-foreground/40 mt-1 text-right">
                        {form.messageOnCake.length}/40 — preview updates live on the cake ↑
                      </p>
                    </div>

                    {/* Special instructions */}
                    <div>
                      <label className={labelClass}>
                        Special Instructions
                        <span className="text-foreground/40 font-normal ml-1">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Nut-free, eggless, fondant preferences, specific design ideas…"
                        value={form.instructions}
                        onChange={e => update("instructions", e.target.value)}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Delivery */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 sm:p-6 space-y-5"
                  >
                    <div>
                      <label className={labelClass}>
                        <CalendarDays className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
                        Delivery Date *
                      </label>
                      <input
                        required
                        type="date"
                        min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                        value={form.deliveryDate}
                        onChange={e => update("deliveryDate", e.target.value)}
                        className={inputClass}
                      />
                      <p className="text-xs text-foreground/40 mt-1.5 flex items-center gap-1">
                        <Info className="w-3 h-3 flex-shrink-0" />
                        Please order at least 24 hours in advance.
                      </p>
                    </div>

                    {/* Final summary */}
                    <div className="bg-secondary/40 rounded-2xl p-4 space-y-2.5 text-sm border border-border/60">
                      <h4 className="font-semibold text-foreground font-serif text-base">Confirm Your Order</h4>
                      {[
                        { label: "Name", value: form.name },
                        { label: "Phone", value: form.phone },
                        { label: "Flavour", value: `${selectedFlavor.emoji} ${form.flavor}` },
                        {
                          label: "Size",
                          value: selectedSize.price
                            ? `${selectedSize.label} — ₹${selectedSize.price.toLocaleString("en-IN")}`
                            : `${selectedSize.label} — Price on request`,
                        },
                        form.messageOnCake && { label: "Message", value: `"${form.messageOnCake}"` },
                      ].filter(Boolean).map((item: any) => (
                        <div key={item.label} className="flex justify-between gap-4">
                          <span className="text-foreground/50">{item.label}</span>
                          <span className="font-medium text-foreground text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-foreground/40 text-center">
                      Tapping "Send Order" will open WhatsApp with your order details pre-filled.
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-foreground/70 font-medium text-sm hover:bg-muted transition"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              {step < STEP_LABELS.length - 1 ? (
                <button
                  onClick={() => { if (canProceed()) setStep(s => s + 1); }}
                  disabled={!canProceed()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Send Order via WhatsApp
                </button>
              )}
            </div>

            {/* Order summary card (visible on all sizes) */}
            <div className="">
              <OrderPreviewCard
                flavor={selectedFlavor}
                size={selectedSize}
                message={form.messageOnCake}
                deliveryDate={form.deliveryDate}
                name={form.name}
              />
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}