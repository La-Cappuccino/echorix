'use client';

import { motion } from 'framer-motion';
import { Message } from './Message';
import type { Message as MessageType } from '@/types/chat';

interface MessageListProps {
  messages: MessageType[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <motion.div
      initial={false}
      className="space-y-4"
    >
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        >
          <Message 
            message={message} 
            isLatest={index === messages.length - 1} 
          />
        </motion.div>
      ))}
      
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 dark:text-gray-400 py-8"
        >
          <p className="text-sm">No messages yet. Start a conversation!</p>
        </motion.div>
      )}
    </motion.div>
  );
} 