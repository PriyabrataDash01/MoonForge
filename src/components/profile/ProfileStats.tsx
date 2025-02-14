import React from 'react';
import { Card } from '../Card';
import { Trophy, Zap } from 'lucide-react';
import { useProfileStore } from '../../stores/profileStore';

export const ProfileStats: React.FC = () => {
  const { points, impressions } = useProfileStore();

  return (
    <Card className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Your Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl">
          <div className="bg-indigo-500/20 p-3 rounded-full">
            <Trophy className="text-indigo-400" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{points.toLocaleString()}</p>
            <p className="text-gray-400">Total Points</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl">
          <div className="bg-purple-500/20 p-3 rounded-full">
            <Zap className="text-purple-400" size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{impressions.toLocaleString()}</p>
            <p className="text-gray-400">Total Impressions</p>
          </div>
        </div>
      </div>
    </Card>
  );
};