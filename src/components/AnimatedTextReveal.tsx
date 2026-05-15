import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

interface AnimatedTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedTextReveal({ text, className = "", delay = 0 }: AnimatedTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * 0.5 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", zIndex: 1 }}
      className={className}
      variants={container}
      initial="hidden"
      animate={controls}
      ref={ref as any}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
          {word === "<br/>" ? <br /> : word}
        </motion.span>
      ))}
    </motion.div>
  );
}
