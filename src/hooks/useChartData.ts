import { useState, useEffect } from 'react';
import { SensorData } from '@/types/sensor';
import { fetchHistory } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useChartData(refreshInterval = 30000) {
  const [data, setData] = useState<SensorData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const history = await fetchHistory();
        setData(history);
      } catch (error) {
        toast({
          title: 'Chart Error',
          description: 'Unable to load historical data',
          variant: 'destructive',
        });
      }
    };

    loadData();
    const interval = setInterval(loadData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, toast]);

  return data;
}
