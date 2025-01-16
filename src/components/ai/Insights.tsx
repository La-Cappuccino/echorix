'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain,
  Cpu,
  Network,
  Zap,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Activity,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Users,
  MessageSquare
} from 'lucide-react';

interface AIMetric {
  label: string;
  value: number;
  change: number;
  status: 'positive' | 'negative' | 'neutral';
  icon: any;
}

interface AIPrediction {
  symbol: string;
  prediction: string;
  confidence: number;
  timeframe: string;
  impact: 'high' | 'medium' | 'low';
}

interface SentimentMetric {
  label: string;
  value: number;
  change: number;
  icon: any;
}

interface SentimentSource {
  name: string;
  sentiment: number;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  trend: 'rising' | 'falling' | 'stable';
  count: number;
  keywords?: string[];
}

interface MarketMood {
  primary: string;
  secondary: string;
  intensity: number;
  triggers: string[];
  timeframe: string;
  reliability: number;
}

const generateMetrics = (): AIMetric[] => [
  {
    label: 'Market Sentiment',
    value: Math.floor(Math.random() * 100),
    change: +(Math.random() * 10 - 5).toFixed(2),
    status: Math.random() > 0.5 ? 'positive' : 'negative',
    icon: Brain
  },
  {
    label: 'AI Confidence',
    value: Math.floor(Math.random() * 100),
    change: +(Math.random() * 10 - 5).toFixed(2),
    status: Math.random() > 0.5 ? 'positive' : 'negative',
    icon: Cpu
  },
  {
    label: 'Network Activity',
    value: Math.floor(Math.random() * 100),
    change: +(Math.random() * 10 - 5).toFixed(2),
    status: Math.random() > 0.5 ? 'positive' : 'negative',
    icon: Network
  },
  {
    label: 'Risk Level',
    value: Math.floor(Math.random() * 100),
    change: +(Math.random() * 10 - 5).toFixed(2),
    status: Math.random() > 0.5 ? 'positive' : 'negative',
    icon: AlertTriangle
  }
];

const generatePredictions = (): AIPrediction[] => [
  {
    symbol: 'AAPL',
    prediction: 'Strong Buy',
    confidence: 89,
    timeframe: '1D',
    impact: 'high'
  },
  {
    symbol: 'TSLA',
    prediction: 'Hold',
    confidence: 75,
    timeframe: '4H',
    impact: 'medium'
  },
  {
    symbol: 'MSFT',
    prediction: 'Sell',
    confidence: 82,
    timeframe: '1W',
    impact: 'high'
  }
];

