import { create } from 'zustand';
import type { CryptoAsset, Portfolio, PriceAlert, TimeFrame } from '../types/crypto';

interface CryptoState {
  assets: CryptoAsset[];
  selectedAsset: string | null;
  timeFrame: TimeFrame;
  portfolio: Portfolio;
  alerts: PriceAlert[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchAssets: () => Promise<void>;
  setSelectedAsset: (id: string) => void;
  setTimeFrame: (timeFrame: TimeFrame) => void;
  addToPortfolio: (assetId: string, amount: number) => void;
  removeFromPortfolio: (assetId: string) => void;
  addAlert: (alert: Omit<PriceAlert, 'id'>) => void;
  removeAlert: (id: string) => void;
}

export const useCryptoStore = create<CryptoState>((set, get) => ({
  assets: [],
  selectedAsset: null,
  timeFrame: '24H',
  portfolio: {
    assets: [],
    totalValue: 0,
    totalProfit: 0,
  },
  alerts: [],
  isLoading: false,
  error: null,

  fetchAssets: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'
      );
      const data = await response.json();
      set({ assets: data });
    } catch (error) {
      set({ error: 'Failed to fetch crypto assets' });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedAsset: (id: string) => set({ selectedAsset: id }),
  
  setTimeFrame: (timeFrame: TimeFrame) => set({ timeFrame }),

  addToPortfolio: (assetId: string, amount: number) => {
    const { portfolio, assets } = get();
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    const newAssets = [...portfolio.assets];
    const existingIndex = newAssets.findIndex(a => a.id === assetId);

    if (existingIndex >= 0) {
      newAssets[existingIndex].amount += amount;
    } else {
      newAssets.push({ id: assetId, amount });
    }

    const totalValue = newAssets.reduce((total, { id, amount }) => {
      const asset = assets.find(a => a.id === id);
      return total + (asset?.current_price || 0) * amount;
    }, 0);

    set({
      portfolio: {
        assets: newAssets,
        totalValue,
        totalProfit: 0, // Calculate based on purchase price in a real app
      },
    });
  },

  removeFromPortfolio: (assetId: string) => {
    const { portfolio, assets } = get();
    const newAssets = portfolio.assets.filter(a => a.id !== assetId);
    
    const totalValue = newAssets.reduce((total, { id, amount }) => {
      const asset = assets.find(a => a.id === id);
      return total + (asset?.current_price || 0) * amount;
    }, 0);

    set({
      portfolio: {
        assets: newAssets,
        totalValue,
        totalProfit: 0,
      },
    });
  },

  addAlert: (alert: Omit<PriceAlert, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    set(state => ({
      alerts: [...state.alerts, { ...alert, id }],
    }));
  },

  removeAlert: (id: string) => {
    set(state => ({
      alerts: state.alerts.filter(alert => alert.id !== id),
    }));
  },
}));