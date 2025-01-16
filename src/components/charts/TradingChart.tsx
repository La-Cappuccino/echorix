'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CandlestickChart, 
  LineChart as LineIcon, 
  BarChart2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Clock,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Eye,
  Gauge,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Settings
} from 'lucide-react';

// Enhanced chart data with more metrics
interface ChartData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  vwap?: number;
  rsi?: number;
  macd?: {
    value: number;
    signal: number;
    histogram: number;
  };
  volatility?: number;
  supportLevels?: number[];
  resistanceLevels?: number[];
}

// Enhanced technical indicators
const indicators = [
  { 
    label: 'RSI', 
    value: 65.4, 
    status: 'neutral',
    description: 'Relative Strength Index',
    range: '30-70'
  },
  { 
    label: 'MACD', 
    value: 0.45, 
    status: 'bullish',
    description: 'Moving Average Convergence Divergence',
    signal: 0.32
  },
  { 
    label: 'BB Width', 
    value: '2.15', 
    status: 'high',
    description: 'Bollinger Bands Width',
    percentile: 85
  },
  { 
    label: 'Volume', 
    value: '1.2M', 
    status: 'above-avg',
    description: 'Trading Volume',
    change: '+45%'
  },
  { 
    label: 'OBV', 
    value: '2.8M', 
    status: 'bullish',
    description: 'On-Balance Volume',
    trend: 'up'
  },
  { 
    label: 'ATR', 
    value: '3.25', 
    status: 'high',
    description: 'Average True Range',
    percentile: 78
  }
];

// Moving averages
const movingAverages = [
  { period: 20, type: 'SMA', value: 182.45, trend: 'up' },
  { period: 50, type: 'EMA', value: 178.32, trend: 'up' },
  { period: 200, type: 'SMA', value: 165.78, trend: 'up' }
];

// Support/Resistance levels with confidence
const priceLevels = [
  { 
    label: 'Strong Support', 
    value: 178.50, 
    strength: 'strong',
    confidence: 92,
    type: 'support',
    touches: 5
  },
  { 
    label: 'Resistance', 
    value: 185.75, 
    strength: 'moderate',
    confidence: 85,
    type: 'resistance',
    touches: 3
  },
  { 
    label: 'Pivot Point', 
    value: 182.25, 
    type: 'pivot',
    timeframe: 'daily',
    reliability: 'high'
  }
];

// Enhanced chart insights with more detail
const chartInsights = [
  { 
    type: 'pattern', 
    label: 'Bullish Flag Formation', 
    confidence: 85,
    timeframe: '4H',
    priceTarget: 189.50,
    risk: 'moderate'
  },
  { 
    type: 'support', 
    label: 'Strong Support Zone', 
    price: '178.50-179.20',
    confidence: 92,
    strength: 'high',
    validation: 'Multiple tests'
  },
  { 
    type: 'volume', 
    label: 'Increasing Buy Volume', 
    trend: 'positive',
    significance: 'high',
    duration: '3 days',
    comparison: '+45% vs avg'
  },
  {
    type: 'divergence',
    label: 'Bullish RSI Divergence',
    confidence: 88,
    timeframe: '1D',
    significance: 'strong',
    pattern: 'Higher lows'
  }
];

// Add oscillator states
const oscillators = {
  rsi: {
    value: 65.4,
    state: 'neutral',
    trend: 'rising',
    zones: {
      overbought: 70,
      oversold: 30
    }
  },
  stochastic: {
    k: 75.5,
    d: 68.2,
    state: 'bullish',
    crossover: 'positive'
  },
  cci: {
    value: 125.4,
    state: 'overbought',
    trend: 'stable'
  }
};

// Simulated chart data
const generateChartData = (days: number) => {
  const data = [];
  let price = 100;
  
  for (let i = 0; i < days; i++) {
    const open = price;
    const high = open + Math.random() * 5;
    const low = open - Math.random() * 5;
    const close = low + Math.random() * (high - low);
    const volume = Math.floor(Math.random() * 1000000);
    
    data.push({
      timestamp: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000),
      open,
      high,
      low,
      close,
      volume
    });
    
    price = close;
  }
  
  return data;
};

const timeRanges = ['1H', '4H', '1D', '1W', '1M', '3M', '1Y', 'ALL'];

