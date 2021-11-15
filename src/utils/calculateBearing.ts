const calculateBearing = (
  lat: number[] | undefined,
  lon: number[] | undefined,
  windDirection: number
) => {
  let bearings = [];

  for (let i = 0; lat && lon && i < lat.length - 1; i++) {
    const originLat = toRadians(lat[i]);
    const originLon = toRadians(lon[i]);
    const destLat = toRadians(lat[i + 1]);
    const destLon = toRadians(lon[i + 1]);

    const dL = destLon - originLon;

    const x = Math.cos(destLat) * Math.sin(dL);
    const y =
      Math.cos(originLat) * Math.sin(destLat) -
      Math.sin(originLat) * Math.cos(destLat) * Math.cos(dL);

    const bearing = (toDegrees(Math.atan2(x, y)) + 360 - windDirection) % 360;

    bearings.push(Number(bearing.toFixed()));
  }

  return bearings;
};

export default calculateBearing;

const toRadians = (deg: number) => (deg * Math.PI) / 180;
const toDegrees = (rad: number) => (rad * 180) / Math.PI;
