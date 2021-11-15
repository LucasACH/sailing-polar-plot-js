import Plot from 'react-plotly.js';
import { Config, Data, Datum, Layout } from 'plotly.js';

interface PolarChartProps {
  r: Datum[] | undefined;
  theta: Datum[] | undefined;
  parentDivRef: HTMLDivElement | null;
}

const PolarChart: React.FC<PolarChartProps> = ({ r, theta, parentDivRef }) => {
  const data: Data[] = [
    {
      type: 'scatterpolar',
      mode: 'lines',
      fill: 'toself',
      opacity: 0.7,
      line: {
        shape: 'spline',
        color: 'blue',
        width: 1,
      },
      r: r,
      theta: theta,
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
    polar: {
      bgcolor: 'transparent',
      radialaxis: {
        range: [0, Math.max.apply(null, r as number[]) + 3], // range offset
        ticksuffix: 'kn',
        angle: 90,
        tickangle: 90,
        ticklen: 0,
        tickfont: {
          size: 12,
        },
      },
      angularaxis: {
        tickmode: 'array',
        tickvals: [30, 60, 120, 150, 210, 240, 300, 330],
        ticktext: ['30°', '60°', '120°', '150°', '150°', '120°', '60°', '30°'],
        rotation: 90,
        direction: 'clockwise',
        ticklen: 0,
        gridcolor: 'grey',
        showgrid: true,
      },
    },
  };

  const config: Partial<Config> | undefined = {
    displayModeBar: false,
    displaylogo: false,
    staticPlot: true,
  };

  return <Plot data={data} layout={layout} config={config} />;
};

export default PolarChart;
