import { useEffect, useRef } from 'react';

interface ParticlesProps {
  count?: number;
  colors?: string[];
}

export const Particles = ({ count = 40, colors = ['#D4AF37', '#C9A961', '#00D4FF'] }: ParticlesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.5 + 0.3;

      particle.style.cssText = `
        position: absolute;
        left: ${startX}%;
        top: ${startY}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: ${opacity};
        box-shadow: 0 0 ${size * 2}px ${color};
        --duration: ${duration}s;
        --delay: ${delay}s;
      `;

      container.appendChild(particle);
    }
  }, [count, colors]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
};
