import React from 'react';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "depth-card accent-glow",
        "hover:shadow-lg hover:shadow-[var(--accent-primary)]/5",
        "transition-all duration-300",
        className
      )}
    >
      <div className="relative p-6">
        {children}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      </div>
    </div>
  );
};