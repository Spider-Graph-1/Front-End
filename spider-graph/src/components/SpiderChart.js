import React from "react";
import { Radar } from "react-chartjs-2";

function SpiderChart({ title, axis, datasets }) {
  const data = {
    labels: axis,
    datasets: datasets
  };
  const options = {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: title
    },
    scale: {
      ticks: {
        beginAtZero: true
      }
    }
  };
  return <Radar data={data} options={options} />;
}

export default SpiderChart;
