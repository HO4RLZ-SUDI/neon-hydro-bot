import { SensorType, SensorRange } from '@/types/sensor';

export const SENSOR_RANGES: Record<SensorType, SensorRange> = {
  temperature: {
    min: 25,
    max: 32,
    unit: '°C',
    label: 'อุณหภูมิ',
    icon: '🌡️',
  },
  humidity: {
    min: 65,
    max: 80,
    unit: '%',
    label: 'ความชื้น',
    icon: '💧',
  },
  tds: {
    min: 900,
    max: 1200,
    unit: 'ppm',
    label: 'TDS',
    icon: '⚗️',
  },
  ph: {
    min: 5.8,
    max: 6.8,
    unit: '',
    label: 'pH',
    icon: '🧪',
  },
};

export function formatSensorValue(type: SensorType, value: number): string {
  if (type === 'tds') return Math.round(value).toString();
  return value.toFixed(1);
}

export function getSensorStatus(
  type: SensorType,
  value: number
): 'good' | 'warning' | 'danger' {
  const range = SENSOR_RANGES[type];
  if (value >= range.min && value <= range.max) return 'good';
  if (value < range.min * 0.9 || value > range.max * 1.1) return 'danger';
  return 'warning';
}

export function getSensorColor(status: 'good' | 'warning' | 'danger'): string {
  switch (status) {
    case 'good':
      return 'text-success';
    case 'warning':
      return 'text-warning';
    case 'danger':
      return 'text-destructive';
  }
}
