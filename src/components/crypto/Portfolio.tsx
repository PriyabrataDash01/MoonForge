import React from 'react';
import { PieChart, Wallet } from 'lucide-react';
import { Card } from '../Card';
import { useCryptoStore } from '../../stores/cryptoStore';
import { formatCurrency } from '../../utils/format';

export const Portfolio: React.FC = () => {
  const { portfolio, assets, removeFromPortfolio } = useCryptoStore();

  const portfolioAssets = portfolio.assets.map(pa => {
    const asset = assets.find(a => a.id === pa.id);
    if (!asset) return null;
    return {
      ...asset,
      amount: pa.amount,
      value: asset.current_price * pa.amount,
    };
  }).filter(Boolean);

  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/20 p-2 rounded-xl">
          <Wallet className="text-indigo-400" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Your Portfolio</h2>
          <p className="text-gray-400">
            Total Value: {formatCurrency(portfolio.totalValue)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {portfolioAssets.map(asset => asset && (
          <div
            key={asset.id}
            className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <img
                src={asset.image}
                alt={asset.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{asset.name}</p>
                <p className="text-sm text-gray-400">
                  {asset.amount} {asset.symbol.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(asset.value)}</p>
              <button
                onClick={() => removeFromPortfolio(asset.id)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {portfolioAssets.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <PieChart className="mx-auto mb-3" size={32} />
            <p>Your portfolio is empty</p>
            <p className="text-sm">Add some assets to get started</p>
          </div>
        )}
      </div>
    </Card>
  );
};