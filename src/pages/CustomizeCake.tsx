import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, Component, type ReactNode } from "react";
import * as THREE from "three";
import { sendToWhatsApp } from "@/utils/whatsapp";
import {
  CalendarDays, Cake, MessageSquare, Phone, User,
  ChevronRight, ChevronLeft, Check, Sparkles, Weight, FileText
} from "lucide-react";

/* ── WebGL ───────────────────────────────────────────────────────────── */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch { return false; }
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ── 3D Cake ─────────────────────────────────────────────────────────── */
function Cake3D({ flavor }: { flavor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  const colorMap: Record<string, { bottom: string; mid: string; top: string }> = {
    Chocolate:     { bottom: "#3B1A08", mid: "#6B3A2A", top: "#8B5E3C" },
    Vanilla:       { bottom: "#D4A96A", mid: "#F0D9A8", top: "#FFF8F0" },
    Strawberry:    { bottom: "#C0404B", mid: "#E87B7B", top: "#FFB6C1" },
    "Red Velvet":  { bottom: "#8B0000", mid: "#B22222", top: "#DC143C" },
    Butterscotch:  { bottom: "#C8860A", mid: "#E8A833", top: "#F5C842" },
    "Black Forest":{ bottom: "#1A0A00", mid: "#3D1A08", top: "#6B2D0E" },
  };
  const colors = colorMap[flavor] || colorMap["Chocolate"];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, -0.8, 0]}>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.08, 64]} />
          <meshStandardMaterial color="#E5D3B3" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.9, 1.9, 1.1, 64]} />
          <meshStandardMaterial color={colors.bottom} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[1.95, 1.95, 0.12, 64]} />
          <meshStandardMaterial color="#FFF8F0" roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.4, 1.4, 0.9, 64]} />
          <meshStandardMaterial color={colors.mid} roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.22, 0]}>
          <cylinderGeometry args={[1.45, 1.45, 0.1, 64]} />
          <meshStandardMaterial color="#FFF8F0" roughness={0.2} />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.75, 64]} />
          <meshStandardMaterial color={colors.top} roughness={0.2} />
        </mesh>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.55, 3.2, Math.sin(angle) * 0.55]} castShadow>
            <sphereGeometry args={[0.13, 32, 32]} />
            <meshStandardMaterial color="#CC2030" roughness={0.1} />
          </mesh>
        ))}
        <mesh position={[0, 3.3, 0]} castShadow>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#CC2030" roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

function CakeFallback({ flavor }: { flavor: string }) {
  const colorMap: Record<string, string> = {
    Chocolate: "from-amber-900 to-amber-800",
    Vanilla: "from-amber-200 to-amber-100",
    Strawberry: "from-pink-400 to-pink-300",
    "Red Velvet": "from-red-700 to-red-600",
    Butterscotch: "from-yellow-500 to-yellow-400",
    "Black Forest": "from-gray-900 to-gray-800",
  };
  const grad = colorMap[flavor] || colorMap["Chocolate"];
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <div className="flex gap-4 mb-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                className="w-2.5 h-2.5 rounded-full bg-yellow-300 mb-0.5"
              />
              <div className="w-1.5 h-7 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm" />
            </div>
          ))}
        </div>
        <div className="w-24 h-12 bg-gradient-to-b from-amber-50 to-amber-100 rounded-t-xl border-2 border-pink-200" />
        <div className="w-36 h-14 bg-gradient-to-b from-pink-300 to-pink-400 border-y-2 border-pink-200" />
        <div className={`w-52 h-16 bg-gradient-to-b ${grad} rounded-b-xl shadow-xl`} />
        <div className="w-56 h-3 bg-amber-200 rounded-full mt-1 shadow-md" />
        <p className="mt-4 text-sm text-muted-foreground font-medium italic">{flavor} Cake</p>
      </motion.div>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────────────────── */
const FLAVORS: { name: string; color: string; desc: string; emoji: string }[] = [
  { name: "Chocolate",    color: "#6B3A2A", desc: "Rich & indulgent",   emoji: "🍫" },
  { name: "Vanilla",      color: "#D4A96A", desc: "Classic & smooth",   emoji: "🍦" },
  { name: "Strawberry",   color: "#E87B7B", desc: "Fruity & fresh",     emoji: "🍓" },
  { name: "Red Velvet",   color: "#B22222", desc: "Bold & velvety",     emoji: "❤️" },
  { name: "Butterscotch", color: "#E8A833", desc: "Sweet & buttery",    emoji: "🧈" },
  { name: "Black Forest", color: "#3D1A08", desc: "Dark & decadent",    emoji: "🌲" },
];

