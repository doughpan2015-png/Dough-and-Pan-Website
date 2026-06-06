import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, Component, type ReactNode } from "react";
import * as THREE from "three";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { sendToWhatsApp } from "@/utils/whatsapp";

/* ── WebGL support detection ──────────────────────────────────────────── */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ── Error boundary ───────────────────────────────────────────────────── */
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ── 3D Cake mesh ─────────────────────────────────────────────────────── */
function Cake3D() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -1, 0]}>
        {/* Board */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[2.4, 2.4, 0.1, 64]} />
          <meshStandardMaterial color="#E5D3B3" roughness={0.8} />
        </mesh>
        {/* Bottom tier */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2, 2, 1.2, 64]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} />
        </mesh>
        {/* Middle tier */}
        <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 1, 64]} />
          <meshStandardMaterial color="#FFB6C1" roughness={0.3} />
        </mesh>
        {/* Top tier */}
        <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1, 0.8, 64]} />
          <meshStandardMaterial color="#FFF8F0" roughness={0.2} />
        </mesh>
        {/* Cherries */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.7, 3.1, Math.sin(angle) * 0.7]} castShadow>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#E32636" roughness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ── Pure-CSS cake fallback ───────────────────────────────────────────── */
function CakeFallback() {
  return (
    <div className="flex items-center justify-center h-full select-none">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          {/* Candles */}
          <div className="flex gap-5 mb-0.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  className="w-3 h-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-200 mb-0.5"
                />
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm" />
              </div>
            ))}
          </div>
          {/* Top tier */}
          <div className="w-28 h-14 bg-gradient-to-b from-amber-50 to-amber-100 rounded-t-2xl border-2 border-pink-200 shadow-inner" />
          <div className="w-28 h-2 bg-pink-200" />
          {/* Middle tier */}
          <div className="w-44 h-16 bg-gradient-to-b from-pink-300 to-pink-400 border-y-2 border-pink-200 relative overflow-hidden">
            <div className="absolute bottom-2 left-2 right-2 flex justify-around">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-white/50" />
              ))}
            </div>
          </div>
          <div className="w-44 h-2 bg-amber-200" />
          {/* Bottom tier */}
          <div className="w-60 h-20 bg-gradient-to-b from-amber-700 to-amber-800 rounded-b-xl shadow-xl relative overflow-hidden">
            <div className="absolute top-3 left-3 right-3 flex justify-around">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-amber-600/60" />
              ))}
            </div>
          </div>
          {/* Board */}
          <div className="w-64 h-4 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full mt-1 shadow-lg" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-6 font-medium"
        >
          🎂 Made fresh every day with love!
        </motion.p>
      </div>
    </div>
  );
}

/* ── Hero section ─────────────────────────────────────────────────────── */
export function Hero() {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglOk(isWebGLAvailable());
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left pt-12 lg:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-primary font-medium text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Baking fresh daily in Meerut
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6">
            Freshly Baked <br />
            <span className="text-primary relative whitespace-nowrap">
              Happiness
              <svg
                className="absolute -bottom-2 w-full h-3 text-accent"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0">
            Premium cakes, delicate pastries &amp; savory snacks — crafted with love and the finest
            ingredients in Meerut.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              View Menu
            </button>
            <button
              onClick={() =>
                sendToWhatsApp("Hello DoughandPan! I'd like to place an order from your website.")
              }
              className="px-8 py-4 rounded-full bg-white text-foreground border-2 border-border font-semibold hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
            >
              Order on WhatsApp
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* 3D / CSS fallback */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-[500px] lg:h-[700px] w-full relative"
        >
          {webglOk === null ? null : webglOk ? (
            <WebGLErrorBoundary fallback={<CakeFallback />}>
              <Canvas
                camera={{ position: [0, 2, 8], fov: 45 }}
                className="cursor-grab active:cursor-grabbing"
                onCreated={() => {}}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#FFB6C1" />
                <Cake3D />
                <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                <Environment preset="city" />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </WebGLErrorBoundary>
          ) : (
            <CakeFallback />
          )}
        </motion.div>
      </div>
    </section>
  );
}
