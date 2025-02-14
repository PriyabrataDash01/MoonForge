import React from 'react';
import { Trophy, Calendar, Filter, Clock, Gift } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { useProfileStore } from '../stores/profileStore';
import { Card } from '../components/Card';
import { cn } from '../utils/cn';

export const Points: React.FC = () => {
  const { points, pointsHistory, claimablePoints, lastClaimDate, claimPoints } = useProfileStore();
  const [dateFilter, setDateFilter] = React.useState({ from: '', to: '' });
  const [activityFilter, setActivityFilter] = React.useState('');

  const activityTypes = Array.from(new Set(pointsHistory.map(t => t.activity)));
  
  const filteredHistory = pointsHistory
    .filter(transaction => {
      const matchesDateFrom = !dateFilter.from || new Date(transaction.timestamp) >= new Date(dateFilter.from);
      const matchesDateTo = !dateFilter.to || new Date(transaction.timestamp) <= new Date(dateFilter.to);
      const matchesType = !activityFilter || transaction.activity === activityFilter;
      
      return matchesDateFrom && matchesDateTo && matchesType;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const nextClaimDate = lastClaimDate ? addDays(new Date(lastClaimDate), 3) : new Date();
  const canClaim = lastClaimDate ? new Date() >= nextClaimDate : true;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-500/20 p-2 rounded-xl">
          <Trophy className="text-indigo-400" size={32} />
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Your Points
        </h1>
      </div>

      <div className="grid gap-8">
        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Points Card */}
          <Card className="text-center p-8">
            <h2 className="text-2xl font-bold mb-2">Total Points</h2>
            <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              {points.toLocaleString()}
            </p>
          </Card>

          {/* Claimable Points Card */}
          <Card className="relative overflow-hidden">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Claimable Points</h2>
              <p className="text-5xl font-bold text-indigo-400 mb-4">
                {claimablePoints.toLocaleString()}
              </p>
              
              <button
                onClick={claimPoints}
                disabled={!canClaim || claimablePoints === 0}
                className={cn(
                  "flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-medium transition-all duration-300",
                  canClaim && claimablePoints > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                )}
              >
                <Gift size={20} />
                {canClaim ? "Claim Points" : "Next Claim Available In"}
              </button>

              {!canClaim && (
                <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                  <Clock size={16} />
                  <span>
                    {format(nextClaimDate, "MMM d, yyyy HH:mm")}
                  </span>
                </div>
              )}
            </div>

            {/* Background effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <Filter className="text-indigo-400" size={24} />
            <h2 className="text-xl font-bold">Filter History</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="date"
              value={dateFilter.from}
              onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
              className="bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-2
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <input
              type="date"
              value={dateFilter.to}
              onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
              className="bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-2
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-2
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="">All Activities</option>
              {activityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Points History */}
        <Card>
          <h2 className="text-xl font-bold mb-6">Points History</h2>
          <div className="space-y-4">
            {filteredHistory.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 bg-gray-700/30 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={16} />
                    <span>{format(new Date(transaction.timestamp), 'MMM d, yyyy HH:mm')}</span>
                  </div>
                  <span className="font-bold text-indigo-400">+{transaction.points} points</span>
                </div>
                <div>
                  <h3 className="font-medium">{transaction.activity}</h3>
                  <p className="text-sm text-gray-400">{transaction.description}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  Running Total: {transaction.runningTotal.toLocaleString()} points
                </div>
              </div>
            ))}

            {filteredHistory.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>No points history found</p>
                <p className="text-sm">Complete missions to earn points!</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};