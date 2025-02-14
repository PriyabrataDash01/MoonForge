import React, { useEffect, useRef } from 'react';
import { Card } from './Card';

const BACKERS = [
  {
    name: 'Polychain Capital',
    logo: 'https://images.unsplash.com/photo-1666919643134-d97687c1826c?w=200&h=200&fit=crop',
  },
  {
    name: 'Binance Labs',
    logo: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=200&h=200&fit=crop',
  },
  {
    name: 'Ethereum',
    logo: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=200&h=200&fit=crop',
  },
  {
    name: 'Solana',
    logo: 'https://images.unsplash.com/photo-1666919643134-d97687c1826c?w=200&h=200&fit=crop',
  },
];

export const Backers: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 35); // Increased speed (was 50)
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 relative group">
        <span className="relative z-10">Backed By</span>
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-transparent blur-lg" />
      </h2>
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {[...BACKERS, ...BACKERS].map((backer, index) => (
          <div
            key={`${backer.name}-${index}`}
            className="flex-none transform hover:scale-105 transition-all duration-300"
            style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <div className="relative w-48 h-48 rounded-xl overflow-hidden group perspective">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 transition-opacity duration-300" />
              <img
                src={backer.logo}
                alt={backer.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-gradient-to-br from-black/80 to-black/60">
                <span className="text-xl font-bold text-white text-center px-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  {backer.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};