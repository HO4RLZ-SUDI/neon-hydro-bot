import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SensorData, SensorType } from '@/types/sensor';
import { SENSOR_RANGES } from '@/lib/sensorUtils';

interface SensorChartProps {
  data: SensorData[];
  type: SensorType;
}

export function SensorChart({ data, type }: SensorChartProps) {
  const config = SENSOR_RANGES[type];

  const chartData = useMemo(() => {
    return data.map((d, index) => ({
      index,
      value: d[type],
      time: new Date(d.timestamp).toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));
  }, [data, type]);

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{config.icon}</span>
        <h3 className="text-lg font-semibold">{config.label}</h3>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
            domain={[config.min * 0.8, config.max * 1.2]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              backdropFilter: 'blur(12px)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
