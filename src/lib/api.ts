export interface ApiMessage {
  _id?: string;
  id: string;
  sender: 'Facu' | 'Rocío';
  type: 'text' | 'sticker' | 'drawing' | 'image' | 'video' | 'audio';
  content: string;
  timestamp: number;
  fileName?: string;
  duration?: number;
  seen: boolean;
  isChunked?: boolean;
  totalChunks?: number;
}

export async function fetchMessages(): Promise<ApiMessage[]> {
  const res = await fetch('/api/messages');
  if (!res.ok) throw new Error('Error al obtener mensajes');
  return res.json();
}

export async function sendMessage(msg: {
  id: string;
  sender: string;
  type: string;
  content: string;
  timestamp: number;
  fileName?: string;
  duration?: number;
}): Promise<ApiMessage> {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(msg),
  });
  if (!res.ok) throw new Error('Error al enviar mensaje');
  return res.json();
}

export async function markAsSeen(messageId: string): Promise<void> {
  await fetch(`/api/messages/${messageId}/seen`, { method: 'PUT' });
}

export async function deleteMessage(messageId: string): Promise<void> {
  await fetch(`/api/messages/${messageId}`, { method: 'DELETE' });
}

export async function clearMessages(): Promise<void> {
  await fetch('/api/messages/clear', { method: 'POST' });
}

export async function fetchChunks(messageId: string): Promise<{ index: number; data: string }[]> {
  const res = await fetch(`/api/messages/${messageId}/chunks`);
  if (!res.ok) throw new Error('Error al obtener chunks');
  return res.json();
}

export async function updatePresence(user: string, online: boolean): Promise<void> {
  await fetch(`/api/presence/${user}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ online }),
  });
}
