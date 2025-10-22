import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  fullWidth = false,
  className = ''
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0
            }
          : {
              opacity: 0,
              ...directions[direction]
            }
      }
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={fullWidth ? `w-full ${className}` : className}
    >
      {children}
    </motion.div>
  );
}
