import React, { useEffect, useRef } from 'react';
import { Moon, Sparkles } from 'lucide-react';

interface LogoProps {
  onNavigate: (page: "home") => void;
}

export const Logo: React.FC<LogoProps> = ({ onNavigate }) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const starfieldRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const rect = glowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      glowRef.current.style.setProperty('--x', `${x}px`);
      glowRef.current.style.setProperty('--y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!starfieldRef.current) return;

    const canvas = starfieldRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create stars
    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let animationFrame: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle movement
        star.x += Math.sin(time * 0.001 + star.twinklePhase) * 0.1;
        star.y += Math.cos(time * 0.001 + star.twinklePhase) * 0.1;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <button 
      onClick={() => onNavigate("home")}
      className="flex items-center gap-3 transition-transform duration-300 hover:scale-105 focus:outline-none group"
    >
      <div className="relative w-40 h-12">
        <canvas
          ref={starfieldRef}
          className="absolute inset-0 opacity-50"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 animate-pulse" />
            <div className="bg-indigo-500/20 p-2 rounded-xl relative overflow-hidden">
              <Moon className="text-indigo-400 relative z-10" size={24} />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
            </div>
          </div>
          
          <div
            ref={glowRef}
            className="relative font-bold text-xl cursor-default select-none ml-3"
          >
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Moon
            </span>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Forge
            </span>
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(99,102,241,0.3)_0%,transparent_100%)]" />
            </div>
            
            <div className="absolute -inset-2 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-indigo-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float-particle ${2 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};