import { useEffect, useState } from 'react';
import { ActivityInterface } from 'quantified-self-lib/lib/activities/activity.interface';
import { Datum, TypedArray } from 'plotly.js';
import { StreamDataItem } from 'quantified-self-lib/lib/streams/stream.interface';

export const useHeartRate = (activity: ActivityInterface | undefined) => {
  const [x, setX] = useState<Datum[] | Datum[][] | TypedArray | undefined>();
  const [y, setY] = useState<Datum[] | Datum[][] | TypedArray | undefined>();

  useEffect(() => {
    const stream = activity?.getStreamDataByTime(
      'Heart Rate',
      true
    ) as StreamDataItem[];
    setX(stream?.map((data) => new Date(data.time)));
    setY(stream?.map((data) => data.value));
  }, [activity]);

  return { x, y };
};
