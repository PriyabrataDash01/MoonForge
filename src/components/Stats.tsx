import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { Flame, Users, Zap } from 'lucide-react';
import { cn } from '../utils/cn';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const startValue = 0;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * (end - startValue) + startValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <Card className="text-center transform hover:scale-105 transition-all duration-300">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-indigo-500/20 p-3 rounded-full float">
            <Users className="text-indigo-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">
            <AnimatedCounter end={1234} />
          </h3>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Active Users</span>
            <div className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
              +12% ↑
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="text-center transform hover:scale-105 transition-all duration-300">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-purple-500/20 p-3 rounded-full float">
            <Zap className="text-purple-400" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">
            <AnimatedCounter end={432000} />
          </h3>
          <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-indigo-500"
              style={{ width: '75%' }}
            />
          </div>
          <p className="text-gray-400">Total Points</p>
        </div>
      </Card>
      
      <Card className="text-center transform hover:scale-105 transition-all duration-300">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-pink-500/20 p-3 rounded-full float">
            <Flame className="text-pink-400 animate-pulse" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">
            <AnimatedCounter end={89200} />
          </h3>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Impressions</span>
            <div className="px-2 py-0.5 text-xs rounded-full bg-pink-500/20 text-pink-400">
              Live
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};