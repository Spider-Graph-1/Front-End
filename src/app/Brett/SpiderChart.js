import React, { useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import Dataset from './Dataset';
import { Link } from 'react-router-dom';

function SpiderChart({
  title,
  axis,
  datasets,
  addToDatasets,
  setLabel,
  label,
  setNumbers,
  numbers,
}) {
  const data = {
    labels: Object.values(axis),
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
    console.log('axis on spiderchart', axis);
  }, [axis, datasets]);

  return (
    <div>
      <Radar data={data} options={options} />
      <Dataset
        axis={axis}
        addToDatasets={addToDatasets}
        setLabel={setLabel}
        label={label}
        setNumbers={setNumbers}
        numbers={numbers}
      />
      <Link to="/dashboard">Back</Link>
    </div>
  );
}

export default SpiderChart;