const sentimentMetrics: SentimentMetric[] = [
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

const sentimentSources: SentimentSource[] = [
  {
    name: 'Social Media',
    sentiment: 72,
    confidence: 85,
    impact: 'high',
    trend: 'rising',
    count: 15420,
    keywords: ['bullish', 'breakout', 'support']
  },
  {
    name: 'News Articles',
    sentiment: 65,
    confidence: 92,
    impact: 'high',
    trend: 'stable',
    count: 284,
    keywords: ['earnings', 'growth', 'expansion']
  },
  {
    name: 'Financial Reports',
    sentiment: 68,
    confidence: 95,
    impact: 'high',
    trend: 'rising',
    count: 42,
    keywords: ['revenue', 'profit', 'guidance']
  },
  {
    name: 'Expert Analysis',
    sentiment: 70,
    confidence: 88,
    impact: 'medium',
    trend: 'rising',
    count: 156,
    keywords: ['technical', 'fundamental', 'valuation']
  }
];

const marketMood: MarketMood = {
  primary: 'Optimistic',
  secondary: 'Cautiously Bullish',
  intensity: 75,
  triggers: [
    'Strong earnings reports',
    'Technical breakout signals',
    'Positive analyst coverage',
    'Increasing institutional interest'
  ],
  timeframe: '24h',
  reliability: 88
};

export function AIInsights() {
  const [metrics, setMetrics] = useState<AIMetric[]>(generateMetrics());
  const [predictions, setPredictions] = useState<AIPrediction[]>(generatePredictions());
  const [activeTab, setActiveTab] = useState<'metrics' | 'predictions' | 'sentiment'>('metrics');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setMetrics(generateMetrics());
        setPredictions(generatePredictions());
        setIsProcessing(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-light" />
            <h2 className="text-lg font-medium text-slate-200">AI Insights</h2>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={isProcessing ? { opacity: 1 } : { opacity: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-light/10 rounded-lg"
            >
              <Cpu className="w-4 h-4 text-primary-light" />
              <span className="text-sm font-medium text-primary-light">
                {isProcessing ? 'Processing...' : 'Ready'}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mt-4">
          {['metrics', 'predictions', 'sentiment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab ? 'text-slate-200' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-primary-light"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'metrics' ? (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-4"
            >
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  className="p-4 bg-slate-900/30 rounded-xl border border-slate-700/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">{metric.label}</span>
                    </div>
                    <motion.div
                      key={metric.value}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        metric.status === 'positive' ? 'bg-green-500/10 text-green-400' :
                        metric.status === 'negative' ? 'bg-red-500/10 text-red-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}
                    >
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </motion.div>
                  </div>
                  <motion.div
                    key={metric.value}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    className="h-2 bg-primary-light/20 rounded-full overflow-hidden mb-2"
                  >
                    <motion.div
                      className="h-full bg-primary-light"
                      style={{ width: `${metric.value}%` }}
                    />
                  </motion.div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Value</span>
                    <span className="text-slate-200 font-medium">{metric.value}%</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : activeTab === 'predictions' ? (
            <motion.div
              key="predictions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {predictions.map((prediction, index) => (
                <motion.div
                  key={prediction.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  className="p-4 bg-slate-900/30 rounded-xl border border-slate-700/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-light/10">
                        {prediction.prediction.includes('Buy') ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : prediction.prediction.includes('Sell') ? (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        ) : (
                          <Activity className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-200">{prediction.symbol}</span>
                          <span className={`text-sm ${
                            prediction.prediction.includes('Buy') ? 'text-green-400' :
                            prediction.prediction.includes('Sell') ? 'text-red-400' :
                            'text-blue-400'
                          }`}>
                            {prediction.prediction}
                          </span>
                        </div>
                        <div className="text-sm text-slate-400">
                          Timeframe: {prediction.timeframe}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-200">
                        {prediction.confidence}% Confidence
                      </div>
                      <div className={`text-xs ${
                        prediction.impact === 'high' ? 'text-red-400' :
                        prediction.impact === 'medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {prediction.impact.toUpperCase()} Impact
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.confidence}%` }}
                    className={`h-1 rounded-full ${
                      prediction.prediction.includes('Buy') ? 'bg-green-400' :
                      prediction.prediction.includes('Sell') ? 'bg-red-400' :
                      'bg-blue-400'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="sentiment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Market Mood Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-800/50 rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Market Mood</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Reliability:</span>
                    <span className="text-sm font-medium text-green-400">{marketMood.reliability}%</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-medium">{marketMood.primary}</span>
                      <span className="text-sm text-slate-400">{marketMood.timeframe}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${marketMood.intensity}%` }}
                        className="h-full bg-blue-500"
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 mt-1">{marketMood.secondary}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Key Triggers:</span>
                  <div className="flex flex-wrap gap-2">
                    {marketMood.triggers.map((trigger, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-slate-700/50 rounded-full text-slate-300"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Sentiment Sources */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sentiment Sources</h3>
                <div className="grid gap-4">
                  {sentimentSources.map((source) => (
                    <motion.div
                      key={source.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-slate-800/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{source.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            source.trend === 'rising' ? 'bg-green-500/10 text-green-400' :
                            source.trend === 'falling' ? 'bg-red-500/10 text-red-400' :
                            'bg-blue-500/10 text-blue-400'
                          }`}>
                            {source.trend}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400">Confidence:</span>
                          <span className="text-sm font-medium">{source.confidence}%</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-400">Sentiment Score</span>
                            <span className="text-sm font-medium">{source.sentiment}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${source.sentiment}%` }}
                              className={`h-full ${
                                source.sentiment >= 70 ? 'bg-green-500' :
                                source.sentiment >= 50 ? 'bg-blue-500' :
                                'bg-red-500'
                              }`}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        {source.keywords && (
                          <div className="flex flex-wrap gap-2">
                            {source.keywords.map((keyword, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-slate-700/50 rounded-full text-slate-300"
                              >
                                #{keyword}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <span>Impact: {source.impact}</span>
                          <span>{source.count.toLocaleString()} data points</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 