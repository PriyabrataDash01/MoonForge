export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface Portfolio {
  assets: {
    id: string;
    amount: number;
  }[];
  totalValue: number;
  totalProfit: number;
}

export interface PriceAlert {
  id: string;
  assetId: string;
  price: number;
  condition: 'above' | 'below';
  active: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  relatedAssets: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

export type TimeFrame = '1H' | '24H' | '7D' | '30D' | '1Y';