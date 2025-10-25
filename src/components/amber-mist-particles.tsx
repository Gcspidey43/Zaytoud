'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Define particle properties
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  amplitudeX: number;
  amplitudeY: number;
  frequency: number;
  phase: number;
  centerX: number;
  centerY: number;
  isDispersed: boolean;
}

const AmberMistParticles = () => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Initialize particles
  useEffect(() => {
    setIsMounted(true);
    
    const initializeParticles = () => {
      if (!containerRef.current) return;

      const particles: Particle[] = [];
      const particleCount = 120; // Number of particles

      for (let i = 0; i < particleCount; i++) {
        // Random size between 2px and 12px
        const size = Math.random() * 10 + 2;
        // Random opacity between 0.3 and 0.8
        const opacity = Math.random() * 0.5 + 0.3;
        // Random movement speeds
        const speedX = (Math.random() - 0.5) * 0.8;
        const speedY = (Math.random() - 0.5) * 0.8;
        // Random amplitude for floating effect
        const amplitudeX = Math.random() * 50 + 20;
        const amplitudeY = Math.random() * 50 + 20;
        // Random frequency for the floating motion
        const frequency = Math.random() * 0.02 + 0.005;
        // Random phase for wave motion
        const phase = Math.random() * Math.PI * 2;

        // Start particles from left or right side based on their index
        const startX = i % 2 === 0 ? -100 : window.innerWidth + 100;
        const startY = Math.random() * window.innerHeight;

        particles.push({
          id: i,
          x: startX,
          y: startY,
          size,
          opacity,
          speedX,
          speedY,
          amplitudeX,
          amplitudeY,
          frequency,
          phase,
          centerX: window.innerWidth / 2,
          centerY: window.innerHeight / 2,
          isDispersed: false,
        });
      }

      particlesRef.current = particles;
    };

    initializeParticles();

    // Clean up animation frame
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    const animate = () => {
      const particles = particlesRef.current;
      const time = Date.now() * 0.001; // Convert to seconds
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      particles.forEach(particle => {
        // Update center position if window size changes
        particle.centerX = centerX;
        particle.centerY = centerY;

        // Initial dispersal effect from both sides to center
        if (!particle.isDispersed) {
          // Calculate distance to center
          const dx = particle.centerX - particle.x;
          const dy = particle.centerY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const speed = 0.5; // Dispersal speed

          // Move towards center
          if (distance > 5) {
            particle.x += dx * speed * 0.01;
            particle.y += dy * speed * 0.01;
          } else {
            // Once close to center, start floating effect
            particle.isDispersed = true;
          }
        } else {
          // Apply floating motion using sine waves after dispersal
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Add floating effect using sine waves
          particle.x += Math.sin(time * particle.frequency + particle.phase) * particle.amplitudeX * 0.01;
          particle.y += Math.cos(time * particle.frequency * 0.7 + particle.phase) * particle.amplitudeY * 0.01;
        }

        // Reset particles that go off-screen (only if not yet dispersed)
        if (!particle.isDispersed) {
          if (particle.x > window.innerWidth + 100) {
            particle.x = -100;
          } else if (particle.x < -100) {
            particle.x = window.innerWidth + 100;
          }

          if (particle.y > window.innerHeight + 100) {
            particle.y = -100;
          } else if (particle.y < -100) {
            particle.y = window.innerHeight + 100;
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{ 
            x: particle.x, 
            y: particle.y,
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            x: particle.x, 
            y: particle.y,
            scale: [0.3, 1, 0.6, 1, 0.3],
            opacity: [0.2, 0.7, 0.9, 0.7, 0.2]
          }}
          transition={{
            x: { duration: Infinity, ease: "linear" },
            y: { duration: Infinity, ease: "linear" },
            scale: {
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            opacity: {
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(251,191,36,${particle.opacity}) 0%, rgba(245,158,11,${particle.opacity * 0.7}) 70%, rgba(202,138,4,${particle.opacity * 0.3}) 100%)`,
            boxShadow: `0 0 ${particle.size}px ${particle.size / 2}px rgba(251,191,36,${particle.opacity * 0.4})`,
            position: 'absolute',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
};

export default AmberMistParticles;