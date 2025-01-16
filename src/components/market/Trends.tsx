'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Hash, DollarSign, Bitcoin, LineChart } from 'lucide-react';

interface TrendData {
  symbol: string;
  name: string;
  change: string;
  volume: string;
  trend: 'up' | 'down' | 'neutral';
}

const trendingData: TrendData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    change: '+2.45%',
    volume: '52.3M',
    trend: 'up',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    change: '-1.23%',
    volume: '38.1M',
    trend: 'down',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    change: '+3.78%',
    volume: '24.5B',
    trend: 'up',
  },
];

export function MarketTrends() {
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg"
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-lg font-medium text-slate-200">Trending Assets</h2>
        </div>
      </div>

      <div className="divide-y divide-slate-700">
        {trendingData.map((item, i) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedTrend(item.symbol)}
            className={`p-4 hover:bg-slate-700/30 transition-all cursor-pointer ${
              selectedTrend === item.symbol ? 'bg-slate-700/20' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-700/50">
                  {item.symbol === 'BTC' ? (
                    <Bitcoin className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <DollarSign className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200 font-medium">{item.symbol}</span>
                    <span className="text-sm text-slate-400">{item.name}</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    Vol: {item.volume}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <motion.div
                  animate={
                    item.trend === 'up'
                      ? { y: [-1, 0] }
                      : item.trend === 'down'
                      ? { y: [0, 1] }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                  className={`text-lg font-medium ${
                    item.trend === 'up'
                      ? 'text-green-400'
                      : item.trend === 'down'
                      ? 'text-red-400'
                      : 'text-blue-400'
                  }`}
                >
                  {item.change}
                </motion.div>
                <div className="flex items-center justify-end gap-1 text-sm text-slate-400">
                  <LineChart className="w-4 h-4" />
                  <span>24h</span>
                </div>
              </div>
            </div>

            {selectedTrend === item.symbol && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-600"
              >
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Market Cap</span>
                    <div className="text-slate-200 font-medium">$2.84T</div>
                  </div>
                  <div>
                    <span className="text-slate-400">24h High</span>
                    <div className="text-slate-200 font-medium">$188.32</div>
                  </div>
                  <div>
                    <span className="text-slate-400">24h Low</span>
                    <div className="text-slate-200 font-medium">$182.45</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Trading View</span>
                    <div className="text-primary-light font-medium cursor-pointer hover:underline">
                      View Chart →
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 