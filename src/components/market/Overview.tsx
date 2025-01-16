'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const markets = [
  { market: "S&P 500", value: "4,927.93", change: "+0.82%" },
  { market: "NASDAQ", value: "15,628.95", change: "+1.14%" },
  { market: "FTSE 100", value: "7,487.71", change: "-0.32%" }
];

export function MarketOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Globe className="w-5 h-5 text-green-400" />
          </div>
          <h2 className="text-lg font-medium text-slate-200">Global Markets</h2>
        </div>
      </div>

      <div className="divide-y divide-slate-700">
        {markets.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-slate-200">{item.market}</span>
              <div className="text-right">
                <div className="text-slate-200">{item.value}</div>
                <div className={item.change.startsWith("+") ? "text-green-400" : "text-red-400"}>
                  {item.change}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 