import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20 relative overflow-hidden">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo-crown.png`} 
                alt="Crown" 
                className="w-12 h-12 object-contain opacity-80"
              />
              <motion.div 
                className="absolute inset-0 border-t-4 border-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">DoughandPan</h1>
            <p className="text-muted-foreground mt-2 font-medium tracking-widest uppercase text-sm">Meerut</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
