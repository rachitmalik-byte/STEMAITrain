import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, BrainCircuit, Atom, Microchip } from 'lucide-react';

export function OrbitalRings() {
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 1000], [0, 45]);
  const rotateY = useTransform(scrollY, [0, 1000], [0, -30]);

  return (
    <motion.div 
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center transform-gpu"
    >
      <motion.div
        animate={{ rotateX: 360, rotateZ: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute w-[500px] h-[500px] border border-orange-500/10 rounded-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -ml-6 -mt-6 bg-[var(--bg-secondary)] border border-[var(--accent)]/30 rounded-full p-3 shadow-[0_0_20px_rgba(255,95,31,0.2)]"
        >
          <Atom className="w-6 h-6 text-[var(--accent)]" />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ rotateY: 360, rotateZ: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute w-[650px] h-[650px] border border-blue-500/10 rounded-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div 
          className="absolute bottom-1/4 right-0 -mr-6 translate-x-1/2 bg-[var(--bg-secondary)] border border-blue-500/30 rounded-full p-3 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >
          <BrainCircuit className="w-6 h-6 text-blue-500" />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ rotateX: 180, rotateZ: 360 }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] border border-purple-500/10 rounded-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div 
          className="absolute top-3/4 left-0 -ml-6 bg-[var(--bg-secondary)] border border-purple-500/30 rounded-full p-3 shadow-[0_0_200px_rgba(168,85,247,0.2)]"
        >
          <Microchip className="w-6 h-6 text-purple-500" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
