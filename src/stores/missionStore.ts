import { create } from 'zustand';
import type { MissionState, Mission } from '../types';

const MOCK_MISSIONS: Mission[] = [
  {
    id: '1',
    title: 'Retweet Our Announcement',
    description: 'Help us spread the word about our upcoming token launch!',
    points: 500,
    type: 'RETWEET',
    status: 'AVAILABLE',
    deadline: '2024-04-01',
    requirements: {
      targetTweetId: '1234567890',
    },
  },
  {
    id: '2',
    title: 'Follow Our Partners',
    description: 'Follow our key ecosystem partners to stay updated.',
    points: 300,
    type: 'FOLLOW',
    status: 'AVAILABLE',
    deadline: '2024-04-01',
    requirements: {
      targetUserId: '0987654321',
    },
  },
  {
    id: '3',
    title: 'Create Promotional Tweet',
    description: 'Share your excitement about our project with your followers!',
    points: 1000,
    type: 'TWEET',
    status: 'AVAILABLE',
    deadline: '2024-04-01',
    requirements: {
      requiredText: '#SocialFiAirdrop',
      minFollowers: 100,
    },
  },
];

export const useMissionStore = create<MissionState>((set) => ({
  missions: MOCK_MISSIONS,
  activeMission: null,
  isLoading: false,

  startMission: (missionId: string) => {
    set((state) => ({
      missions: state.missions.map((mission) =>
        mission.id === missionId
          ? { ...mission, status: 'IN_PROGRESS' }
          : mission
      ),
      activeMission: missionId,
    }));
  },

  completeMission: (missionId: string) => {
    set((state) => ({
      missions: state.missions.map((mission) =>
        mission.id === missionId
          ? { ...mission, status: 'COMPLETED' }
          : mission
      ),
      activeMission: null,
    }));
  },
}));