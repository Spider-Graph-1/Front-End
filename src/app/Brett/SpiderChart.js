import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import DatasetsForm from '../../features/graph/create/DatasetsForm';

function SpiderChart({
  setTitle,
  setColor,
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
  const {
    data: { labels },
    options: {
      title: { text },
    },
  } = useSelector((state) => state.createGraph);
  const handleBack = () => {
    setAxis([]);
    setNumbers([]);
    setTitle('Example Title');
    history.push('/dashboard');
  };
  const data = {
    labels,
    datasets,
  };
  const options = {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text,
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
      <DatasetsForm
        axis={axis}
        addToDatasets={addToDatasets}
        setLabel={setLabel}
        label={label}
        setNumbers={setNumbers}
        numbers={numbers}
        setColor={setColor}
      />
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default SpiderChart;
