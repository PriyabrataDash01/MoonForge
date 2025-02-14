import React from 'react';
import { Card } from '../Card';
import { Mail, Twitter, Wallet } from 'lucide-react';
import { useWalletStore } from '../../stores/walletStore';
import { useProfileStore } from '../../stores/profileStore';

export const ProfileCard: React.FC = () => {
  const { address } = useWalletStore();
  const { email, twitterHandle, points, impressions } = useProfileStore();

  return (
    <Card className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl">
          <Wallet className="text-indigo-400" size={20} />
          <div>
            <p className="text-sm text-gray-400">Wallet Address</p>
            <p className="font-medium text-white">{address || 'Not connected'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl">
          <Twitter className="text-blue-400" size={20} />
          <div>
            <p className="text-sm text-gray-400">Twitter Account</p>
            <p className="font-medium text-white">{twitterHandle || 'Not connected'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl">
          <Mail className="text-purple-400" size={20} />
          <div>
            <p className="text-sm text-gray-400">Email Address</p>
            <p className="font-medium text-white">{email || 'Not set'}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};