const SIZES: { label: string; weight: string; serves: string; }[] = [
  { label: "Small",    weight: "500gm",  serves: "Serves 4"},
  { label: "Medium",   weight: "1kg",    serves: "Serves 8"},
  { label: "Large",    weight: "1.5kg",  serves: "Serves 12"},
  { label: "X-Large",  weight: "2kg",    serves: "Serves 16"},
  { label: "Custom",   weight: "3kg+",   serves: "Serves 24+"},
];

const STEPS = ["Your Details", "Cake Specs", "Delivery & Message"];

interface FormState {
  name: string;
  phone: string;
  flavor: string;
  size: string;
  messageOnCake: string;
  deliveryDate: string;
  instructions: string;
}

/* ── Step indicator ──────────────────────────────────────────────────── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: i === current ? 1.1 : 1,
              backgroundColor: i < current ? "hsl(var(--primary))" : i === current ? "hsl(var(--primary))" : "hsl(var(--border))",
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
            style={{
              color: i <= current ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground)/0.4)",
            }}
          >
            {i < current ? <Check className="w-4 h-4" /> : i + 1}
          </motion.div>
          {i < total - 1 && (
            <div className="w-8 sm:w-12 h-0.5 rounded-full overflow-hidden bg-border">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: i < current ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Order summary card ──────────────────────────────────────────────── */
