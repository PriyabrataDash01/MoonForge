import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Comet {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  opacity: number;
  lifetime: number;
  currentLife: number;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create stars
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 0.001 + 0.0005, // Slower twinkle
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // Comets array
    let comets: Comet[] = [];

    // Add new comet
    const addComet = () => {
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let x, y, angle;

      switch (side) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = -20;
          angle = Math.PI / 2 + (Math.random() * 0.5 - 0.25);
          break;
        case 1: // right
          x = canvas.width + 20;
          y = Math.random() * canvas.height;
          angle = Math.PI + (Math.random() * 0.5 - 0.25);
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 20;
          angle = -Math.PI / 2 + (Math.random() * 0.5 - 0.25);
          break;
        default: // left
          x = -20;
          y = Math.random() * canvas.height;
          angle = 0 + (Math.random() * 0.5 - 0.25);
          break;
      }

      comets.push({
        x,
        y,
        angle,
        speed: Math.random() * 2 + 3,
        length: Math.random() * 50 + 50,
        opacity: Math.random() * 0.5 + 0.5,
        lifetime: 100,
        currentLife: 0,
      });
    };

    // Animation loop
    let animationFrame: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw comets
      comets = comets.filter(comet => {
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        comet.currentLife++;

        // Draw comet tail
        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - Math.cos(comet.angle) * comet.length,
          comet.y - Math.sin(comet.angle) * comet.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(
          comet.x - Math.cos(comet.angle) * comet.length,
          comet.y - Math.sin(comet.angle) * comet.length
        );
        ctx.stroke();

        // Draw comet head
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 2, 0, Math.PI * 2);
        ctx.fill();

        return comet.currentLife < comet.lifetime &&
               comet.x > -100 && comet.x < canvas.width + 100 &&
               comet.y > -100 && comet.y < canvas.height + 100;
      });

      // Add new comet randomly
      if (Math.random() < 0.005) { // Adjust frequency of comets
        addComet();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};