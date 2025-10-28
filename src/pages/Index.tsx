import { useSensorData } from '@/hooks/useSensorData';
import { useChartData } from '@/hooks/useChartData';
import { StatusIndicator } from '@/components/StatusIndicator';
import { SensorCard } from '@/components/SensorCard';
import { SensorChart } from '@/components/SensorChart';
import { ChatPanel } from '@/components/ChatPanel';
import { Droplets } from 'lucide-react';

const Index = () => {
  const { data: sensorData, isOnline } = useSensorData(10000);
  const chartData = useChartData(30000);

  return (
    <div className="min-h-screen">
      {/* Topbar */}
      <header className="border-b border-white/10 glass-panel rounded-none">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">iHydro Dashboard 🌿</h1>
          </div>
          <StatusIndicator isOnline={isOnline} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Sensors and Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sensor Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {sensorData && (
                <>
                  <SensorCard type="temperature" value={sensorData.temperature} trend="stable" />
                  <SensorCard type="humidity" value={sensorData.humidity} trend="up" />
                  <SensorCard type="tds" value={sensorData.tds} trend="down" />
                  <SensorCard type="ph" value={sensorData.ph} trend="stable" />
                </>
              )}

              {!sensorData && (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="glass-panel p-6 animate-pulse">
                      <div className="h-20 bg-muted/20 rounded" />
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Charts */}
            {chartData.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <SensorChart data={chartData} type="temperature" />
                <SensorChart data={chartData} type="humidity" />
                <SensorChart data={chartData} type="tds" />
                <SensorChart data={chartData} type="ph" />
              </div>
            )}
          </div>

          {/* Right column - Chat */}
          <div className="lg:col-span-1">
            <ChatPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