export function TradingChart() {
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'volume'>('candlestick');
  const [timeRange, setTimeRange] = useState('1D');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartData, setChartData] = useState(generateChartData(30));
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedIndicators, setSelectedIndicators] = useState(['RSI', 'Volume']);
  const [showInsights, setShowInsights] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const lastPrice = prev[prev.length - 1].close;
        const newPrice = lastPrice + (Math.random() - 0.5) * 2;
        return [...prev.slice(1), {
          timestamp: new Date(),
          open: lastPrice,
          high: Math.max(lastPrice, newPrice),
          low: Math.min(lastPrice, newPrice),
          close: newPrice,
          volume: Math.floor(Math.random() * 1000000)
        }];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-slate-800/50 border border-slate-700/50 rounded-2xl ${
      isFullscreen ? 'fixed inset-4 z-50' : 'w-full'
    }`}>
      {/* Chart Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Chart Type Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-900/50 rounded-lg">
              {[
                { type: 'candlestick', icon: CandlestickChart },
                { type: 'line', icon: LineIcon },
                { type: 'volume', icon: BarChart2 }
              ].map(({ type, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => setChartType(type as any)}
                  className={`p-2 rounded-lg transition-all ${
                    chartType === type 
                      ? 'bg-primary-light text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center gap-1">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                    timeRange === range
                      ? 'bg-primary-light/10 text-primary-light'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Chart Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-light/10 rounded-lg text-primary-light hover:bg-primary-light/20 transition-colors"
              onClick={() => setShowInsights(!showInsights)}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI Insights</span>
            </motion.button>
            <div className="h-6 w-px bg-slate-700/50" />
            <button
              onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.1))}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(z => Math.min(2, z + 0.1))}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(f => !f)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Technical Indicators Bar */}
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {indicators.map((indicator) => (
                <motion.div
                  key={indicator.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">{indicator.label}</span>
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        indicator.status === 'bullish' ? 'bg-green-500/10 text-green-400' :
                        indicator.status === 'bearish' ? 'bg-red-500/10 text-red-400' :
                        indicator.status === 'high' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}
                    >
                      {indicator.value}
                    </motion.span>
                  </div>
                  <span className="text-xs text-slate-500">{indicator.description}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-sm text-primary-light hover:text-primary-dark transition-colors">
                Add Indicator
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="h-6 w-px bg-slate-700/50" />
              <button className="flex items-center gap-1 text-sm text-primary-light hover:text-primary-dark transition-colors">
                Customize
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Moving Averages */}
          <div className="flex items-center gap-6 px-4 py-2 bg-slate-900/30 rounded-lg">
            <span className="text-sm text-slate-400">Moving Averages:</span>
            {movingAverages.map((ma) => (
              <div key={`${ma.period}${ma.type}`} className="flex items-center gap-2">
                <span className="text-sm text-slate-400">{ma.period} {ma.type}:</span>
                <span className={`text-sm font-medium ${
                  ma.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${ma.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative p-4">
        <div className="aspect-[16/9] bg-slate-900/30 rounded-xl p-4 ring-1 ring-slate-700/30">
          {/* Price Scale */}
          <div className="absolute left-6 top-8 bottom-8 w-16 border-r border-slate-700/50">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 flex items-center justify-between"
                style={{ top: `${i * 20}%` }}
              >
                <span className="text-xs text-slate-400">
                  ${(200 - i * 20).toFixed(2)}
                </span>
                <span className="w-1 h-px bg-slate-700/50" />
              </div>
            ))}
          </div>

          {/* Time Scale */}
          <div className="absolute left-24 right-8 bottom-4 h-6 border-t border-slate-700/50">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 flex flex-col items-center"
                style={{ left: `${i * 20}%` }}
              >
                <span className="w-px h-1 bg-slate-700/50" />
                <span className="mt-1 text-xs text-slate-400">
                  {new Date(Date.now() - (5 - i) * 4 * 60 * 60 * 1000).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
          </div>

          {/* Chart Content */}
          <div className="relative h-full">
            {/* Placeholder for actual chart implementation */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              Interactive chart visualization coming soon...
            </div>

            {/* Price Levels */}
            <div className="absolute right-4 top-8 bottom-8 w-32 flex flex-col justify-between pointer-events-none">
              {priceLevels.map((level, index) => (
                <motion.div
                  key={level.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className={`h-px flex-1 ${
                    level.strength === 'strong' ? 'bg-primary-light' :
                    level.strength === 'moderate' ? 'bg-blue-400' :
                    'bg-slate-500'
                  }`} />
                  <div className="text-xs">
                    <div className="text-slate-400">{level.label}</div>
                    <div className="text-slate-200 font-medium">${level.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Insights Panel */}
            <AnimatePresence>
              {showInsights && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute left-4 top-4 w-64 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700/50 p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary-light" />
                      <span className="text-sm font-medium text-slate-200">AI Analysis</span>
                    </div>
                    <Eye className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    {chartInsights.map((insight, index) => (
                      <motion.div
                        key={insight.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/50"
                      >
                        {insight.type === 'pattern' ? (
                          <TrendingUp className="w-4 h-4 text-green-400 mt-0.5" />
                        ) : insight.type === 'support' ? (
                          <Gauge className="w-4 h-4 text-blue-400 mt-0.5" />
                        ) : (
                          <BarChart2 className="w-4 h-4 text-purple-400 mt-0.5" />
                        )}
                        <div>
                          <div className="text-sm text-slate-200">{insight.label}</div>
                          <div className="text-xs text-slate-400">
                            {insight.confidence ? `${insight.confidence}% Confidence` :
                             insight.price ? `Range: ${insight.price}` :
                             insight.trend === 'positive' ? 'Bullish Signal' : 'Bearish Signal'}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced Chart Info */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Last Update: Just now</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Period: {timeRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">High Volume Alert</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Zoom:</span>
              <span className="text-slate-200">{(zoomLevel * 100).toFixed(0)}%</span>
            </div>
            <button className="flex items-center gap-1 text-primary-light hover:text-primary-dark transition-colors">
              More Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 