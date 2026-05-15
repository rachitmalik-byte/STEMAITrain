import { ReactNode, useRef, ComponentProps } from 'react';
import { motion, useInView } from 'motion/react';
import { clsx } from 'clsx';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: boolean;
}

export function AnimatedSection({ 
  children, 
  className,
  delay = 0,
  staggerChildren = false
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: delay }
          }
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const AnimatedItem = ({ children, className, ...props }: { children: ReactNode, className?: string } & ComponentProps<typeof motion.div>) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
