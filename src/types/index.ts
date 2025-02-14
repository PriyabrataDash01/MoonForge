// Add to the existing types
export interface ProfileState {
  // ... existing properties
  claimablePoints: number;
  lastClaimDate: string | null;
  claimPoints: () => void;
}