import { useEffect, useRef, useState } from 'react';
import { useInView, useSpring } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({ value, suffix = '', prefix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { stiffness: 40, damping: 20, mass: 1 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
  }, [spring]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}
