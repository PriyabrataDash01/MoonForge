import React, { useEffect, useState, useCallback, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  id: string;
}

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  id: string;
  progress: number;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const trailPoints = useRef<TrailPoint[]>([]);
  const lastEmitTime = useRef(0);
  const isMoving = useRef(false);
  const frameRef = useRef(0);
  
  // Convert 3cm to pixels (assuming 96 DPI)
  const MAX_TRAIL_LENGTH = 113; // 3cm ≈ 113px at 96 DPI
  const EMIT_INTERVAL = 16; // 60fps
  const MAX_PARTICLES = 50;

  const cleanup = useCallback(() => {
    const now = Date.now();
    // Remove trail points older than 1 second
    trailPoints.current = trailPoints.current.filter(
      point => now - point.timestamp < 1000
    );
  }, []);

  const updateParticles = useCallback(() => {
    const now = Date.now();
    
    setParticles(prevParticles => {
      return prevParticles
        .map(particle => {
          // Increase progress and decrease alpha based on movement
          const fadeSpeed = isMoving.current ? 0.02 : 0.04;
          return {
            ...particle,
            progress: particle.progress + fadeSpeed,
            alpha: Math.max(0, 1 - particle.progress)
          };
        })
        .filter(particle => particle.alpha > 0);
    });

    frameRef.current = requestAnimationFrame(updateParticles);
  }, []);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(frameRef.current);
  }, [updateParticles]);

  useEffect(() => {
    let moveTimeout: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      isMoving.current = true;
      
      setPosition({ x: e.clientX, y: e.clientY });

      // Add new trail point
      if (now - lastEmitTime.current >= EMIT_INTERVAL) {
        const newPoint = {
          x: e.clientX,
          y: e.clientY,
          timestamp: now,
          id: `tp-${now}`
        };

        trailPoints.current.push(newPoint);
        lastEmitTime.current = now;

        // Calculate trail length
        let totalLength = 0;
        let validPoints: TrailPoint[] = [];
        
        for (let i = trailPoints.current.length - 1; i >= 0; i--) {
          const point = trailPoints.current[i];
          if (i > 0) {
            const prevPoint = trailPoints.current[i - 1];
            const dx = point.x - prevPoint.x;
            const dy = point.y - prevPoint.y;
            totalLength += Math.sqrt(dx * dx + dy * dy);
          }
          
          if (totalLength <= MAX_TRAIL_LENGTH) {
            validPoints.unshift(point);
          } else {
            break;
          }
        }

        trailPoints.current = validPoints;

        // Create new particles along the trail
        setParticles(prevParticles => {
          const newParticles: Particle[] = [];
          const baseSize = 6;
          const particleCount = Math.min(3, MAX_PARTICLES - prevParticles.length);

          for (let i = 0; i < particleCount; i++) {
            const progress = Math.random() * 0.2; // Initial progress
            const size = baseSize * (1 - progress * 0.5); // Slightly vary initial size

            newParticles.push({
              x: e.clientX + (Math.random() - 0.5) * 4,
              y: e.clientY + (Math.random() - 0.5) * 4,
              alpha: 1,
              size,
              id: `p-${now}-${i}`,
              progress
            });
          }

          return [...prevParticles, ...newParticles].slice(-MAX_PARTICLES);
        });
      }

      // Reset move timeout
      clearTimeout(moveTimeout);
      moveTimeout = window.setTimeout(() => {
        isMoving.current = false;
      }, 50);

      cleanup();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(moveTimeout);
    };
  }, [cleanup]);

  return (
    <>
      {/* Cursor */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '12px',
          height: '12px',
          background: 'white',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
        }}
      />

      {/* Trail particles */}
      {particles.map(particle => {
        const scale = 1 - particle.progress;
        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: particle.alpha,
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
              transition: 'opacity 0.1s ease-out'
            }}
          />
        );
      })}
    </>
  );
};