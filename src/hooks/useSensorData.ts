import { useState, useEffect } from 'react';
import { SensorData } from '@/types/sensor';
import { fetchSensors } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useSensorData(refreshInterval = 10000) {
  const [data, setData] = useState<SensorData | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const sensorData = await fetchSensors();
        setData(sensorData);
        setIsOnline(true);
        setLastUpdate(Date.now());
      } catch (error) {
        setIsOnline(false);
        toast({
          title: 'Connection Error',
          description: 'Unable to fetch sensor data',
          variant: 'destructive',
        });
      }
    };

    loadData();
    const interval = setInterval(loadData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, toast]);

  // Check if last update was recent (within 30s)
  useEffect(() => {
    const checkStatus = setInterval(() => {
      const timeSinceUpdate = Date.now() - lastUpdate;
      setIsOnline(timeSinceUpdate < 30000);
    }, 5000);

    return () => clearInterval(checkStatus);
  }, [lastUpdate]);

  return { data, isOnline };
}
