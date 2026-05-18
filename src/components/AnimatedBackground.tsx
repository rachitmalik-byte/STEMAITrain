import { motion, useSpring, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  // Mouse position springs for smooth movement
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });
  
  // Scroll parallax
  const { scrollY } = useScroll();
  const parallaxYMain = useTransform(scrollY, [0, 1000], [0, -150]);
  const parallaxYGrid = useTransform(scrollY, [0, 1000], [0, -100]);
  const parallaxYGradient1 = useTransform(scrollY, [0, 1000], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Need absolute positioning relative to window
      // mouseX/Y track the raw clientX/Y coordinates
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500">
      
      {/* Light Grid Pattern with Parallax */}
      <motion.div 
        className="absolute inset-x-0 w-full opacity-[0.03] dark:opacity-[0.02]"
        style={{
          height: '200vh', // Extend height for scroll
          top: '-50vh',
          backgroundImage: `linear-gradient(to right, var(--text-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          backgroundPosition: 'center',
          y: parallaxYGrid
          willChange: 'transform' // Add this line
        }}
      />
      
      {/* Interactive Aura following mouse */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px] md:blur-[140px] opacity-50 dark:opacity-20 transform-gpu"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 60%)',
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform'
        }}
      />

      {/* Floating ambient gradients */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] bg-blue-500/20 dark:bg-blue-400/10 transform-gpu"
        animate={{
          x: ["0%", "10%", "0%"],
          y: ["0%", "5%", "0%"],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: '5%', top: '10%', y: parallaxYGradient1
               willChange: 'transform, opacity'}}
      />
      
      <motion.div
        className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] bg-purple-500/20 dark:bg-purple-400/10 transform-gpu"
        animate={{
          x: ["0%", "-10%", "0%"],
          y: ["0%", "10%", "0%"],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: '5%', bottom: '10%', y: parallaxYMain,
               willChange: 'transform, opacity'}}
      />

      {/* Smooth Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_100%)] opacity-80" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[var(--bg-primary)] to-transparent opacity-90" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent opacity-90" />
    </div>
  );
}
