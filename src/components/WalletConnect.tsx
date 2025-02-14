import React from 'react';
import { Wallet } from 'lucide-react';
import { useWalletStore } from '../stores/walletStore';
import { cn } from '../utils/cn';

export const WalletConnect: React.FC = () => {
  const { address, isConnecting, connect, disconnect } = useWalletStore();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <button
      onClick={address ? disconnect : connect}
      disabled={isConnecting}
      className={cn(
        "flex items-center gap-2 rounded-lg font-medium",
        "bg-indigo-600/90 text-white",
        "hover:bg-indigo-700 transition-all duration-300",
        "border border-indigo-500/50",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
        "shadow-sm hover:shadow-md hover:shadow-indigo-500/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Mobile styles
        "p-1.5 md:px-4 md:py-1.5",
        "text-sm"
      )}
    >
      <Wallet size={16} />
      <span className="hidden md:inline">
        {isConnecting ? 'Connecting...' : address ? formatAddress(address) : 'Connect'}
      </span>
    </button>
  );
};