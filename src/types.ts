export type User = 'Facu' | 'Rocío';

export interface ReplyTo {
  id: string;
  sender: User;
  content: string;
  type: string;
}

export interface Reaction {
  emoji: string;
  user: User;
}

export interface Message {
  id: string;
  sender: User;
  type: 'text' | 'sticker' | 'drawing' | 'image' | 'video' | 'audio';
  content: string; // text content, or base64 data-url
  timestamp: number;
  fileName?: string;
  duration?: number; // for audio notes
  isChunked?: boolean;
  totalChunks?: number;
  seen?: boolean;
  replyTo?: ReplyTo;
  reactions?: Reaction[];
  status?: 'sending' | 'sent' | 'delivered' | 'seen';
}

export interface Sticker {
  id: string;
  emoji: string;
  label: string;
}

export interface StickerCategory {
  id: string;
  name: string;
  icon: string;
  stickers: Sticker[];
}
