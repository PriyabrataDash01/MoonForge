import React, { useState } from 'react';
import { Newspaper, Share2, MessageSquare, TrendingUp } from 'lucide-react';
import { Card } from '../Card';
import type { NewsItem } from '../../types/crypto';

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Bitcoin Surges Past $50,000 as Institutional Interest Grows',
    description: 'Major financial institutions continue to show interest in cryptocurrency investments...',
    url: '#',
    publishedAt: '2024-03-15T10:00:00Z',
    source: 'CryptoNews',
    relatedAssets: ['bitcoin'],
    sentiment: 'positive',
  },
  {
    id: '2',
    title: 'New DeFi Protocol Launches with Innovative Yield Farming Strategy',
    description: 'A new decentralized finance protocol has launched, offering unique yield farming opportunities...',
    url: '#',
    publishedAt: '2024-03-15T09:30:00Z',
    source: 'DeFi Daily',
    relatedAssets: ['ethereum'],
    sentiment: 'neutral',
  },
];

export const NewsFeed: React.FC = () => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const filteredNews = selectedAssets.length > 0
    ? MOCK_NEWS.filter(news => 
        news.relatedAssets.some(asset => selectedAssets.includes(asset))
      )
    : MOCK_NEWS;

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/20 p-2 rounded-xl">
          <Newspaper className="text-indigo-400" size={24} />
        </div>
        <h2 className="text-xl font-bold">Latest News</h2>
      </div>

      <div className="space-y-6">
        {filteredNews.map(news => (
          <article
            key={news.id}
            className="p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
          >
            <h3 className="text-lg font-bold mb-2">{news.title}</h3>
            <p className="text-gray-400 mb-4">{news.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <span>{news.source}</span>
                <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="hover:text-white transition-colors">
                  <MessageSquare size={16} />
                </button>
                <button className="hover:text-white transition-colors">
                  <Share2 size={16} />
                </button>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  news.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                  news.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
};