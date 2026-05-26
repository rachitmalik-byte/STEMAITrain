// FIX: was importing from 'framer-motion' — now uses 'motion/react' directly.
// (vite alias also handles this, but explicit is cleaner)
import { motion } from 'motion/react';
import { useState } from 'react';

const nodes = [
  { top: '30%', left: '2%', location: 'Florida', details: 'Node #01: 42 Active Mathematics' },
  { top: '17%', left: '48%', location: 'London Lab', details: 'Node #02: 18 Quantum Physics Specialists' },
  { top: '35%', left: '90%', location: 'Mumbai Core', details: 'Node #03: 35 Advanced Code Architecture Translators' },
  { top: '18%', left: '55%', location: 'Germany', details: 'Node #04: 12 Computational Biology Labs' },
  { top: '46%', left: '70%', location: 'Kenya Vertex', details: 'Node #05: 24 Deep Logic Annotators' },
  { top: '52%', left: '28%', location: 'Brazil', details: 'Node #06: 15 Formal Proof Verifiers' },
];

export default function WorldMapLite() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
                    onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative group cursor-pointer">
            <div className="w-3 h-3 rounded-full bg-[#F26419] shadow-[0_0_20px_rgba(242,100,25,0.9)]" />
              <div className="absolute inset-0 rounded-full bg-[#F26419] animate-ping opacity-50" />
                      {/* The Floating Tooltip Window */}
            {hoveredIndex === index && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-neutral-950/95 dark:bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl pointer-events-none text-left transition-all duration-200">
                <p className="text-xs font-bold text-white mb-0.5">{node.location}</p>
                <p className="text-[10px] text-neutral-400 leading-normal font-medium">{node.details}</p>
                {/* Triangular arrow anchor point */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-950/95 dark:border-t-black/95" />
</div>
        )}
      </div>
    </motion.div>
  ))
}
