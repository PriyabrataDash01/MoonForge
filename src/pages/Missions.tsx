import React from 'react';
import { Sparkles } from 'lucide-react';
import { MissionsList } from '../components/missions/MissionsList';

export const Missions: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-500/20 p-2 rounded-xl">
          <Sparkles className="text-indigo-400" size={32} />
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Promotional Missions
        </h1>
      </div>
      
      <div className="mb-8">
        <p className="text-xl text-gray-400">
          Complete missions to earn points and increase your chances of getting a larger airdrop allocation.
        </p>
      </div>

      <MissionsList />
    </div>
  );
};