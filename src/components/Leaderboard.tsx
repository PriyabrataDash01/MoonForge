import React from 'react';
import { Trophy, Twitter } from 'lucide-react';
import { Card } from './Card';
import type { User } from '../types';

const MOCK_USERS: User[] = [
  { address: '0x1234...5678', points: 1500, twitterHandle: '@crypto_whale', impressions: 50000 },
  { address: '0x8765...4321', points: 1200, twitterHandle: '@nft_lover', impressions: 40000 },
  { address: '0x9876...1234', points: 1000, twitterHandle: '@defi_guru', impressions: 30000 },
];

export const Leaderboard: React.FC = () => {
  return (
    <Card className="w-full max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold">Top Contributors</h2>
      </div>
      
      <div className="space-y-4">
        {MOCK_USERS.map((user, index) => (
          <div
            key={user.address}
            className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl transition-colors duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/20">
                <span className="text-lg font-bold text-indigo-400">#{index + 1}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Twitter size={16} className="text-blue-400" />
                  <p className="font-medium text-indigo-300">{user.twitterHandle}</p>
                </div>
                <p className="text-sm text-gray-400">{user.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-indigo-400">{user.points.toLocaleString()} Points</p>
              <p className="text-sm text-gray-400">{user.impressions.toLocaleString()} Impressions</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};