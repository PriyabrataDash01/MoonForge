import React from 'react';
import { Twitter } from 'lucide-react';
import { cn } from '../utils/cn';

export const TwitterConnect: React.FC = () => {
  const handleConnect = () => {
    alert('Twitter integration would be implemented here');
  };

  return (
    <button
      onClick={handleConnect}
      className={cn(
        "flex items-center gap-2 rounded-lg font-medium",
        "bg-blue-500/90 text-white",
        "hover:bg-blue-600 transition-all duration-300",
        "border border-blue-400/50",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
        "shadow-sm hover:shadow-md hover:shadow-blue-500/20",
        // Mobile styles
        "p-1.5 md:px-4 md:py-1.5",
        "text-sm"
      )}
    >
      <Twitter size={16} />
      <span className="hidden md:inline">Connect</span>
    </button>
  );
};