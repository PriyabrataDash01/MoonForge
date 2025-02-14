import React from 'react';
import { ProfileCard } from '../components/profile/ProfileCard';
import { ProfileStats } from '../components/profile/ProfileStats';
import { EmailForm } from '../components/profile/EmailForm';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
        Your Profile
      </h1>
      
      <div className="flex flex-col gap-8">
        <ProfileCard />
        <ProfileStats />
        <EmailForm />
      </div>
    </div>
  );
};