import React, { useState } from 'react';
import { Card } from '../Card';
import { Mail } from 'lucide-react';
import { useProfileStore } from '../../stores/profileStore';

export const EmailForm: React.FC = () => {
  const { email, updateEmail } = useProfileStore();
  const [newEmail, setNewEmail] = useState(email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmail(newEmail);
  };

  return (
    <Card className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Update Email</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full bg-gray-700/30 border border-gray-600 rounded-xl px-4 py-2 text-white
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
            />
            <Mail className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-xl px-4 py-2
            hover:bg-indigo-700 transition-colors duration-300
            border border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20"
        >
          Update Email
        </button>
      </form>
    </Card>
  );
};