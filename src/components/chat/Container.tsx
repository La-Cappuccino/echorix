'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles, 
  ChevronDown,
  LineChart,
  CandlestickChart,
  TrendingUp,
  ArrowRight,
  BarChart2,
  Search,
  Clock,
  DollarSign
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

interface ChartData {
  label: string;
  value: number;
  change: string;
  trend: 'up' | 'down';
  volume: string;
  marketCap: string;
}

const marketData: ChartData[] = [
  { 
    label: 'AAPL', 
    value: 178.32, 
    change: '+2.45%', 
    trend: 'up',
    volume: '52.3M',
    marketCap: '2.84T'
  },
  { 
    label: 'TSLA', 
    value: 238.45, 
    change: '-1.23%', 
    trend: 'down',
    volume: '38.1M',
    marketCap: '756.2B'
  },
  { 
    label: 'MSFT', 
    value: 378.92, 
    change: '+1.78%', 
    trend: 'up',
    volume: '45.7M',
    marketCap: '2.12T'
  },
  { 
    label: 'NVDA', 
    value: 721.28, 
    change: '+3.12%', 
    trend: 'up',
    volume: '32.9M',
    marketCap: '1.78T'
  },
];

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI market analysis assistant. Ask me anything about stocks, market trends, or financial insights.',
      type: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedChart, setSelectedChart] = useState<'candlestick' | 'line' | 'volume'>('candlestick');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'m analyzing the market data for your query. This is a placeholder response while we implement the actual AI integration.',
        type: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-light/10 ring-1 ring-primary-light/20">
              <Bot className="w-5 h-5 text-primary-light" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-slate-200 flex items-center gap-2">
                Market Assistant
                <Sparkles className="w-4 h-4 text-primary-light animate-pulse" />
              </h2>
              <p className="text-sm text-slate-400">Ask me anything about markets</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
        >
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-start gap-4 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`shrink-0 p-2 rounded-xl ${
                    message.type === 'user' 
                      ? 'bg-primary-light/10 ring-1 ring-primary-light/20' 
                      : 'bg-slate-700/50 ring-1 ring-slate-600/50'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-primary-light" />
                  ) : (
                    <Bot className="w-5 h-5 text-slate-300" />
                  )}
                </motion.div>
                <div className={`flex-1 ${
                  message.type === 'user' ? 'text-right' : ''
                }`}>
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`inline-block max-w-[85%] px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary-light text-white ml-auto shadow-lg shadow-primary-light/10'
                        : 'bg-slate-700/50 text-slate-200 shadow-lg shadow-slate-900/20'
                    }`}
                  >
                    {message.content}
                  </motion.div>
                  <div className="text-xs text-slate-500 mt-2 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 p-2 rounded-xl bg-slate-700/50 ring-1 ring-slate-600/50">
                  <Bot className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-4 py-3 rounded-2xl bg-slate-700/50 shadow-lg">
                    <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToBottom}
              className="absolute right-6 bottom-24 p-2 rounded-full bg-primary-light text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/90 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about market trends, stocks, or analysis..."
              className="flex-1 px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-light/30"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`px-4 rounded-xl shadow-lg ${
                input.trim() && !isLoading
                  ? 'bg-primary-light hover:bg-primary-dark text-white ring-1 ring-primary-light/50'
                  : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
              } transition-all duration-200 hover:scale-105 active:scale-95`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 