'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Clock,
  Tag,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  category: string;
  relatedSymbols: string[];
  commentCount: number;
}

const newsItems: NewsItem[] = [
  {
    title: 'Fed Signals Potential Rate Cuts in Coming Months',
    source: 'Financial Times',
    timestamp: '2 hours ago',
    sentiment: 'positive',
    impact: 'high',
    category: 'Monetary Policy',
    relatedSymbols: ['SPY', 'QQQ', 'IWM'],
    commentCount: 156
  },
  {
    title: 'Apple Unveils New AI Strategy, Stock Surges',
    source: 'Bloomberg',
    timestamp: '4 hours ago',
    sentiment: 'positive',
    impact: 'high',
    category: 'Technology',
    relatedSymbols: ['AAPL', 'MSFT', 'NVDA'],
    commentCount: 243
  },
  {
    title: 'Oil Prices Drop Amid Global Supply Concerns',
    source: 'Reuters',
    timestamp: '6 hours ago',
    sentiment: 'negative',
    impact: 'medium',
    category: 'Commodities',
    relatedSymbols: ['USO', 'XLE', 'CVX'],
    commentCount: 89
  }
];

export function NewsFeed() {
  const [hoveredNews, setHoveredNews] = useState<number | null>(null);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-primary-light" />
            <h2 className="text-lg font-medium text-slate-200">Market News</h2>
          </div>
          <button className="flex items-center gap-1 text-sm text-primary-light hover:text-primary-dark transition-colors">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* News List */}
      <div className="p-4">
        <div className="space-y-4">
          {newsItems.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredNews(index)}
              onHoverEnd={() => setHoveredNews(null)}
              className="group relative p-4 bg-slate-900/30 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all cursor-pointer"
            >
              {/* News Content */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-slate-200 font-medium leading-tight group-hover:text-primary-light transition-colors">
                    {news.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: hoveredNews === index ? 45 : 0 }}
                    className="flex-shrink-0 p-1 rounded-lg bg-slate-800/50 group-hover:bg-primary-light/10"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary-light" />
                  </motion.div>
                </div>

                {/* News Metadata */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400">{news.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400">{news.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400">{news.commentCount}</span>
                  </div>
                </div>

                {/* Impact and Sentiment */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Source:</span>
                    <span className="text-sm font-medium text-slate-300">{news.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      news.impact === 'high' ? 'bg-red-500/10 text-red-400' :
                      news.impact === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {news.impact.toUpperCase()} Impact
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      news.sentiment === 'positive' ? 'bg-green-500/10 text-green-400' :
                      news.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {news.sentiment === 'positive' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : news.sentiment === 'negative' ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : null}
                      {news.sentiment.charAt(0).toUpperCase() + news.sentiment.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Related Symbols */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Related:</span>
                  <div className="flex items-center gap-2">
                    {news.relatedSymbols.map((symbol) => (
                      <span
                        key={symbol}
                        className="px-2 py-1 text-xs font-medium bg-slate-800/50 text-slate-300 rounded-lg"
                      >
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredNews === index ? 1 : 0,
                  scale: hoveredNews === index ? 1 : 0.95
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary-light/5 to-transparent rounded-xl pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 