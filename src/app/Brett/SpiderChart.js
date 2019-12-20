import React, { useEffect } from 'react';
import { Radar } from 'react-chartjs-2';

function SpiderChart({ title, axis, datasets }) {
  const data = {
    labels: axis,
    datasets,
  };
  const options = {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: title,
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    console.log(`datasets: ${datasets}`);
    console.log(`labels: ${axis}`);
  }, [axis, datasets]);

  return <Radar data={data} options={options} />;
}

export default SpiderChart;
