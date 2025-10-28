import { SensorType } from '@/types/sensor';
import { SENSOR_RANGES, formatSensorValue, getSensorStatus, getSensorColor } from '@/lib/sensorUtils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SensorCardProps {
  type: SensorType;
  value: number;
  trend?: 'up' | 'down' | 'stable';
}

export function SensorCard({ type, value, trend = 'stable' }: SensorCardProps) {
  const config = SENSOR_RANGES[type];
  const status = getSensorStatus(type, value);
  const colorClass = getSensorColor(status);

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="glass-panel p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{config.icon}</div>
          <div>
            <h3 className="text-sm text-muted-foreground">{config.label}</h3>
            <p className={`text-3xl font-bold ${colorClass} transition-colors duration-300`}>
              {formatSensorValue(type, value)}
              <span className="text-lg ml-1">{config.unit}</span>
            </p>
          </div>
        </div>
        <TrendIcon className={`w-5 h-5 ${colorClass}`} />
      </div>

      {/* Status bar */}
      <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            status === 'good'
              ? 'bg-success'
              : status === 'warning'
              ? 'bg-warning'
              : 'bg-destructive'
          }`}
          style={{
            width: `${Math.min(
              100,
              Math.max(0, ((value - config.min) / (config.max - config.min)) * 100)
            )}%`,
          }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>
          {config.min}
          {config.unit}
        </span>
        <span>
          {config.max}
          {config.unit}
        </span>
      </div>
    </div>
  );
}
