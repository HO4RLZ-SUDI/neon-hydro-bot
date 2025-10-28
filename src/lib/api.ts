import { SensorData, ChatMessage } from '@/types/sensor';

const API_BASE = '/api';

export async function fetchSensors(): Promise<SensorData> {
  const response = await fetch(`${API_BASE}/sensors`);
  if (!response.ok) throw new Error('Failed to fetch sensors');
  return response.json();
}

export async function fetchHistory(): Promise<SensorData[]> {
  const response = await fetch(`${API_BASE}/history`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
}

export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error('AI not available');
  const data = await response.json();
  return data.response;
}
