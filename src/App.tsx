import { useRef, useState } from 'react';
import { useHeartRate } from './hooks/useHeartRate';
import PolarChart from './components/charts/PolarChart';
import { usePolar } from './hooks/usePolar';
import './App.css';
import LineChart from './components/charts/LineChart';
import useStats from './hooks/useStats';
import useActivities from './hooks/useActivities';
import Input from './components/Input';
import handleFileChange from './utils/handleFileChange';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activityIndex, setActivityIndex] = useState(0);
  const { activities } = useActivities(file);

  const [windDirection, setWindDirection] = useState(0);
  const [tackAngle, setTackAngle] = useState(25);
  const [gybeAngle, setGybeAngle] = useState(160);

  const { x, y } = useHeartRate(activities[activityIndex]);
  const { r, theta } = usePolar(
    activities[activityIndex],
    windDirection,
    tackAngle,
    gybeAngle
  );
  const { stats } = useStats(activities[activityIndex]);

  const polarDivRef = useRef<HTMLDivElement | null>(null);
  const lineDivRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className='app'>
      <div className='top'>
        <Input
          title='Load file'
          type='file'
          onChange={(event) => handleFileChange(event, setFile)}
        >
          <span>or</span>
          <button className='download-button'>
            <a href='/activity_6745192057.tcx' download>
              Download demo file
            </a>
          </button>
        </Input>
        <Input
          title='Wind direction (deg)'
          type='number'
          value={windDirection}
          onChange={(event) => setWindDirection(Number(event.target.value))}
        />
        <Input
          title='Tack angle (deg)'
          type='number'
          value={tackAngle}
          onChange={(event) => setTackAngle(Number(event.target.value))}
        />
        <Input
          title='Gybe angle (deg)'
          type='number'
          value={gybeAngle}
          onChange={(event) => setGybeAngle(Number(event.target.value))}
        />
      </div>
      <div className='center'>
        <div className='left' ref={polarDivRef}>
          <PolarChart r={r} theta={theta} parentDivRef={polarDivRef.current} />
        </div>
        <div className='right' ref={lineDivRef}>
          <LineChart
            x={x}
            y={y}
            title='Heart Rate'
            parentDivRef={lineDivRef.current}
          />
        </div>
      </div>
      {stats && (
        <div className='bottom'>
          <table>
            <tr>
              <td>Start Date</td>
              <td>{stats.startDate?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Device Name</td>
              <td>{stats.creatorName}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>
                {stats.duration && Math.floor(stats.duration / 60) + ' min'}
              </td>
            </tr>
            <tr>
              <td>Distance</td>
              <td>
                {stats.distance && (stats.distance / 1000).toFixed(1) + ' km'}
              </td>
            </tr>
            <tr>
              <td>Max Heart Rate</td>
              <td>{stats.minHeartRate && stats.maxHeartRate + ' bpm'}</td>
            </tr>
            <tr>
              <td>Min Heart Rate</td>
              <td>{stats.minHeartRate && stats.minHeartRate + ' bpm'}</td>
            </tr>
            <tr>
              <td>Max Speed</td>
              <td>{stats.maxSpeed && stats.maxSpeed + ' kn'}</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
