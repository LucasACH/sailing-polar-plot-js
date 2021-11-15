import { useEffect, useState } from 'react';
import { ActivityInterface } from 'quantified-self-lib/lib/activities/activity.interface';
import { Datum } from 'plotly.js';
import toKnots from '../utils/toKnots';
import calculateBearing from '../utils/calculateBearing';

export const usePolar = (
  activity: ActivityInterface | undefined,
  windDirection: number,
  tackAngle: number,
  gybeAngle: number
) => {
  const [r, setR] = useState<Datum[] | undefined>();
  const [theta, setTheta] = useState<Datum[] | undefined>();

  useEffect(() => {
    const speedArray = activity
      ?.getSquashedStreamData('Speed')
      .map((speed) => toKnots(speed));
    const latArray = activity?.getSquashedStreamData('Latitude');
    const lonArray = activity?.getSquashedStreamData('Longitude');

    const bearingArray = calculateBearing(latArray, lonArray, windDirection);

    const dataFrame = bearingArray
      .map((bearing, i) => ({
        bearing: bearing,
        speed: isInsideBoundaries(bearing, tackAngle, gybeAngle)
          ? speedArray && speedArray[i + 1]
          : 0,
      }))
      .sort((a, b) => (a.bearing as number) - (b.bearing as number));

    let filteredDataFrame: {
      [key: string]: number;
    } = {};

    dataFrame.map((a) => {
      const prevData = dataFrame
        .filter((point) => point.bearing === a.bearing)
        .sort((a, b) => (b.speed as number) - (a.speed as number));
      return (filteredDataFrame[prevData[0].bearing] = prevData[0]
        .speed as number);
    });

    setR(Object.values(filteredDataFrame));
    setTheta(Object.keys(filteredDataFrame));
  }, [activity, windDirection, tackAngle, gybeAngle]);

  return { r, theta };
};

const isInsideBoundaries = (
  bearing: number,
  tackAngle: number,
  gybeAngle: number
) => {
  if (
    (bearing >= tackAngle && bearing <= gybeAngle) ||
    (bearing >= 360 - gybeAngle && bearing <= 360 - tackAngle)
  )
    return true;

  return false;
};
