import { useEffect, useState } from 'react';
import { QuantifiedSelfLib } from 'quantified-self-lib';
import { ActivityInterface } from 'quantified-self-lib/lib/activities/activity.interface';

const useActivities = (file: File | null) => {
  const [activities, setActivities] = useState<ActivityInterface[] | []>([]);

  useEffect(() => {
    const reader = new FileReader();

    file && reader.readAsText(file);

    reader.onload = () => {
      QuantifiedSelfLib.importFromTCX(
        new DOMParser().parseFromString(
          reader.result as string,
          'application/xml'
        )
      ).then((event) => {
        setActivities(event.getActivities());
      });
    };
  }, [file]);

  return { activities };
};

export default useActivities;
