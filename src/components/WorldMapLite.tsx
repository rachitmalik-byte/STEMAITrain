// FIX: was importing from 'framer-motion' — now uses 'motion/react' directly.
// (vite alias also handles this, but explicit is cleaner)
import { motion } from 'motion/react';

const nodes = [
  { top: '32%', left: '22%' },
  { top: '38%', left: '48%' },
  { top: '45%', left: '72%' },
  { top: '58%', left: '61%' },
  { top: '40%', left: '82%' },
  { top: '52%', left: '30%' },
];

export default function WorldMapLite() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-70">
      {/* 170KB SVG — kept lazy, no change to visual */}
      <img
        src="/world-map.svg"
        alt="World Map"
        loading="lazy"
        width="1200"
        height="600"
        className="w-full h-full object-cover select-none pointer-events-none opacity-30 dark:invert-0 invert"
      />

      {nodes.map((node, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ top: node.top, left: node.left }}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
        >
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#F26419] shadow-[0_0_20px_rgba(242,100,25,0.9)]" />
              <div className="absolute inset-0 rounded-full bg-[#F26419] animate-ping opacity-50" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
