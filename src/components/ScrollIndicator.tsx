'use client';

import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(15, 23, 42, 0.5)',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #14FFFF)',
          transition: 'width 0.1s ease',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.6)',
        }}
      />
    </div>
  );
}
