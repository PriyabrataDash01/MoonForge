import React, { useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useProfileStore } from '../../stores/profileStore';
import { Card } from '../Card';

interface PointsHistoryProps {
  onClose: () => void;
}

export const PointsHistory: React.FC<PointsHistoryProps> = ({ onClose }) => {
  const { pointsHistory } = useProfileStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const sortedHistory = [...pointsHistory].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card
      ref={containerRef}
      className="absolute right-0 top-14 w-96 z-50 max-h-[32rem] overflow-hidden
        shadow-xl shadow-black/20 border border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Points History</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-2">
        {sortedHistory.map((transaction) => (
          <div
            key={transaction.id}
            className="p-3 rounded-lg bg-gray-700/30 space-y-1"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                {format(new Date(transaction.timestamp), 'MMM d, yyyy HH:mm')}
              </span>
              <span className="font-medium text-indigo-400">
                +{transaction.points} pts
              </span>
            </div>
            <div className="text-sm font-medium">{transaction.activity}</div>
            <div className="text-xs text-gray-400">{transaction.description}</div>
            <div className="text-xs text-right text-gray-500">
              Total: {transaction.runningTotal.toLocaleString()} pts
            </div>
          </div>
        ))}

        {sortedHistory.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No points earned yet</p>
            <p className="text-sm">Complete missions to earn points!</p>
          </div>
        )}
      </div>
    </Card>
  );
};