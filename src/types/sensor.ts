export interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  tds: number;
  ph: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type SensorType = 'temperature' | 'humidity' | 'tds' | 'ph';

export interface SensorRange {
  min: number;
  max: number;
  unit: string;
  label: string;
  icon: string;
}
