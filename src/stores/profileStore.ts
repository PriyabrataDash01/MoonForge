import { create } from 'zustand';
import type { ProfileState, PointTransaction } from '../types';

export const useProfileStore = create<ProfileState>((set, get) => ({
  email: null,
  twitterHandle: null,
  points: 0,
  impressions: 0,
  isLoading: false,
  pointsHistory: [],
  claimablePoints: 0,
  lastClaimDate: null,
  
  updateEmail: (email: string) => set({ email }),
  updateTwitter: (handle: string) => set({ twitterHandle: handle }),
  
  addPoints: (amount: number, activity: string, description: string) => set((state) => {
    const newTransaction: PointTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      activity,
      points: amount,
      runningTotal: state.points + amount,
      description,
      isNew: true
    };

    // Add to claimable points instead of direct points
    return {
      claimablePoints: state.claimablePoints + amount,
      pointsHistory: [newTransaction, ...state.pointsHistory]
    };
  }),

  claimPoints: () => {
    const { claimablePoints, lastClaimDate } = get();
    const now = new Date();
    
    // Check if enough time has passed since last claim
    if (lastClaimDate && now.getTime() - new Date(lastClaimDate).getTime() < 3 * 24 * 60 * 60 * 1000) {
      return;
    }

    if (claimablePoints > 0) {
      set((state) => ({
        points: state.points + claimablePoints,
        claimablePoints: 0,
        lastClaimDate: now.toISOString(),
        pointsHistory: [
          {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: now.toISOString(),
            activity: 'Points Claim',
            points: claimablePoints,
            runningTotal: state.points + claimablePoints,
            description: '3-day accumulated points claim',
            isNew: true
          },
          ...state.pointsHistory
        ]
      }));
    }
  }
}));