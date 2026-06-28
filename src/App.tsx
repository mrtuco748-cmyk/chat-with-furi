import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from './types';
import UserSelector from './components/UserSelector';
import EmojiPicker from './components/EmojiPicker';
import StickerPicker from './components/StickerPicker';
import DrawingCanvas from './components/DrawingCanvas';
import VoiceRecorder from './components/VoiceRecorder';
import Lightbox from './components/Lightbox';
import { fetchMessages, sendMessage, markAsSeen, deleteMessage, clearMessages, fetchChunks, updatePresence } from './lib/api';
import { Smile, Paperclip, Camera, Mic, Send, Check, CheckCheck, Trash2, LogOut, Image as ImageIcon, Video, Palette, Bell, BellOff, MoreVertical } from 'lucide-react';


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
    <div className="flex items-center gap-3 bg-white/40 dark:bg-black/10 p-2.5 rounded-xl border border-white/20 min-w-44 max-w-full">
      <button
        type="button"
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow transition-all active:scale-95 duration-150 shrink-0"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24" className="ml-0.5"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {/* Equalizer Wave simulation */}
        <div className="flex items-end gap-0.5 h-6 opacity-80 py-0.5">
          {Array.from({ length: 16 }).map((_, i) => {
            // Generate heights for wave simulation
            const baseHeights = [3, 5, 2, 7, 4, 8, 3, 6, 2, 8, 4, 7, 3, 5, 2, 4];
            const height = baseHeights[i % baseHeights.length];
            return (
              <span
                key={i}
                className="w-1 bg-pink-600 rounded-full transition-all duration-150"
                style={{
                  height: `${height * 3}px`,
                  transform: isPlaying ? `scaleY(${1 + Math.random() * 0.4})` : 'scaleY(1)',
                  opacity: isPlaying && Math.random() > 0.3 ? 1 : 0.6,
                }}
              />
            );
          })}
        </div>
        
        {/* Progress slide indicator and duration details */}
        <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono font-medium">
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
  const [showVoiceRecorder, setShowVoiceRecorder] = useState<boolean>(false);
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; sender: string; timestamp: string } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  // New states for WhatsApp features
  const [otherUserOnline, setOtherUserOnline] = useState<boolean>(false);
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
    };

    if (type === 'text') {
      setInputText('');
    }

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

  if (!currentUser) {
    return <UserSelector onSelectUser={handleSelectUser} />;
  }

  return (
    <div 
      id="app-chat-viewport"
      className="h-screen w-full bg-linear-to-tr from-pink-100/40 via-orange-50/40 to-purple-100/40 flex items-center justify-center p-0 md:p-4 select-none"
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
        className="w-full h-full md:max-w-md md:h-[90vh] bg-white rounded-none md:rounded-3xl shadow-2xl border border-pink-100/60 overflow-hidden flex flex-col relative"
      >
        {/* Chat Header */}
        <div 
          id="chat-header"
          className="bg-white border-b border-pink-100 px-4 py-3 flex justify-between items-center shrink-0 z-20 shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            {/* User status avatar indicator showing the OTHER person */}
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-inner border border-pink-100 ${
                currentUser === 'Facu' ? 'bg-pink-100 text-pink-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {currentUser === 'Facu' ? '🌸' : '👨‍💻'}
              </div>
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white transition-all duration-300 ${
                otherUserOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
              }`} />
            </div>
 
            <div className="flex flex-col text-left">
              <span className="font-bold text-gray-800 text-sm md:text-base leading-tight">
                {currentUser === 'Facu' ? 'Rocío' : 'Facu'}
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-[10px]">
                {otherUserOnline ? (
                  <span className="text-green-500 font-semibold animate-pulse">en línea</span>
                ) : (
                  <span className="text-gray-400">desconectado(a)</span>
                )}
                <span className="text-gray-200">•</span>
                <span className={`inline-flex items-center gap-0.5 font-medium ${
                  serverStatus === 'connected' ? 'text-pink-400' : 'text-amber-500'
                }`}>
                  {serverStatus === 'connected' ? 'Nube synced' : 'Conectando...'}
                </span>
              </div>
            </div>
          </div>
 
          <div className="flex items-center gap-1.5">
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
                notificationsEnabled ? 'text-pink-500 hover:bg-pink-50/50' : 'text-gray-400 hover:bg-gray-100/50'
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
              className="p-2 text-gray-400 hover:text-pink-600 rounded-full hover:bg-pink-50 transition-colors duration-150"
              title="Cerrar sesión"
            >
              <LogOut className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Message Thread Body */}
        <div 
          id="chat-messages-container"
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent select-text relative"
          style={{
            backgroundImage: 'radial-gradient(rgba(244, 63, 94, 0.05) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
            backgroundColor: '#fffafb',
          }}
        >
          {messages.length === 0 ? (
            <div id="no-messages-prompt" className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3">
              <span className="text-4xl animate-pulse">💌</span>
              <h4 className="text-sm font-bold text-gray-700">¡Aún no hay mensajes!</h4>
              <p className="text-xs text-gray-400 max-w-xs font-medium leading-relaxed">
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
                >
                  {/* Small avatar for bubbles */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border border-pink-100/40 shrink-0 select-none shadow-xs ${
                    msg.sender === 'Facu' ? 'bg-orange-100 text-orange-600' : 'bg-pink-100 text-pink-600'
                  }`}>
                    {msg.sender === 'Facu' ? '👨‍💻' : '🌸'}
                  </div>

                  {/* Message Bubble box */}
                  <div 
                    className={`rounded-2xl px-3.5 py-2 text-sm shadow-xs border relative flex flex-col gap-1 min-w-16 ${
                      isMe
                        ? msg.sender === 'Facu'
                          ? 'bg-linear-to-b from-orange-400 to-orange-500 text-white border-orange-400'
                          : 'bg-linear-to-b from-pink-400 to-pink-500 text-white border-pink-400'
                        : msg.sender === 'Facu'
                          ? 'bg-orange-50/95 text-gray-800 border-orange-100/80'
                          : 'bg-purple-50/95 text-gray-800 border-purple-100/80'
                    }`}
                  >
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
                      <div className="relative group rounded-xl overflow-hidden border border-black/5 bg-white shadow-inner max-w-full cursor-zoom-in">
                        <img
                          src={msg.content}
                          alt="Dibujo / Doodle"
                          onClick={() => setActiveLightbox({ src: msg.content, sender: msg.sender, timestamp: formatMessageTime(msg.timestamp) })}
                          className="max-w-44 object-contain max-h-44 group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                    )}

                    {msg.type === 'image' && (
                      <div className="relative group rounded-xl overflow-hidden border border-black/5 bg-white shadow-inner max-w-full cursor-zoom-in">
                        <img
                          src={msg.content}
                          alt="Foto"
                          onClick={() => setActiveLightbox({ src: msg.content, sender: msg.sender, timestamp: formatMessageTime(msg.timestamp) })}
                          className="max-w-44 object-contain max-h-44 group-hover:opacity-90 transition-opacity"
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
                        className={`text-[9px] font-medium font-mono tracking-tight opacity-80 ${
                          isMe ? 'text-white/90' : 'text-gray-400'
                        }`}
                      >
                        {formatMessageTime(msg.timestamp)}
                      </span>
                      {isMe && (
                        msg.seen ? (
                          <CheckCheck className="w-3.5 h-3.5 text-sky-200 stroke-[2.5] shrink-0" title="Leído" />
                        ) : (
                          <CheckCheck className="w-3.5 h-3.5 text-white/60 stroke-[2.5] shrink-0" title="Entregado" />
                        )
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
          className="bg-pink-50/20 px-3 py-2.5 shrink-0 flex items-end gap-2 relative z-20 border-t border-pink-50"
        >
          {/* Main Input Pill Capsule */}
          <div className="flex-1 bg-white rounded-2xl px-2.5 py-1 flex items-center gap-1.5 min-w-0 shadow-xs border border-pink-100/50">
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
                showEmojiPicker ? 'text-pink-500 bg-pink-50' : 'text-gray-400 hover:text-pink-400'
              }`}
              title="Emojis 😊"
            >
              <Smile className="w-[21px] h-[21px] stroke-[2.2]" />
            </button>

            {/* Input Text Area */}
            <textarea
              ref={textareaRef}
              rows={1}
              id="message-textarea"
              placeholder="Mensaje..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm bg-transparent border-none outline-none resize-none focus:outline-none focus:ring-0 max-h-24 text-gray-700 py-1 font-medium scrollbar-none"
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
                showAttachmentMenu ? 'text-pink-500 bg-pink-50' : 'text-gray-400 hover:text-pink-400'
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
              className="p-1.5 text-gray-400 hover:text-pink-400 rounded-full transition-colors shrink-0"
              title="Tomar / Enviar Foto 📷"
            >
              <Camera className="w-[20px] h-[20px] stroke-[2.2]" />
            </button>
          </div>

          {/* Action Send or Voice Record Circle Button */}
          {inputText.trim() ? (
            <button
              type="button"
              id="send-message-btn"
              onClick={() => handleSendMessage('text', inputText)}
              className="w-11 h-11 bg-pink-500 text-white rounded-full flex items-center justify-center shrink-0 transition-all duration-150 shadow-md hover:bg-pink-600 hover:scale-105 active:scale-95"
              title="Enviar mensaje"
            >
              <Send className="w-[18px] h-[18px] ml-0.5 stroke-[2.2]" />
            </button>
          ) : (
            <button
              type="button"
              id="voice-recorder-trigger-btn"
              onClick={() => {
                setShowVoiceRecorder(true);
                setShowAttachmentMenu(false);
                setShowEmojiPicker(false);
                setShowStickerPicker(false);
              }}
              className="w-11 h-11 bg-pink-500 text-white rounded-full flex items-center justify-center shrink-0 transition-all duration-150 shadow-md hover:bg-pink-600 hover:scale-105 active:scale-95"
              title="Grabar nota de voz"
            >
              <Mic className="w-[19px] h-[19px] stroke-[2.2]" />
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

      {/* Drawing Canvas Overlays */}
      {showDrawingCanvas && (
        <DrawingCanvas
          onSendDrawing={(dataUrl) => handleSendMessage('drawing', dataUrl)}
          onClose={() => setShowDrawingCanvas(false)}
        />
      )}

      {/* Voice Recorder Overlays */}
      {showVoiceRecorder && (
        <VoiceRecorder
          onSendAudio={(base64, durationSec) => handleSendMessage('audio', base64, { duration: durationSec })}
          onClose={() => setShowVoiceRecorder(false)}
        />
      )}

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
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-pink-100 max-w-sm w-full text-center flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl">
              🥺
            </div>
            
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold text-gray-800">¿De verdad quieres borrarlo?</h3>
              <p className="text-xs text-gray-500 leading-relaxed px-2">
                Se eliminarán permanentemente todas nuestras fotitos, audios, dibujos y bonitos mensajes de este historial local. Esta acción no se puede deshacer. 
              </p>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                id="cancel-clear-btn"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-2xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                id="confirm-clear-btn"
                onClick={clearHistory}
                className="flex-1 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-xs font-semibold text-white transition-colors shadow"
              >
                Sí, borrar todo 🗑️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
