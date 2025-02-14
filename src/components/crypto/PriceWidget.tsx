import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../Card';
import { formatCurrency } from '../../utils/format';
import type { CryptoAsset } from '../../types/crypto';

interface PriceWidgetProps {
  asset: CryptoAsset;
  onClick?: () => void;
}

export const PriceWidget: React.FC<PriceWidgetProps> = ({ asset, onClick }) => {
  const priceChange = asset.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  return (
    <Card 
      className="cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <img 
          src={asset.image} 
          alt={asset.name} 
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{asset.name}</h3>
            <span className="text-sm text-gray-400">{asset.symbol.toUpperCase()}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold">
              {formatCurrency(asset.current_price)}
            </span>
            <div 
              className={`flex items-center gap-1 ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isPositive ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span className="font-medium">
                {Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};