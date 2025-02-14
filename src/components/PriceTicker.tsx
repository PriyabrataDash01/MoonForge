import React, { useEffect, useRef, useState } from 'react';

interface CryptoPrice {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export const PriceTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scroll = () => {
      if (containerRef.current) {
        if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth / 2) {
          containerRef.current.scrollLeft = 0;
        } else {
          containerRef.current.scrollLeft += 1;
        }
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  const tickerContent = [...prices, ...prices]; // Duplicate for seamless loop

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 border-t border-gray-700 backdrop-blur-sm z-50">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap py-3"
        style={{ 
          width: '100%', 
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {tickerContent.map((crypto, index) => (
          <div
            key={`${crypto.id}-${index}`}
            className="inline-flex items-center gap-2 px-4"
          >
            <img
              src={crypto.image}
              alt={crypto.symbol}
              className="w-5 h-5"
            />
            <span className="font-medium">{crypto.symbol.toUpperCase()}</span>
            <span className="font-bold">
              ${crypto.current_price.toLocaleString()}
            </span>
            <span className={`text-sm ${
              crypto.price_change_percentage_24h >= 0
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              {crypto.price_change_percentage_24h >= 0 ? '↑' : '↓'}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};