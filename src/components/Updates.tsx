import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Card } from './Card';

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: string;
}

const RECENT_UPDATES: Update[] = [
  {
    id: '1',
    title: 'New Reward System Launch',
    description: 'Introducing dynamic multipliers for engagement rewards and enhanced tracking capabilities.',
    date: '2024-03-15',
    tag: 'Feature'
  },
  {
    id: '2',
    title: 'Partnership Announcement',
    description: 'Strategic partnership with leading DeFi protocols to expand ecosystem rewards.',
    date: '2024-03-14',
    tag: 'News'
  },
  {
    id: '3',
    title: 'Community Milestone',
    description: 'Reached 100k active users! New community rewards program launching soon.',
    date: '2024-03-13',
    tag: 'Community'
  }
];

export const Updates: React.FC = () => {
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Updates</h2>
        <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors">
          <span>View All</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {RECENT_UPDATES.map((update) => (
          <div
            key={update.id}
            className="group p-4 bg-gray-800/50 rounded-xl transition-all duration-300
              hover:bg-gray-800/70 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors">
                  {update.title}
                </h3>
                <p className="text-gray-400">{update.description}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-500/20 text-indigo-400">
                {update.tag}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={14} />
              <span>{new Date(update.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};