import React from 'react';
import { Card } from '../Card';
import { Calendar, Target, Trophy } from 'lucide-react';
import type { Mission } from '../../types';

interface MissionCardProps {
  mission: Mission;
  onStart: () => void;
  onComplete: () => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onStart,
  onComplete,
}) => {
  const isAvailable = mission.status === 'AVAILABLE';
  const isInProgress = mission.status === 'IN_PROGRESS';
  const isCompleted = mission.status === 'COMPLETED';

  return (
    <Card className="w-full transition-transform hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{mission.title}</h3>
          <p className="text-gray-400">{mission.description}</p>
        </div>
        <div className="bg-indigo-500/20 p-3 rounded-xl">
          <Trophy className="text-indigo-400" size={24} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Target size={16} />
            <span>{mission.type}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={16} />
            <span>Ends {new Date(mission.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-500/20 px-3 py-1 rounded-full">
              <span className="text-purple-400 font-semibold">
                {mission.points} Points
              </span>
            </div>
          </div>
          
          {isAvailable && (
            <button
              onClick={onStart}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl
                hover:bg-indigo-700 transition-colors duration-300
                border border-indigo-500/50"
            >
              Start Mission
            </button>
          )}
          
          {isInProgress && (
            <button
              onClick={onComplete}
              className="bg-green-600 text-white px-4 py-2 rounded-xl
                hover:bg-green-700 transition-colors duration-300
                border border-green-500/50"
            >
              Complete Mission
            </button>
          )}
          
          {isCompleted && (
            <span className="text-green-400 font-medium">
              Mission Completed ✓
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};