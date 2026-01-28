import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleThemeChange = () => {
    setIsDark(!isDark);
    setShowPreview(true);
    setTimeout(() => setShowPreview(false), 2000);
  };

  return (
    <>
      <button
        onClick={handleThemeChange}
        className={cn(
          "p-2 rounded-full transition-all duration-300",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "md:p-3" // Larger on desktop
        )}
      >
        {isDark ? (
          <Sun className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <Moon className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            {/* Message Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1] // Custom ease curve for smooth animation
              }}
              className={cn(
                "relative z-50", // Ensure it's above the backdrop
                "w-[90vw] md:w-auto", // Full width on mobile, auto on desktop
                "min-w-[280px] max-w-[90vw] md:max-w-[420px]", // Min and max widths
                "mx-4 p-6", // Consistent padding
                "rounded-xl", // Slightly larger border radius
                "liquid-glass-strong", // Liquid glass effect
                "border-red-500/50", // Red border accent
                "shadow-red-500/20", // Red shadow accent
                "text-center"
              )}
            >
              <p className="text-base md:text-lg font-semibold text-foreground">
                Light mode was a myth. Welcome back to reality
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSwitch; 