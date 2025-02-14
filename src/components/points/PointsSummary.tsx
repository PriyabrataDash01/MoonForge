import React, { useState } from 'react';
import { Calendar, Download, Filter, Search, X } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../Card';
import { useProfileStore } from '../../stores/profileStore';
import { cn } from '../../utils/cn';
import type { PointTransaction } from '../../types';

interface FilterState {
  dateFrom: string;
  dateTo: string;
  activityType: string;
}

export const PointsSummary: React.FC = () => {
  const { points, pointsHistory } = useProfileStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: '',
    dateTo: '',
    activityType: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = pointsHistory
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.activity.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || new Date(transaction.timestamp) >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || new Date(transaction.timestamp) <= new Date(filters.dateTo);
      const matchesType = !filters.activityType || transaction.activity === filters.activityType;
      
      return matchesSearch && matchesDateFrom && matchesDateTo && matchesType;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const activityTypes = Array.from(new Set(pointsHistory.map(t => t.activity)));

  const handleExport = () => {
    const csv = [
      ['Date', 'Activity', 'Points', 'Running Total', 'Description'].join(','),
      ...filteredHistory.map(t => [
        format(new Date(t.timestamp), 'yyyy-MM-dd HH:mm:ss'),
        t.activity,
        t.points,
        t.runningTotal,
        `"${t.description}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `points-history-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className={cn(
      "fixed left-4 bottom-16 transition-all duration-300 z-40",
      isExpanded ? "w-96" : "w-48",
      "hover:shadow-lg hover:shadow-indigo-500/20"
    )}>
      <div 
        className="cursor-pointer"
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Total Points
          </h2>
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <div className="mt-2 text-3xl font-bold text-white relative group">
          {points.toLocaleString()}
          <div className="points-earned-indicator" />
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700/30 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex gap-2">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
                className="flex-1 bg-gray-700/30 border border-gray-600 rounded-lg px-3 py-1 text-sm
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(f => ({ ...f, dateTo: e.target.value }))}
                className="flex-1 bg-gray-700/30 border border-gray-600 rounded-lg px-3 py-1 text-sm
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <select
              value={filters.activityType}
              onChange={(e) => setFilters(f => ({ ...f, activityType: e.target.value }))}
              className="w-full bg-gray-700/30 border border-gray-600 rounded-lg px-3 py-2 text-sm
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            >
              <option value="">All Activities</option>
              {activityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Transaction History */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {filteredHistory.map((transaction, index) => (
              <div
                key={transaction.id}
                className={cn(
                  "p-3 rounded-lg bg-gray-700/30 space-y-1",
                  transaction.isNew && "animate-highlight"
                )}
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
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 rounded-lg
              hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Export History
          </button>
        </div>
      )}
    </Card>
  );
};