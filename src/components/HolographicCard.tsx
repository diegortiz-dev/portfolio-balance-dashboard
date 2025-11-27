'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function HolographicCard({ children, className = '', delay = 0 }: HolographicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`holographic relative overflow-hidden rounded-lg ${className}`}
      style={{
        background: 'rgba(10, 10, 15, 0.4)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(20, 255, 255, 0.2)',
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #00C6FF, #14FFFF, #8A2BE2)',
        }}
      />
      {children}
    </motion.div>
  );
}
