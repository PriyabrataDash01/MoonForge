import { create } from 'zustand';
import { ethers } from 'ethers';
import type { WalletState } from '../types';

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  isConnecting: false,
  
  connect: async () => {
    set({ isConnecting: true });
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        set({ address: accounts[0] });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      set({ isConnecting: false });
    }
  },

  disconnect: () => {
    set({ address: null });
  },
}));