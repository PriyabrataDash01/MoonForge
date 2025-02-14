import React, { useState } from 'react';
import { Activity as ActivityIcon, BarChart3, Award, Users } from 'lucide-react';
import { Card } from '../components/Card';
import { cn } from '../utils/cn';

interface EngagementMetrics {
  likes: number;
  retweets: number;
  quoteTweets: number;
  replies: number;
  originalTweets: number;
  verifiedEngagements: number;
  views: number;
}

const POINTS_CONFIG = {
  like: 0.1,
  retweet: 0.3,
  quoteTweet: 0.5,
  reply: 0.2,
  tweet: 1,
  verifiedMultiplier: 2,
  viewsPerPoint: 1000,
};

const MOCK_LEADERBOARD = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  handle: `@user${i + 1}`,
  points: Math.floor(Math.random() * 100000) + 10000,
  isVerified: Math.random() > 0.8,
})).sort((a, b) => b.points - a.points);

export const Activity: React.FC = () => {
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    likes: 0,
    retweets: 0,
    quoteTweets: 0,
    replies: 0,
    originalTweets: 0,
    verifiedEngagements: 0,
    views: 0,
  });

  const calculatePoints = () => {
    const basePoints = 
      metrics.likes * POINTS_CONFIG.like +
      metrics.retweets * POINTS_CONFIG.retweet +
      metrics.quoteTweets * POINTS_CONFIG.quoteTweet +
      metrics.replies * POINTS_CONFIG.reply +
      metrics.originalTweets * POINTS_CONFIG.tweet +
      (metrics.views / POINTS_CONFIG.viewsPerPoint) * 0.1;

    const verifiedBonus = metrics.verifiedEngagements * POINTS_CONFIG.verifiedMultiplier;
    
    return basePoints + verifiedBonus;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-500/20 p-2 rounded-xl">
          <ActivityIcon className="text-indigo-400" size={32} />
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Activity Calculator
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <div className="lg:col-span-1">
          <Card className="h-[calc(100vh-200px)] overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-yellow-400" size={24} />
              <h2 className="text-xl font-bold">Top Farmers</h2>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-4rem)] pr-4 space-y-2">
              {MOCK_LEADERBOARD.map((user) => (
                <div
                  key={user.handle}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-center font-bold text-gray-400">
                      #{user.rank}
                    </span>
                    <span className="font-medium">
                      {user.handle}
                      {user.isVerified && (
                        <span className="ml-1 text-blue-400">✓</span>
                      )}
                    </span>
                  </div>
                  <span className="font-bold text-indigo-400">
                    {user.points.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Calculator */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-indigo-400" size={24} />
              <h2 className="text-xl font-bold">Points Calculator</h2>
            </div>

            <div className="space-y-6">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key}>
                  <label className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-gray-400">
                      {key === 'views' 
                        ? `${(value / POINTS_CONFIG.viewsPerPoint * 0.1).toFixed(1)} points`
                        : `${(value * (POINTS_CONFIG as any)[key.toLowerCase()] || 0).toFixed(1)} points`
                      }
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={key === 'views' ? 1000000 : 1000}
                    step={key === 'views' ? 1000 : 1}
                    value={value}
                    onChange={(e) => setMetrics(prev => ({
                      ...prev,
                      [key]: parseInt(e.target.value)
                    }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>0</span>
                    <span>{value.toLocaleString()}</span>
                    <span>{key === 'views' ? '1M' : '1K'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-indigo-500/10 rounded-xl">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Estimated Points</h3>
                <p className="text-4xl font-bold text-indigo-400">
                  {calculatePoints().toFixed(1)}
                </p>
              </div>
            </div>
          </Card>

          {/* Bonus System */}
          <Card>
            <h2 className="text-xl font-bold mb-6">Active Bonuses</h2>
            <div className="space-y-4">
              {[
                { label: 'Daily Streak (3+ days)', bonus: '+10%', active: true },
                { label: 'Top 10% Weekly Engagement', bonus: '+10%', active: false },
                { label: 'Token/NFT Holder', bonus: '1.2x Multiplier', active: true },
                { label: 'Referral Program', bonus: '+10 points/referral', active: true }
              ].map((bonus, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl",
                    bonus.active ? "bg-green-500/10" : "bg-gray-700/30"
                  )}
                >
                  <span className="font-medium">{bonus.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-bold",
                      bonus.active ? "text-green-400" : "text-gray-400"
                    )}>
                      {bonus.bonus}
                    </span>
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      bonus.active ? "bg-green-400" : "bg-gray-400"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};