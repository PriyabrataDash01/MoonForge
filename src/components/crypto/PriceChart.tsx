import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { Card } from '../Card';
import type { TimeFrame } from '../../types/crypto';

interface PriceChartProps {
  data: { time: string; value: number }[];
  timeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

const timeFrames: TimeFrame[] = ['1H', '24H', '7D', '30D', '1Y'];

export const PriceChart: React.FC<PriceChartProps> = ({
  data,
  timeFrame,
  onTimeFrameChange,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: 'rgba(107, 114, 128, 0.1)' },
        horzLines: { color: 'rgba(107, 114, 128, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const lineSeries = chartRef.current.addLineSeries({
      color: '#6366F1',
      lineWidth: 2,
    });

    lineSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data]);

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Price Chart</h2>
        <div className="flex gap-2">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeFrameChange(tf)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                ${
                  timeFrame === tf
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
                }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} />
    </Card>
  );
};