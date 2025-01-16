'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp,
  Brain,
  Users,
  MessageSquare,
  BarChart2,
  Activity,
  TrendingDown,
  ChevronRight
} from 'lucide-react';

interface SentimentMetric {
  label: string;
  value: number;
  change: number;
  icon: any;
}

const metrics: SentimentMetric[] = [
  {
    label: 'Overall Sentiment',
    value: 79.9,
    change: 12.5,
    icon: Brain
  },
  {
    label: 'Social Activity',
    value: 14.2,
    change: 23,
    icon: Users
  },
  {
    label: 'News Sentiment',
    value: 7.8,
    change: 12,
    icon: MessageSquare
  },
  {
    label: 'Market Momentum',
    value: 8.5,
    change: 15,
    icon: Activity
  }
];

export function MarketSentiment() {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-light" />
            <h2 className="text-lg font-medium text-slate-200">Market Sentiment</h2>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3 py-1.5 bg-green-500/10 rounded-lg"
            >
              <span className="text-sm font-medium text-green-400">Very Bullish</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Sentiment Score */}
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Sentiment Score</span>
            <span className="text-lg font-medium text-slate-200">79.9%</span>
          </div>
          <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '79.9%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-primary-light"
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-slate-900/30 rounded-xl border border-slate-700/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">{metric.label}</span>
                </div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-400"
                >
                  +{metric.change}%
                </motion.div>
              </div>
              <div className="text-lg font-medium text-slate-200">
                {typeof metric.value === 'number' && metric.value > 10 
                  ? metric.value.toFixed(1) 
                  : metric.value.toString()
                }{metric.label.includes('Sentiment') ? '/10' : 'K'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">14.2K Social Signals</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">2.4K Comments</span>
              </div>
            </div>
            <button className="flex items-center gap-1 text-primary-light hover:text-primary-dark transition-colors">
              Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 