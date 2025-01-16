'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MessageCircle, 
  X, 
  TrendingUp, 
  BarChart2, 
  Globe,
  Settings,
  ChevronRight,
  DollarSign,
  Brain,
  Zap,
  Activity,
  Gauge,
  Signal,
  Sparkles,
  Bot
} from 'lucide-react';
import { ChatContainer } from '@/components/chat/Container';
import { MarketOverview } from '@/components/market/Overview';
import { MarketTrends } from '@/components/market/Trends';
import { TradingChart } from '@/components/charts/TradingChart';
import { AIInsights } from '@/components/ai/Insights';
import { NewsFeed } from '@/components/news/NewsFeed';

const marketIndices = [
  { name: 'QQQ', fullName: 'Invesco QQQ Trust', price: '515.22', change: '-1.48', changePercent: '-0.29%' },
  { name: 'SPY', fullName: 'SPDR S&P 500', price: '592.34', change: '-0.44', changePercent: '-0.07%' },
  { name: 'IWM', fullName: 'iShares Russell 2000', price: '224.36', change: '+0.32', changePercent: '+0.14%' }
];

const hotStocks = [
  { 
    label: 'AAPL', 
    value: 178.32, 
    change: '+2.45%', 
    trend: 'up' as const,
    volume: '52.3M',
    marketCap: '2.84T'
  },
  { 
    label: 'TSLA', 
    value: 238.45, 
    change: '-1.23%', 
    trend: 'down' as const,
    volume: '38.1M',
    marketCap: '756.2B'
  },
  { 
    label: 'MSFT', 
    value: 378.92, 
    change: '+1.78%', 
    trend: 'up' as const,
    volume: '45.7M',
    marketCap: '2.12T'
  },
  { 
    label: 'NVDA', 
    value: 721.28, 
    change: '+3.12%', 
    trend: 'up' as const,
    volume: '32.9M',
    marketCap: '1.78T'
  },
  { 
    label: 'META', 
    value: 485.58, 
    change: '+1.89%', 
    trend: 'up' as const,
    volume: '28.4M',
    marketCap: '1.24T'
  },
  { 
    label: 'AMZN', 
    value: 178.15, 
    change: '-0.45%', 
    trend: 'down' as const,
    volume: '41.2M',
    marketCap: '1.86T'
  }
];

const aiAnalysis = {
  marketPulse: 78,
  sentimentScore: 65,
  volatilityIndex: 42,
  aiConfidence: 89,
  lastUpdate: '2 minutes ago',
  activeModels: 4,
  processedData: '1.2M data points',
  predictions: [
    { type: 'Short Term', direction: 'bullish', confidence: 85 },
    { type: 'Medium Term', direction: 'neutral', confidence: 72 },
    { type: 'Long Term', direction: 'bullish', confidence: 91 }
  ]
};

export default function Home() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-64 w-[800px] h-[800px] bg-primary-light/5 rounded-full blur-[128px]" />
        <div className="absolute -bottom-32 -left-64 w-[800px] h-[800px] bg-accent-light/5 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/50">
        <div className="max-w-[1600px] mx-auto">
          {/* Market Indices Ticker */}
          <div className="px-6 py-2 border-b border-slate-800/50 overflow-hidden">
            <div className="flex items-center gap-6">
              {marketIndices.map((index) => (
                <div key={index.name} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-200">{index.name}</span>
                  <span className="text-sm text-slate-400">({index.fullName})</span>
                  <span className="text-sm font-medium text-slate-200">{index.price}</span>
                  <span className={`text-sm font-medium ${
                    index.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {index.change} ({index.changePercent})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Header */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="p-2 rounded-xl bg-primary-light/10 ring-1 ring-primary-light/20">
                  <BarChart2 className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">
                    Echorix
                    <span className="bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-transparent">
                      °
                    </span>
                  </h1>
                  <p className="text-sm text-slate-400">AI-Powered Market Intelligence</p>
                </div>
              </motion.div>

              {/* Search */}
              <div className="max-w-xl w-full mx-8">
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search stocks, markets, or ask AI assistant..."
                    className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-light/30"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary-light/10 text-primary-light text-sm rounded-lg hover:bg-primary-light/20 transition-colors"
                  >
                    Ask AI
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex items-center gap-6">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-200 hover:text-primary-light transition-colors">
                  <Globe className="w-4 h-4" />
                  Markets
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-200 hover:text-primary-light transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  Analysis
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-200 hover:text-primary-light transition-colors">
                  <DollarSign className="w-4 h-4" />
                  Trading
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* AI Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary-light/10 rounded-lg"
              >
                <Brain className="w-4 h-4 text-primary-light animate-pulse" />
                <span className="text-sm font-medium text-primary-light">AI Active</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <Signal className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-400">Processing {aiAnalysis.processedData}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-400">{aiAnalysis.activeModels} Models Active</span>
              </motion.div>
            </div>
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">Last Update: {aiAnalysis.lastUpdate}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg"
              >
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">{aiAnalysis.aiConfidence}% Confidence</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Chart and Market Data */}
          <div className="col-span-8 space-y-8">
            {/* Trading Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TradingChart />
            </motion.div>

            {/* Market Overview */}
            <div className="grid grid-cols-1 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MarketOverview />
              </motion.div>
            </div>

            {/* Market News and Trends */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="col-span-2"
              >
                <NewsFeed />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="col-span-2"
              >
                <MarketTrends />
              </motion.div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Market Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="h-[400px]"
            >
              <ChatContainer />
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AIInsights />
            </motion.div>

            {/* Hot Stocks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-slate-200">Today's Hot Stocks</h2>
                <button className="flex items-center gap-1 text-sm text-primary-light hover:text-primary-dark transition-colors">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {hotStocks.map((stock, index) => (
                  <motion.div
                    key={stock.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-primary-light/10"
                      >
                        <DollarSign className="w-4 h-4 text-primary-light" />
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-200">{stock.label}</span>
                          <span className={`text-sm ${
                            stock.trend === 'up' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {stock.change}
                          </span>
                        </div>
                        <div className="text-sm text-slate-400">
                          Vol: {stock.volume}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-slate-200">
                        ${stock.value.toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-400">
                        MCap: {stock.marketCap}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
