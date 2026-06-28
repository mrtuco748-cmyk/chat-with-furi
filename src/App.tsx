import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from './types';
import UserSelector from './components/UserSelector';
import EmojiPicker from './components/EmojiPicker';
import StickerPicker from './components/StickerPicker';
import DrawingCanvas from './components/DrawingCanvas';
import Lightbox from './components/Lightbox';
import { fetchMessages, sendMessage, markAsSeen, deleteMessage, clearMessages, fetchChunks, updatePresence, sendTyping, addReaction, removeReaction } from './lib/api';
import { Smile, Paperclip, Camera, Mic, Send, Check, Trash2, LogOut, Image as ImageIcon, Video, Palette, Bell, BellOff, MoreVertical, ArrowUp } from 'lucide-react';


// --- Helper for formatted timestamps ---
function formatMessageTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  const today = new Date();
  const isSameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isSameDay) {
    return timeStr;
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month} ${timeStr}`;
  }
}

// --- Custom Audio Message Player Component ---
function AudioBubblePlayer({ src, duration }: { src: string; duration: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    audio.onended = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };

    return () => {
      audio.pause();
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      progressIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          const current = audioRef.current.currentTime;
          const dur = audioRef.current.duration || duration || 1;
          setCurrentTime(current);
          setProgress((current / dur) * 100);
        }
      }, 100);
    }
  };

  const formatSecs = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 p-2 min-w-36 max-w-full">
      <button
        type="button"
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 flex items-center justify-center transition-all active:scale-95 shrink-0"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="ml-0.5"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-end gap-0.5 h-6 py-0.5">
          {Array.from({ length: 16 }).map((_, i) => {
            const baseHeights = [3, 5, 2, 7, 4, 8, 3, 6, 2, 8, 4, 7, 3, 5, 2, 4];
            const height = baseHeights[i % baseHeights.length];
            return (
              <span
                key={i}
                className="w-0.5 bg-gray-400 dark:bg-gray-500 rounded-full transition-all duration-150"
                style={{
                  height: `${height * 3}px`,
                  transform: isPlaying ? `scaleY(${1 + Math.random() * 0.4})` : 'scaleY(1)',
                  opacity: isPlaying && Math.random() > 0.3 ? 1 : 0.4,
                }}
              />
            );
          })}
        </div>
        
        {/* Progress slide indicator and duration details */}
        <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium">
          <span>{formatSecs(isPlaying ? currentTime : 0)}</span>
          <span>{formatSecs(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [serverStatus, setServerStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  
  // UI states
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showStickerPicker, setShowStickerPicker] = useState<boolean>(false);
  const [showDrawingCanvas, setShowDrawingCanvas] = useState<boolean>(false);
  // voice recording now uses press-and-hold via the mic button
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; sender: string; timestamp: string } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  // New states for WhatsApp features
  const [otherUserOnline, setOtherUserOnline] = useState<boolean>(false);
  const [otherUserTyping, setOtherUserTyping] = useState<boolean>(false);
  const [replyToMsg, setReplyToMsg] = useState<Message | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('amor_chat_dark_mode');
    if (saved === null) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return saved === 'true';
  });
  const [showAttachmentMenu, setShowAttachmentMenu] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('amor_chat_notifications');
    return saved === null ? true : saved === 'true';
  });

  // Track app mount time to distinguish genuinely new messages for notifications
  const appStartTimeRef = useRef<number>(Date.now());

  // Hidden file triggers
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const genericInputRef = useRef<HTMLInputElement | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const ARCHIVED_KEY = 'amor_chat_archived';
  const archivedRef = useRef<Message[]>([]);

  // Load user session on mount, load local cache
  useEffect(() => {
    // Check sessionStorage first (to isolate multiple tabs on the same computer)
    const savedSessionUser = sessionStorage.getItem('amor_chat_current_user');
    const savedLocalUser = localStorage.getItem('amor_chat_current_user');
    const savedUser = savedSessionUser || savedLocalUser;

    if (savedUser === 'Facu' || savedUser === 'Rocío') {
      setCurrentUser(savedUser as User);
      if (!savedSessionUser) {
        sessionStorage.setItem('amor_chat_current_user', savedUser);
      }
    }

    const savedMsgs = localStorage.getItem('amor_chat_messages');
    if (savedMsgs) {
      try {
        setMessages(JSON.parse(savedMsgs));
      } catch (e) {
        console.error('Error loading local messages:', e);
      }
    }

    const savedArchive = localStorage.getItem(ARCHIVED_KEY);
    if (savedArchive) {
      try {
        const parsed = JSON.parse(savedArchive);
        archivedRef.current = parsed;
      } catch (e) {
        console.error('Error loading archived messages:', e);
      }
    }
  }, []);

  // Keep track of which message IDs we've already notified to prevent double-alerts
  const notifiedMessageIdsRef = useRef<Set<string>>(new Set());

  // Sweet retro-cute chime synthesizer using Web Audio API
  const playNotificationChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.3);

      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1320, ctx.currentTime); // E6 note
        gain2.gain.setValueAtTime(0.12, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.35);
      }, 70);
    } catch (e) {
      console.warn('AudioContext notification beep failed:', e);
    }
  };

  // Establish real-time connection via REST API + SSE
  useEffect(() => {
    if (!currentUser) return;

    setServerStatus('connecting');

    // Helper to process a batch of messages (archive + merge)
    const processMessages = (msgs: Message[]): Message[] => {
      const currentArchive = archivedRef.current || [];
      let newArchive = [...currentArchive];
      let archiveChanged = false;

      msgs.forEach(msg => {
        if (msg.seen && !currentArchive.some(a => a.id === msg.id)) {
          newArchive.push(msg);
          archiveChanged = true;
        }
      });

      if (archiveChanged) {
        newArchive = newArchive.filter(
          (msg, idx, self) => self.findIndex(m => m.id === msg.id) === idx
        );
        localStorage.setItem(ARCHIVED_KEY, JSON.stringify(newArchive));
        archivedRef.current = newArchive;
      }

      const seenMsgs = msgs.filter(m => m.seen);
      if (seenMsgs.length > 0) {
        setTimeout(() => {
          seenMsgs.forEach(msg => deleteMessage(msg.id).catch(() => {}));
        }, 3000);
      }

      return [...newArchive, ...msgs]
        .sort((a, b) => a.timestamp - b.timestamp)
        .filter((msg, idx, self) => self.findIndex(m => m.id === msg.id) === idx);
    };

    // Fetch initial messages
    fetchMessages()
      .then((msgs) => {
        setServerStatus('connected');

        const loadedMessages: Message[] = msgs.map((d) => ({
          id: d.id,
          sender: d.sender,
          type: d.type,
          content: d.content,
          timestamp: d.timestamp,
          fileName: d.fileName || undefined,
          duration: d.duration || undefined,
          isChunked: d.isChunked || false,
          totalChunks: d.totalChunks || undefined,
          seen: d.seen || false
        }));

        // Handle chunked messages
        loadedMessages.forEach((msg) => {
          if (msg.content === '__chunked__' && msg.isChunked && msg.totalChunks) {
            const cached = sessionStorage.getItem(`chunk_cache_${msg.id}`);
            if (cached) {
              msg.content = cached;
            } else {
              fetchChunks(msg.id)
                .then((chunks) => {
                  const fullContent = chunks.map(c => c.data).join('');
                  sessionStorage.setItem(`chunk_cache_${msg.id}`, fullContent);
                  setMessages((prev) =>
                    prev.map((m) => m.id === msg.id ? { ...m, content: fullContent } : m)
                  );
                })
                .catch((err) => console.error(`Error loading chunks for message ${msg.id}:`, err));
            }
          }
        });

        // Mark unread messages from other user as seen
        loadedMessages.filter(m => m.sender !== currentUser && !m.seen).forEach(m => {
          markAsSeen(m.id).catch(() => {});
        });

        // Notifications for messages received while offline
        loadedMessages.forEach((msg) => {
          if (
            msg.sender !== currentUser &&
            msg.timestamp > appStartTimeRef.current &&
            !notifiedMessageIdsRef.current.has(msg.id)
          ) {
            notifiedMessageIdsRef.current.add(msg.id);
            if (notificationsEnabled) {
              playNotificationChime();
              if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
                const title = `Mensaje de ${msg.sender} 🌸`;
                const body = msg.type === 'text' ? msg.content : msg.type === 'sticker' ? `Te envió un sticker: ${msg.content}` : `Te envió un ${msg.type}`;
                new Notification(title, { body, tag: 'amor-chat-notification', renotify: true } as any);
              }
            }
          }
        });

        const merged = processMessages(loadedMessages);
        setMessages(merged);
        localStorage.setItem('amor_chat_messages', JSON.stringify(merged));
      })
      .catch(() => setServerStatus('error'));

    // Connect SSE for real-time updates
    const eventSource = new EventSource('/api/messages/live');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'connected') {
          setServerStatus('connected');
          return;
        }
        if (data.type === 'heartbeat' || !data.type) return;

        switch (data.type) {
          case 'message_new': {
            setMessages(prev => {
              if (prev.some(m => m.id === data.message.id)) return prev;
              const newMsg: Message = {
                id: data.message.id,
                sender: data.message.sender,
                type: data.message.type,
                content: data.message.content,
                timestamp: data.message.timestamp,
                fileName: data.message.fileName || undefined,
                duration: data.message.duration || undefined,
                isChunked: data.message.isChunked || false,
                totalChunks: data.message.totalChunks || undefined,
                seen: data.message.seen || false,
              };
              if (newMsg.content === '__chunked__' && newMsg.isChunked && newMsg.totalChunks) {
                const cached = sessionStorage.getItem(`chunk_cache_${newMsg.id}`);
                if (cached) {
                  newMsg.content = cached;
                } else {
                  fetchChunks(newMsg.id)
                    .then((chunks) => {
                      const fullContent = chunks.map(c => c.data).join('');
                      sessionStorage.setItem(`chunk_cache_${newMsg.id}`, fullContent);
                      setMessages(p => p.map(m => m.id === newMsg.id ? { ...m, content: fullContent } : m));
                    })
                    .catch(() => {});
                }
              }
              return [...prev, newMsg];
            });

            if (data.message.sender !== currentUser && data.message.timestamp > appStartTimeRef.current) {
              notifiedMessageIdsRef.current.add(data.message.id);
              if (notificationsEnabled) {
                playNotificationChime();
                if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
                  const title = `Mensaje de ${data.message.sender} 🌸`;
                  const body = data.message.type === 'text' ? data.message.content : `Te envió un ${data.message.type}`;
                  new Notification(title, { body, tag: 'amor-chat-notification', renotify: true } as any);
                }
              }
              if (!data.message.seen) {
                markAsSeen(data.message.id).catch(() => {});
              }
            }
            break;
          }

          case 'message_seen': {
            setMessages(prev => {
              const updated = prev.map(m =>
                m.id === data.messageId ? { ...m, seen: true } : m
              );
              const merged = processMessages(updated);
              localStorage.setItem('amor_chat_messages', JSON.stringify(merged));
              return merged;
            });
            break;
          }

          case 'message_delete': {
            setMessages(prev => {
              const isArchived = archivedRef.current.some(a => a.id === data.messageId);
              if (isArchived) return prev;
              return prev.filter(m => m.id !== data.messageId);
            });
            break;
          }

          case 'clear_event': {
            setMessages([]);
            localStorage.setItem('amor_chat_messages', JSON.stringify([]));
            localStorage.removeItem(ARCHIVED_KEY);
            archivedRef.current = [];
            break;
          }

          case 'typing': {
            if (data.user !== currentUser) {
              setOtherUserTyping(data.typing);
              if (data.typing) {
                setTimeout(() => setOtherUserTyping(false), 3000);
              }
            }
            break;
          }

          case 'message_update': {
            setMessages(prev => prev.map(m => m.id === data.message.id ? { ...m, ...data.message } : m));
            break;
          }

          case 'presence': {
            if (data.user !== currentUser) {
              setOtherUserOnline(data.online);
            }
            break;
          }
        }
      } catch (e) {
        // ignore parse errors
      }
    };

    eventSource.onerror = () => {
      setServerStatus('error');
    };

    return () => {
      eventSource.close();
    };
  }, [currentUser, notificationsEnabled]);

  // Request notification permissions when currentUser loads
  useEffect(() => {
    if (currentUser && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [currentUser]);

  // Keep presence alive via heartbeat to server API
  useEffect(() => {
    if (!currentUser) return;

    const sendOnline = (online: boolean) => {
      updatePresence(currentUser, online).catch(() => {});
    };

    sendOnline(true);

    const heartbeat = setInterval(() => {
      sendOnline(true);
    }, 8000);

    const handleFocus = () => sendOnline(true);
    const handleBlur = () => sendOnline(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      clearInterval(heartbeat);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      sendOnline(false);
    };
  }, [currentUser]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('amor_chat_dark_mode', String(darkMode));
  }, [darkMode]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Adjust textarea height with content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  // Close popups on backdrop click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        showEmojiPicker && 
        !target.closest('#emoji-picker-container') && 
        !target.closest('#emoji-trigger-btn')
      ) {
        setShowEmojiPicker(false);
      }
      if (
        showStickerPicker && 
        !target.closest('#sticker-picker-container') && 
        !target.closest('#sticker-trigger-btn')
      ) {
        setShowStickerPicker(false);
      }
      if (
        showAttachmentMenu && 
        !target.closest('#attachment-menu-container') && 
        !target.closest('#attachment-trigger-btn')
      ) {
        setShowAttachmentMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showEmojiPicker, showStickerPicker, showAttachmentMenu]);

  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('amor_chat_current_user', user);
    localStorage.setItem('amor_chat_current_user', user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('amor_chat_current_user');
    localStorage.removeItem('amor_chat_current_user');
  };

  // Helper to persist messages to localStorage fallback cache
  const saveMessagesToLocalCache = (newMsgs: Message[]) => {
    try {
      localStorage.setItem('amor_chat_messages', JSON.stringify(newMsgs));
    } catch (e) {
      console.warn('Local storage size limit reached, relying purely on server database cache.');
    }
  };

  const handleSendMessage = async (type: Message['type'], content: string, extra: Partial<Message> = {}) => {
    if (!currentUser) return;
    if (type === 'text' && !content.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: currentUser,
      type,
      content,
      timestamp: Date.now(),
      ...extra,
      replyTo: replyToMsg ? { id: replyToMsg.id, sender: replyToMsg.sender, content: replyToMsg.content, type: replyToMsg.type } : undefined,
    };

    if (type === 'text') {
      setInputText('');
    }
    setReplyToMsg(null);

    // Optimistic Update: Render immediately on sender's device for 0ms lag perception
    setMessages((prev) => {
      if (prev.some((m) => m.id === newMsg.id)) return prev;
      const updated = [...prev, newMsg];
      saveMessagesToLocalCache(updated);
      return updated;
    });

    try {
      await sendMessage({
        id: newMsg.id,
        sender: newMsg.sender,
        type: newMsg.type,
        content: newMsg.content,
        timestamp: newMsg.timestamp,
        fileName: newMsg.fileName,
        duration: newMsg.duration,
        replyTo: newMsg.replyTo,
      });
    } catch (err) {
      console.error('Error transmitting message to server:', err);
    }
  };

  // Handle file uploads (converts file to Base64)
  const processAndSendFile = (file: File, type: Message['type'], extra: Partial<Message> = {}) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleSendMessage(type, reader.result, { fileName: file.name, ...extra });
      }
    };
    reader.onerror = () => {
      alert('Hubo un error al procesar el archivo. Intenta de nuevo. 🥺');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: Message['type']) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Guard rails for size
    const maxSizeMB = type === 'video' ? 12 : 6; // 12MB for video, 6MB for others
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`¡Amor! El archivo supera el límite recomendado de ${maxSizeMB}MB. Por favor envía un archivo más pequeño. 💕`);
      e.target.value = '';
      return;
    }

    processAndSendFile(file, type);
    e.target.value = ''; // reset trigger
  };

  const handleAudioFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('¡Amor! Los audios deben ser de menos de 5MB. 💕');
      e.target.value = '';
      return;
    }

    // Measure audio duration before sending
    const audioUrl = URL.createObjectURL(file);
    const audio = new Audio(audioUrl);
    audio.addEventListener('loadedmetadata', () => {
      const duration = Math.round(audio.duration) || 5;
      processAndSendFile(file, 'audio', { duration });
      URL.revokeObjectURL(audioUrl);
    });
    audio.addEventListener('error', () => {
      // fallback if metadata fails to load
      processAndSendFile(file, 'audio', { duration: 5 });
      URL.revokeObjectURL(audioUrl);
    });
    
    e.target.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage('text', inputText);
    }
  };

  const clearHistory = async () => {
    try {
      setMessages([]);
      localStorage.setItem('amor_chat_messages', JSON.stringify([]));
      localStorage.removeItem(ARCHIVED_KEY);
      archivedRef.current = [];
      setShowClearConfirm(false);

      // Clear chunk cache in sessionStorage
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith('chunk_cache_')) {
          sessionStorage.removeItem(key);
        }
      }

      await clearMessages();
    } catch (err) {
      console.error('Error clearing messages history:', err);
    }
  };

  const handleToggleReaction = async (messageId: string, emoji: string) => {
    if (!currentUser) return;
    const msg = messages.find(m => m.id === messageId);
    if (!msg) return;
    const existing = msg.reactions?.find(r => r.emoji === emoji && r.user === currentUser);
    if (existing) {
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, reactions: (m.reactions || []).filter(r => !(r.emoji === emoji && r.user === currentUser)) } : m));
      await removeReaction(messageId, emoji, currentUser);
    } else {
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, reactions: [...(m.reactions || []), { emoji, user: currentUser }] } : m));
      await addReaction(messageId, emoji, currentUser);
    }
  };

  // WhatsApp-style voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingLocked, setRecordingLocked] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartY = useRef<number>(0);

  const handleVoiceStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    recordingStartY.current = clientY;
    setRecordingLocked(false);
    setRecordingDuration(0);
    recordingChunksRef.current = [];

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (e) => { recordingChunksRef.current.push(e.data); };
      recorder.start();
      setIsRecording(true);

      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(d => d + 1);
      }, 1000);
    }).catch(() => {});
  };

  const handleVoiceMove = (e: React.TouchEvent) => {
    if (!isRecording) return;
    const y = e.touches[0].clientY;
    if (recordingStartY.current - y > 100) {
      setRecordingLocked(true);
    }
  };

  const handleVoiceEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!mediaRecorderRef.current || !isRecording) return;
    if (recordingLocked) {
      // Keep recording, show send UI
      return;
    }
    stopAndSendRecording();
  };

  const stopAndSendRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);

    recorder.onstop = () => {
      const blob = new Blob(recordingChunksRef.current, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string' && currentUser) {
          handleSendMessage('audio', reader.result, { duration: recordingDuration });
        }
      };
      reader.readAsDataURL(blob);
      recorder.stream?.getTracks().forEach(t => t.stop());
    };
    recorder.stop();
    setIsRecording(false);
    setRecordingLocked(false);
    setRecordingDuration(0);
  };

  const cancelRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder) {
      recorder.stream?.getTracks().forEach(t => t.stop());
      recorder.stop();
    }
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    setIsRecording(false);
    setRecordingLocked(false);
    setRecordingDuration(0);
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!currentUser) {
    return <UserSelector onSelectUser={handleSelectUser} />;
  }

  return (
    <div 
      id="app-chat-viewport"
      className="h-screen w-full bg-white dark:bg-black flex items-center justify-center p-0 md:p-4 select-none"
    >
      {/* Invisible HTML File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        id="image-picker-input"
        accept="image/*"
        onChange={(e) => handleFileInputChange(e, 'image')}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        id="video-picker-input"
        accept="video/*"
        onChange={(e) => handleFileInputChange(e, 'video')}
        className="hidden"
      />
      <input
        ref={audioInputRef}
        type="file"
        id="audio-picker-input"
        accept="audio/*, .mp3, .wav, .ogg"
        onChange={handleAudioFileInputChange}
        className="hidden"
      />
      <input
        ref={genericInputRef}
        type="file"
        id="generic-picker-input"
        accept="*"
        onChange={(e) => handleFileInputChange(e, 'image')} // generic fallback sends as image
        className="hidden"
      />

      {/* Main chat preview container */}
      <div 
        id="chat-frame-container"
        className="w-full h-full md:max-w-md md:h-[90vh] bg-white dark:bg-black rounded-none md:rounded-2xl shadow-lg border-0 overflow-hidden flex flex-col relative"
      >
        {/* Chat Header */}
        <div 
          id="chat-header"
          className="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 px-4 py-2.5 flex justify-between items-center shrink-0 z-20"
        >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold ${
                  currentUser === 'Facu' ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {currentUser === 'Facu' ? '🌸' : '👨‍💻'}
                </div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-black transition-all duration-300 ${
                  otherUserOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                }`} />
              </div>
 
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">
                    {currentUser === 'Facu' ? 'Rocío' : 'Facu'}
                  </span>
                  <span className={`text-[10px] font-medium ${
                    otherUserOnline ? 'text-green-500' : 'text-gray-400'
                  }`}>
                    {otherUserOnline ? 'en línea' : 'desconectado(a)'}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {otherUserTyping && (
                    <span className="text-[11px] text-pink-500 font-medium animate-pulse">escribiendo...</span>
                  )}
                </div>
              </div>
            </div>
 
          <div className="flex items-center gap-1.5">
            {/* Dark Mode Toggle */}
            <button
              type="button"
              id="dark-mode-toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-150 ${
                darkMode ? 'text-yellow-400 hover:bg-yellow-50/50' : 'text-gray-400 hover:bg-gray-100/50'
              }`}
              title={darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" className="transition-transform duration-300" style={{ transform: darkMode ? 'rotate(180deg)' : 'none' }}>
                {darkMode ? (
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
                ) : (
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                )}
              </svg>
            </button>

            {/* Notifications Toggle */}
            <button
              type="button"
              id="notifications-toggle-btn"
              onClick={() => {
                const nextState = !notificationsEnabled;
                setNotificationsEnabled(nextState);
                localStorage.setItem('amor_chat_notifications', String(nextState));
                if (nextState && 'Notification' in window && Notification.permission === 'default') {
                  Notification.requestPermission();
                }
              }}
              className={`p-2 rounded-full transition-colors duration-150 ${
                notificationsEnabled ? 'text-blue-500 hover:bg-blue-50/50' : 'text-gray-400 hover:bg-gray-100/50'
              }`}
              title={notificationsEnabled ? 'Silenciar Notificaciones' : 'Activar Notificaciones'}
            >
              {notificationsEnabled ? (
                <Bell className="w-[18px] h-[18px]" />
              ) : (
                <BellOff className="w-[18px] h-[18px]" />
              )}
            </button>

            {/* Clear history action */}
            <button
              type="button"
              id="clear-history-trigger"
              onClick={() => setShowClearConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-150"
              title="Borrar todo el historial"
            >
              <Trash2 className="w-[18px] h-[18px]" />
            </button>
 
            {/* Logout action */}
            <button
              type="button"
              id="logout-btn"
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-150"
              title="Cerrar sesión"
            >
              <LogOut className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Message Thread Body */}
        <div 
          id="chat-messages-container"
          className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 scrollbar-none select-text relative bg-gray-50 dark:bg-black"
        >
          {messages.length === 0 ? (
            <div id="no-messages-prompt" className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3">
              <span className="text-4xl animate-pulse">💌</span>
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">¡Aún no hay mensajes!</h4>
              <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs font-medium leading-relaxed">
                Escribe tu primer mensaje romántico, manda un sticker o haz un dibujo divertido para alegrar el día.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMe = msg.sender === currentUser;
              return (
                <div
                  key={msg.id}
                  id={`msg-bubble-${msg.id}`}
                  className={`flex gap-2 items-end max-w-[85%] animate-in slide-in-from-bottom-2 duration-200 ${
                    isMe ? 'self-end flex-row-reverse' : 'self-start flex-row'
                  }`}
                  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    const diff = e.changedTouches[0].clientX - touchStartX.current;
                    if (diff > 50) {
                      setReplyToMsg(msg);
                      textareaRef.current?.focus();
                    }
                  }}
                >
                  {/* Small avatar for bubbles */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 select-none ${
                    msg.sender === 'Facu' ? 'bg-orange-100 text-orange-600' : 'bg-pink-100 text-pink-600'
                  }`}>
                    {msg.sender === 'Facu' ? '👨‍💻' : '🌸'}
                  </div>

                  {/* Message Bubble box */}
                  <div className="group relative">
                    {/* Reaction picker on hover */}
                    <div className={`absolute ${isMe ? 'left-0 -translate-x-full pl-1' : 'right-0 translate-x-full pr-1'} top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5 bg-white/95 dark:bg-gray-800/95 rounded-full px-1.5 py-1 shadow-lg border border-gray-100 dark:border-gray-700 z-10 transition-opacity duration-150`}>
                      {['👍','❤️','😂','😮','😢'].map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleToggleReaction(msg.id, emoji)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-125 ${
                            msg.reactions?.some(r => r.emoji === emoji && r.user === currentUser)
                              ? 'scale-110'
                              : ''
                          }`}
                          title={emoji}
                        >
                          {emoji}
                        </button>
                      ))}
                      {/* Reply button */}
                      <span className="w-px h-4 bg-gray-200 dark:bg-gray-600 mx-0.5" />
                      <button
                        type="button"
                        onClick={() => {
                          setReplyToMsg(msg);
                          textareaRef.current?.focus();
                        }}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-125"
                        title="Responder"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                      </button>
                    </div>

                    <div 
                      className={`px-3.5 py-2 text-sm relative flex flex-col gap-1 min-w-16 ${
                        isMe
                          ? 'bg-[#3797f0] dark:bg-[#3797f0] text-white rounded-2xl rounded-br-md'
                          : 'bg-[#efefef] dark:bg-[#262626] text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-md'
                      }`}
                    >
                      {/* ReplyTo quote */}
                      {msg.replyTo && (
                        <div className={`flex flex-col gap-0.5 pb-1 mb-1 border-l-2 pl-2 text-[10px] ${
                          isMe ? 'border-white/50 text-white/80' : 'border-gray-300 text-gray-500'
                        }`}>
                          <span className="font-bold">{msg.replyTo.sender}</span>
                          <span className="truncate max-w-40">{msg.replyTo.content}</span>
                        </div>
                      )}

                      {/* Render by type */}
                      {msg.type === 'text' && (
                        <p className="break-words whitespace-pre-wrap select-text leading-relaxed text-left">
                          {msg.content}
                        </p>
                      )}

                      {msg.type === 'sticker' && (
                        <div className="py-1 text-center select-none">
                          <span className="text-6xl filter drop-shadow-sm inline-block transform hover:scale-105 transition-transform duration-200">
                            {msg.content}
                          </span>
                        </div>
                      )}

                      {msg.type === 'drawing' && (
                        <div className="relative rounded-xl overflow-hidden border border-black/5 bg-white shadow-inner max-w-full cursor-zoom-in">
                          <img
                            src={msg.content}
                            alt="Dibujo / Doodle"
                            onClick={() => setActiveLightbox({ src: msg.content, sender: msg.sender, timestamp: formatMessageTime(msg.timestamp) })}
                            className="max-w-44 object-contain max-h-44 hover:opacity-90 transition-opacity"
                          />
                        </div>
                      )}

                      {msg.type === 'image' && (
                        <div className="relative rounded-xl overflow-hidden border border-black/5 bg-white shadow-inner max-w-full cursor-zoom-in">
                          <img
                            src={msg.content}
                            alt="Foto"
                            onClick={() => setActiveLightbox({ src: msg.content, sender: msg.sender, timestamp: formatMessageTime(msg.timestamp) })}
                            className="max-w-44 object-contain max-h-44 hover:opacity-90 transition-opacity"
                          />
                        </div>
                      )}

                      {msg.type === 'video' && (
                        <div className="rounded-xl overflow-hidden border border-black/5 bg-black/90 shadow-inner max-w-full">
                          <video
                            src={msg.content}
                            controls
                            playsInline
                            className="max-w-44 max-h-44 object-contain"
                          />
                        </div>
                      )}

                      {msg.type === 'audio' && (
                        <AudioBubblePlayer src={msg.content} duration={msg.duration || 5} />
                      )}

                      {/* Timestamp overlay with WhatsApp ticks */}
                      <div className="flex items-center gap-1 self-end mt-0.5 select-none">
                      <span 
                        className={`text-[10px] font-medium opacity-70 ${
                          isMe ? 'text-white/80' : 'text-gray-400'
                        }`}
                      >
                        {formatMessageTime(msg.timestamp)}
                      </span>
                      {isMe && (
                        msg.seen ? (
                          <Check className="w-3 h-3 text-white/70 stroke-[2.5] shrink-0" title="Leído" />
                        ) : (
                          <Check className="w-3 h-3 text-white/40 stroke-[2.5] shrink-0" title="Entregado" />
                        )
                      )}
                      </div>

                      {/* Reactions display */}
                      {msg.reactions && msg.reactions.length > 0 && (
                        <div className={`flex flex-wrap gap-0.5 mt-0.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {['👍','❤️','😂','😮','😢'].map(emoji => {
                            const count = msg.reactions!.filter(r => r.emoji === emoji).length;
                            if (count === 0) return null;
                            return (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => handleToggleReaction(msg.id, emoji)}
                                className={`text-xs px-1.5 py-0.5 rounded-full border transition-all ${
                                  msg.reactions!.some(r => r.emoji === emoji && r.user === currentUser)
                                    ? isMe
                                      ? 'bg-white/20 border-white/30 text-white'
                                      : 'bg-pink-100/80 border-pink-200 text-gray-700'
                                    : isMe
                                      ? 'bg-white/10 border-white/20 text-white/70'
                                      : 'bg-gray-100/80 border-gray-200 text-gray-500'
                                }`}
                                title="Quitar reacción"
                              >
                                {emoji} {count > 1 ? count : ''}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Float Popovers */}
        {showEmojiPicker && (
          <EmojiPicker
            onSelectEmoji={(emoji) => setInputText(prev => prev + emoji)}
            onClose={() => setShowEmojiPicker(false)}
          />
        )}

        {showStickerPicker && (
          <StickerPicker
            onSelectSticker={(sticker) => {
              handleSendMessage('sticker', sticker);
              setShowStickerPicker(false);
            }}
            onClose={() => setShowStickerPicker(false)}
          />
        )}

        {/* Bottom Toolbar & Text Input Panel (WhatsApp Style) */}
        <div 
          id="chat-toolbar-input-panel"
          className="bg-white dark:bg-black px-3 py-2 shrink-0 flex items-end gap-2 relative z-20 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="flex-1 flex flex-col gap-1">
            {/* Reply preview bar */}
            {replyToMsg && (
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#262626] rounded-lg px-3 py-1.5 text-xs">
                <div className="w-0.5 h-8 rounded-full bg-[#3797f0] shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-[#3797f0] text-[11px]">
                    {replyToMsg.sender === currentUser ? 'Tú' : replyToMsg.sender}
                  </span>
                  <p className="truncate text-gray-500 dark:text-gray-400 text-[11px]">{replyToMsg.content}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyToMsg(null)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-400 shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
                </button>
              </div>
            )}
            {/* Main Input Pill Capsule */}
            <div className="flex bg-gray-100 dark:bg-[#262626] rounded-full px-4 py-1.5 items-center gap-1.5 min-w-0">
            {/* Smile Emoji Selector Button */}
            <button
              type="button"
              id="emoji-trigger-btn"
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
                setShowStickerPicker(false);
                setShowAttachmentMenu(false);
              }}
              className={`p-1.5 rounded-full transition-colors shrink-0 ${
                showEmojiPicker ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'
              }`}
              title="Emojis 😊"
            >
              <Smile className="w-[20px] h-[20px]" />
            </button>

            {/* Input Text Area */}
            <textarea
              ref={textareaRef}
              rows={1}
              id="message-textarea"
              placeholder="Mensaje..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (currentUser) {
                  sendTyping(currentUser, true);
                  if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                  typingTimeoutRef.current = setTimeout(() => {
                    sendTyping(currentUser, false);
                  }, 2000);
                }
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm bg-transparent border-none outline-none resize-none focus:outline-none focus:ring-0 max-h-24 text-gray-700 dark:text-gray-200 py-1 font-medium scrollbar-none"
            />

            {/* Paperclip attachment Menu trigger */}
            <button
              type="button"
              id="attachment-trigger-btn"
              onClick={() => {
                setShowAttachmentMenu(!showAttachmentMenu);
                setShowEmojiPicker(false);
                setShowStickerPicker(false);
              }}
              className={`p-1.5 rounded-full transition-colors shrink-0 ${
                showAttachmentMenu ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'
              }`}
              title="Adjuntar"
            >
              <Paperclip className="w-[19px] h-[19px] stroke-[2.2]" />
            </button>

            {/* Quick Camera file select */}
            <button
              type="button"
              id="quick-camera-btn"
              onClick={() => {
                imageInputRef.current?.click();
                setShowAttachmentMenu(false);
              }}
              className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full transition-colors shrink-0"
              title="Tomar / Enviar Foto 📷"
            >
              <Camera className="w-[20px] h-[20px] stroke-[2.2]" />
            </button>
          </div>
          </div>{/* end wrapper */}

          {/* Action Send or Voice Record Circle Button */}
          {inputText.trim() ? (
            <button
              type="button"
              id="send-message-btn"
              onClick={() => handleSendMessage('text', inputText)}
              className="w-10 h-10 bg-[#3797f0] text-white rounded-full flex items-center justify-center shrink-0 transition-all duration-150 hover:bg-[#3182d6] active:scale-95"
              title="Enviar mensaje"
            >
              <Send className="w-[16px] h-[16px] ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              id="voice-recorder-trigger-btn"
              onMouseDown={(e) => handleVoiceStart(e)}
              onTouchStart={(e) => handleVoiceStart(e)}
              onMouseUp={(e) => handleVoiceEnd(e)}
              onTouchEnd={(e) => handleVoiceEnd(e)}
              onMouseLeave={(e) => handleVoiceEnd(e)}
              onTouchMove={(e) => handleVoiceMove(e)}
              className="w-10 h-10 bg-gray-100 dark:bg-[#262626] text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 active:scale-95"
              title="Presiona para grabar"
            >
              <Mic className="w-[18px] h-[18px]" />
            </button>
          )}
        </div>

        {/* Dynamic Float Popovers / Attachment Menus */}
        {showAttachmentMenu && (
          <div 
            id="attachment-menu-container"
            className="absolute bottom-16 left-4 right-4 bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-pink-100/50 flex justify-around items-center gap-2 z-30 animate-in slide-in-from-bottom-5 duration-200"
          >
            {/* Doodle Draw */}
            <button
              type="button"
              onClick={() => {
                setShowDrawingCanvas(true);
                setShowAttachmentMenu(false);
              }}
              className="flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
              title="Dibujar Doodle"
            >
              <div className="w-11 h-11 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center shadow-md shadow-purple-200">
                <Palette className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">Dibujo</span>
            </button>

            {/* Stickers */}
            <button
              type="button"
              onClick={() => {
                setShowStickerPicker(true);
                setShowAttachmentMenu(false);
              }}
              className="flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
              title="Stickers divertidos"
            >
              <div className="w-11 h-11 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center shadow-md shadow-pink-200">
                <Smile className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">Sticker</span>
            </button>

            {/* Foto */}
            <button
              type="button"
              onClick={() => {
                imageInputRef.current?.click();
                setShowAttachmentMenu(false);
              }}
              className="flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
              title="Enviar Foto"
            >
              <div className="w-11 h-11 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-md shadow-teal-200">
                <ImageIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">Foto</span>
            </button>

            {/* Video */}
            <button
              type="button"
              onClick={() => {
                videoInputRef.current?.click();
                setShowAttachmentMenu(false);
              }}
              className="flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
              title="Enviar Video"
            >
              <div className="w-11 h-11 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md shadow-indigo-200">
                <Video className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">Video</span>
            </button>

            {/* Audio File */}
            <button
              type="button"
              onClick={() => {
                audioInputRef.current?.click();
                setShowAttachmentMenu(false);
              }}
              className="flex flex-col items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
              title="Enviar Audio Local"
            >
              <div className="w-11 h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-md shadow-orange-200">
                <Mic className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">Audio</span>
            </button>
          </div>
        )}
      </div>

      {/* WhatsApp-style Recording Overlay */}
      {isRecording && !recordingLocked && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
          <div className="bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {formatDuration(recordingDuration)}
          </div>
          <div className="flex items-center gap-1 text-white/60 text-[10px]">
            <ArrowUp className="w-3 h-3" />
            <span>desliza para bloquear</span>
          </div>
        </div>
      )}

      {isRecording && recordingLocked && (
        <div className="absolute bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
          <button onClick={cancelRecording} className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500">
            <Trash2 className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium">{formatDuration(recordingDuration)}</span>
            <span className="text-xs text-gray-400">grabando...</span>
          </div>
          <button onClick={stopAndSendRecording} className="w-10 h-10 rounded-full bg-[#3797f0] flex items-center justify-center text-white">
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Drawing Canvas Overlays */}
      {showDrawingCanvas && (
        <DrawingCanvas
          onSendDrawing={(dataUrl) => handleSendMessage('drawing', dataUrl)}
          onClose={() => setShowDrawingCanvas(false)}
        />
      )}

      {/* Voice Recorder Overlays */}

      {/* Fullscreen Zoom Lightbox overlay */}
      {activeLightbox && (
        <Lightbox
          src={activeLightbox.src}
          sender={activeLightbox.sender}
          timestamp={activeLightbox.timestamp}
          onClose={() => setActiveLightbox(null)}
        />
      )}

      {/* Confirmation Modal for Clearing History */}
      {showClearConfirm && (
        <div 
          id="clear-confirm-modal"
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full text-center flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Borrar historial</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Estás seguro? No podrás deshacer esta acción.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                id="cancel-clear-btn"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                id="confirm-clear-btn"
                onClick={clearHistory}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-sm font-medium text-white"
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
