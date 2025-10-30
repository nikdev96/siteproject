import { motion } from 'framer-motion';
import React from 'react';

interface MotionPageProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.3,
};

export const MotionPage: React.FC<MotionPageProps> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);
