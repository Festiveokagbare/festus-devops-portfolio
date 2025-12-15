import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  "Save before you spend",
  "Automate your savings",
  "Review your budget weekly",
  "Invest consistently, not perfectly",
  "Avoid unnecessary debt",
  "Track monthly goals",
];

export default function TipsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setIndex((prev) => (prev + 1) % tips.length);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [paused]);

  // Get the next tip index in rotation
  const nextIndex = (index + 1) % tips.length;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mt-6 relative text-lg text-white min-h-[48px]"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <div>{tips[index]}</div>
          <div>{tips[nextIndex]}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
