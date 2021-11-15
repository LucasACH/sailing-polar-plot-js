import { Config, Data, Datum, Layout, TypedArray } from 'plotly.js';
import Plot from 'react-plotly.js';

interface LineChartProps {
  x: Datum[] | Datum[][] | TypedArray | undefined;
  y: Datum[] | Datum[][] | TypedArray | undefined;
  title: string;
  parentDivRef: HTMLDivElement | null;
}

const LineChart: React.FC<LineChartProps> = ({ x, y, title, parentDivRef }) => {
  const data: Data[] = [
    {
      type: 'scatter',
      mode: 'lines',
      line: {
        shape: 'spline',
        color: 'blue',
        width: 1,
      },
      x: x,
      y: y,
    },
  ];

  const layout: Partial<Layout> = {
    paper_bgcolor: 'transparent',
    hovermode: false,
    showlegend: false,
    width: parentDivRef?.clientWidth,
    height: parentDivRef?.clientHeight,
    font: {
      family: 'Roboto, sans-serif',
      size: 14,
    },
    title: {
      text: title,
      font: { size: 20 },
    },
    xaxis: {
      type: 'date',
    },
  };

  const config: Partial<Config> | undefined = {
    displayModeBar: false,
    displaylogo: false,
    staticPlot: true,
  };

  return <Plot data={data} layout={layout} config={config} />;
};

export default LineChart;
