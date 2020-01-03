import React from 'react';
import { Radar } from 'react-chartjs-2';
import DataForm from './DataForm';
import { useSelector } from 'react-redux';

function SpiderChart({
  setTitle,
  setColor,
  color,
  axis,
  setAxis,
  datasets,
  setDatasets,
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
  } = useSelector((state) => state.createGraph.present);
  const handleBack = () => {
    setAxis([]);
    setNumbers([]);
    setTitle('Example Title');
    setDatasets([]);
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
      <DataForm
        axis={axis}
        addToDatasets={addToDatasets}
        setLabel={setLabel}
        label={label}
        setNumbers={setNumbers}
        numbers={numbers}
        setColor={setColor}
        color={color}
      />
      <button onClick={handleBack}>Back</button>

      <div>
        {datasets.map((item) => (
          <div>
            <h1>{item.data}</h1>
            <h1>{item.label}</h1>
            <h1>{item.backgroundColor}</h1>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpiderChart;