function OrderCard({ form, webglOk }: { form: FormState; webglOk: boolean | null }) {
  const selectedFlavor = FLAVORS.find(f => f.name === form.flavor) || FLAVORS[0];
  const selectedSize   = SIZES.find(s => s.label === form.size) || SIZES[1];

  return (
    <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
      {/* 3D preview */}
      <div className="relative h-56 sm:h-72 bg-gradient-to-b from-secondary/60 to-background">
        {webglOk === null ? null : webglOk ? (
          <WebGLErrorBoundary fallback={<CakeFallback flavor={form.flavor} />}>
            <Canvas camera={{ position: [0, 1.5, 7], fov: 42 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[8, 8, 5]} intensity={1.2} castShadow />
              <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#FFB6C1" />
              <Cake3D flavor={form.flavor} />
              <ContactShadows position={[0, -0.85, 0]} opacity={0.35} scale={10} blur={2} far={4} />
              <Environment preset="apartment" />
              <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.2} />
            </Canvas>
          </WebGLErrorBoundary>
        ) : (
          <CakeFallback flavor={form.flavor} />
        )}
        {/* Flavor tag overlay */}
        <div
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-lg backdrop-blur-sm"
          style={{ backgroundColor: selectedFlavor.color + "CC" }}
        >
          <span>{selectedFlavor.emoji}</span>
          <span>{selectedFlavor.name}</span>
        </div>
      </div>

      {/* Order details */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-foreground">Your Cake</h3>
        </div>

        <div className="space-y-2 text-sm">
          {[
            { label: "Flavour",  value: `${selectedFlavor.emoji} ${form.flavor}`,     show: true },
            { label: "Size",     value: `${selectedSize.weight} · ${selectedSize.serves}`, show: true },
            { label: "Message",  value: `"${form.messageOnCake}"`,                    show: !!form.messageOnCake },
            { label: "Delivery", value: form.deliveryDate
                ? new Date(form.deliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                : "—",
              show: true },
            { label: "For",      value: form.name || "—",                              show: true },
          ].map(({ label, value, show }) =>
            show ? (
              <div key={label} className="flex justify-between items-start gap-4">
                <span className="text-foreground/50 flex-shrink-0">{label}</span>
                <span className="text-foreground font-medium text-right">{value}</span>
              </div>
            ) : null
          )}
        </div>

        {/* Price note */}
        <p className="text-xs text-foreground/40 pt-1 border-t border-border">
          * Final price confirmed on WhatsApp. Custom designs may vary.
        </p>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────── */
export default function CustomizeCake() {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [step, setStep]       = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", flavor: "Chocolate",
    size: "Medium", messageOnCake: "", deliveryDate: "", instructions: "",
  });

  useEffect(() => { setWebglOk(isWebGLAvailable()); }, []);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const setDirect = (field: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const canNext = () => {
    if (step === 0) return form.name.trim() !== "" && form.phone.trim() !== "";
    if (step === 1) return form.flavor !== "" && form.size !== "";
    if (step === 2) return form.deliveryDate !== "";
    return true;
  };

  const handleSubmit = () => {
    if (!form.deliveryDate) return;
    const selectedSize = SIZES.find(s => s.label === form.size) || SIZES[1];
    const selectedFlavor = FLAVORS.find(f => f.name === form.flavor) || FLAVORS[0];
    const msg = [
      `🎂 *Custom Cake Order — Dough & Pan*`,
      ``,
      `👤 Name: ${form.name}`,
      `📞 Phone: ${form.phone}`,
      `${selectedFlavor.emoji} Flavour: ${form.flavor}`,
      `📏 Size: ${selectedSize.weight} (${selectedSize.serves})`,
      // `💰 Est. Price: ₹${selectedSize.price.toLocaleString("en-IN")}`,
      `✍️ Message on Cake: ${form.messageOnCake || "None"}`,
      `📅 Delivery Date: ${form.deliveryDate}`,
      `📝 Special Instructions: ${form.instructions || "None"}`,
    ].join("\n");
    sendToWhatsApp(msg);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition text-sm";
  const labelClass =
    "flex items-center gap-1.5 text-sm font-medium text-foreground/80 mb-2";

  return (
    <div className="w-full bg-background min-h-screen pt-24 pb-20">

      {/* ── Page Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-3"
        >
          Made Just For You
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4"
        >
          Design Your Dream Cake
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-foreground/70 font-light max-w-xl mx-auto"
        >
          Choose your flavour, size and details — we'll bake it fresh and deliver with love.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 }}
          className="w-16 h-1 bg-primary mx-auto rounded-full mt-5"
        />
      </section>

      {/* ── Main grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* LEFT — Order card (sticky on desktop, top on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:sticky lg:top-28 order-2 lg:order-1"
          >
            <OrderCard form={form} webglOk={webglOk} />
          </motion.div>

          {/* RIGHT — Multi-step form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <AnimatePresence mode="wait">
              {submitted ? (

                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-3xl border border-border shadow-xl p-8 sm:p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="font-serif text-3xl font-bold text-foreground mb-3">Order Sent!</h3>
                  <p className="text-foreground/60 mb-8 max-w-sm mx-auto">
                    Your custom cake request has been sent via WhatsApp. We'll confirm your order and price shortly!
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setStep(0); setForm({ name: "", phone: "", flavor: "Chocolate", size: "Medium", messageOnCake: "", deliveryDate: "", instructions: "" }); }}
                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                  >
                    Place Another Order
                  </button>
                </motion.div>

              ) : (

                /* ── Form ── */
                <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden">

                  {/* Form header */}
                  <div className="px-6 sm:px-8 pt-8 pb-4 border-b border-border/60">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                        {STEPS[step]}
                      </h2>
                      <span className="text-xs text-foreground/40 font-medium">
                        Step {step + 1} of {STEPS.length}
                      </span>
                    </div>
                    <StepIndicator current={step} total={STEPS.length} />
                  </div>

                  {/* Form body */}
                  <div className="px-6 sm:px-8 py-6 min-h-[340px]">
                    <AnimatePresence mode="wait">

                      {/* ── Step 0: Your Details ── */}
                      {step === 0 && (
                        <motion.div
                          key="step0"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <p className="text-sm text-foreground/60 mb-4">
                            Tell us who this cake is for so we can personalise your order.
                          </p>
                          <div>
                            <label className={labelClass}>
                              <User className="w-4 h-4 text-primary" /> Your Name *
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. Priya Sharma"
                              value={form.name}
                              onChange={set("name")}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              <Phone className="w-4 h-4 text-primary" /> Phone Number *
                            </label>
                            <input
                              required
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={form.phone}
                              onChange={set("phone")}
                              className={inputClass}
                            />
                            <p className="text-xs text-foreground/40 mt-1.5">
                              We'll confirm your order on WhatsApp.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 1: Cake Specs ── */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-6"
                        >
                          {/* Flavor picker */}
                          <div>
                            <label className={labelClass}>
                              <Cake className="w-4 h-4 text-primary" /> Choose Flavour
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                              {FLAVORS.map(f => (
                                <button
                                  key={f.name}
                                  type="button"
                                  onClick={() => setDirect("flavor", f.name)}
                                  className={`relative flex items-center gap-2.5 px-3 py-3 rounded-xl border text-left transition-all ${
                                    form.flavor === f.name
                                      ? "border-primary bg-primary/8 shadow-sm"
                                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                                  }`}
                                >
                                  {/* Color swatch */}
                                  <div
                                    className="w-8 h-8 rounded-lg flex-shrink-0 shadow-sm"
                                    style={{ backgroundColor: f.color }}
                                  />
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-foreground truncate">{f.name}</p>
                                    <p className="text-[10px] text-foreground/50 truncate">{f.desc}</p>
                                  </div>
                                  {form.flavor === f.name && (
                                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                      <Check className="w-2.5 h-2.5 text-primary-foreground" />
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Size picker */}
                          <div>
                            <label className={labelClass}>
                              <Weight className="w-4 h-4 text-primary" /> Choose Size
                            </label>
                            <div className="space-y-2">
                              {SIZES.map(s => (
                                <button
                                  key={s.label}
                                  type="button"
                                  onClick={() => setDirect("size", s.label)}
                                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm ${
                                    form.size === s.label
                                      ? "border-primary bg-primary/8 shadow-sm"
                                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                                      form.size === s.label ? "border-primary bg-primary" : "border-border"
                                    }`}>
                                      {form.size === s.label && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                    <div className="text-left">
                                      <span className="font-semibold text-foreground">{s.label}</span>
                                      <span className="text-foreground/50 ml-2 text-xs">{s.weight} · {s.serves}</span>
                                    </div>
                                  </div>
                                  {/* <span className="font-bold text-primary text-sm">
                                    ₹{s.price.toLocaleString("en-IN")}
                                  </span> */}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 2: Delivery & Message ── */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-5"
                        >
                          <div>
                            <label className={labelClass}>
                              <MessageSquare className="w-4 h-4 text-primary" /> Message on Cake
                            </label>
                            <input
                              type="text"
                              placeholder='e.g. "Happy Birthday Priya! 🎂"'
                              value={form.messageOnCake}
                              onChange={set("messageOnCake")}
                              className={inputClass}
                            />
                            <p className="text-xs text-foreground/40 mt-1.5">Optional — leave blank if none.</p>
                          </div>

                          <div>
                            <label className={labelClass}>
                              <CalendarDays className="w-4 h-4 text-primary" /> Delivery Date *
                            </label>
                            <input
                              required
                              type="date"
                              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                              value={form.deliveryDate}
                              onChange={set("deliveryDate")}
                              className={inputClass}
                            />
                            <p className="text-xs text-foreground/40 mt-1.5">
                              Please order at least 24 hours in advance.
                            </p>
                          </div>

                          <div>
                            <label className={labelClass}>
                              <FileText className="w-4 h-4 text-primary" /> Special Instructions
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Nut-free, eggless, fondant design preferences, allergens..."
                              value={form.instructions}
                              onChange={set("instructions")}
                              className={`${inputClass} resize-none`}
                            />
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  {/* Form footer — nav buttons */}
                  <div className="px-6 sm:px-8 py-5 border-t border-border/60 bg-muted/20 flex items-center justify-between gap-3">

                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => { if (canNext()) setStep(s => s + 1); }}
                        disabled={!canNext()}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!canNext()}
                        className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 ml-auto"
                      >
                        <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                        Send via WhatsApp
                      </button>
                    )}
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Trust badges */}
            {!submitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-5 grid grid-cols-3 gap-3"
              >
                {[
                  { icon: "🎂", text: "Custom designs available" },
                  { icon: "🥚", text: "Eggless options on request" },
                  { icon: "🚚", text: "Fresh delivery to your door" },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    className="flex flex-col items-center text-center gap-1.5 bg-card border border-border rounded-2xl px-3 py-3"
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-[10px] sm:text-xs text-foreground/60 font-medium leading-tight">{text}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}