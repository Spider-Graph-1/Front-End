import React, { useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import Dataset from './Dataset';
import { Link } from 'react-router-dom';

function SpiderChart({
  setTitle,
  title,
  axis,
  setAxis,
  datasets,
  addToDatasets,
  setLabel,
  label,
  setNumbers,
  numbers,
  history,
}) {
  const handleBack = () => {
    setAxis([]);
    setNumbers([]);
    setTitle('Example Title');
    history.push('/dashboard');
  };
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
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default SpiderChart;
