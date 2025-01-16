'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Bot, AlertCircle } from 'lucide-react';
import type { MessageProps } from '@/types/chat';

export function Message({ message, isLatest }: MessageProps) {
  const isUser = message.type === 'user';
  
  const getMessageIcon = () => {
    switch (message.type) {
      case 'user':
        return <MessageCircle className="w-5 h-5" />;
      case 'system':
        return <Bot className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getMessageStyles = () => {
    const baseStyles = 'rounded-lg p-4 flex gap-3 max-w-[85%]';
    
    switch (message.type) {
      case 'user':
        return `${baseStyles} bg-primary-light text-white ml-auto`;
      case 'system':
        return `${baseStyles} bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800`;
      case 'error':
        return `${baseStyles} bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400`;
      default:
        return baseStyles;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={getMessageStyles()}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        {getMessageIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {message.content}
        </motion.div>

        {/* Metadata */}
        {message.metadata && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm opacity-80"
          >
            {message.metadata.stockSymbol && (
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-black/5 dark:bg-white/5 text-xs">
                ${message.metadata.stockSymbol}
              </span>
            )}
          </motion.div>
        )}

        {/* Timestamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.3 }}
          className="mt-1 text-xs opacity-60"
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </motion.div>
      </div>
    </motion.div>
  );
} 