import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface DepthElementProps {
  children: ReactNode;
  className?: string;
  offset?: number;
  zIndex?: number;
}

export function DepthElement({ children, className, offset = 50, zIndex = 0 }: DepthElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create a parallax effect
  const yOffset = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  
  // Add physics spring for smoothness
  const springY = useSpring(yOffset, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      ref={ref}
      className={className}
      style={{ y: springY, zIndex, willChange: "transform", transform: "translateZ(0)" }}
    >
      {children}
    </motion.div>
  );
}
