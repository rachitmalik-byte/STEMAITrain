import { useRef, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import type { ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);

  const opacity = useMotionValue(0);
  const opacitySpring = useSpring(opacity, { damping: 40, stiffness: 200, mass: 0.5 });
  
  const background = useMotionTemplate`radial-gradient(circle 300px at ${useTransform(x, v => v * 100)}% ${useTransform(y, v => v * 100)}%, rgba(255, 95, 31, 0.08), transparent 80%)`;

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate percentage from 0 to 1
    const xPct = (e.clientX - rect.left) / width;
    const yPct = (e.clientY - rect.top) / height;

    x.set(xPct);
    y.set(yPct);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    opacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="relative z-10 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full transition-shadow duration-300 ${className}`}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background,
              opacity: opacitySpring,
            }}
          />
          {/* Subtle border reflection effect */}
          <motion.div
            className="absolute inset-0 mix-blend-overlay opacity-30"
            style={{
              background: useMotionTemplate`radial-gradient(circle 400px at ${useTransform(x, v => v * 100)}% ${useTransform(y, v => v * 100)}%, rgba(255,255,255,0.4), transparent 60%)`,
              opacity: opacitySpring,
            }}
          />
        </div>
        
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 h-full w-full">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
