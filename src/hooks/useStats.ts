import { useEffect, useState } from 'react';
import { ActivityInterface } from 'quantified-self-lib/lib/activities/activity.interface';
import { DataInterface } from 'quantified-self-lib/lib/data/data.interface';
import toKnots from '../utils/toKnots';

interface Stats {
  startDate: Date | undefined;
  creatorName: string | undefined;
  duration: number | undefined;
  distance: number | undefined;
  maxHeartRate: number | undefined;
  minHeartRate: number | undefined;
  maxSpeed: number | undefined;
}

const useStats = (activity: ActivityInterface | undefined) => {
  const [stats, setStats] = useState<Stats | undefined>();

  useEffect(() => {
    const maxHeartRate = activity?.getStat(
      'Maximum Heart Rate'
    ) as DataInterface;
    const minHeartRate = activity?.getStat(
      'Minimum Heart Rate'
    ) as DataInterface;
    const maxSpeed = activity?.getStat('Maximum Speed') as DataInterface;

    const stats: Stats = {
      startDate: activity?.startDate,
      creatorName: activity?.creator.name,
      duration: activity?.getDuration().getValue(),
      distance: activity?.getDistance().getValue(),
      maxHeartRate: maxHeartRate && (maxHeartRate.getValue() as number),
      minHeartRate: maxHeartRate && (minHeartRate.getValue() as number),
      maxSpeed: maxSpeed && toKnots(maxSpeed.getValue() as number),
    };
    setStats(stats);
  }, [activity]);

  return { stats };
};

export default useStats;
