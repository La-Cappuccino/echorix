export type MessageType = 'user' | 'system' | 'error' | 'loading' | 'market';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  stockSymbol?: string;
  priceChange?: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
  chartData?: any; // TODO: Define proper chart data type
  links?: string[];
  reactions?: MessageReaction[];
}

export interface MessageReaction {
  type: string;
  count: number;
  users: string[];
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
}

export interface InputProps {
  onSendMessage: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface MessageProps {
  message: Message;
  isLatest?: boolean;
} 