import React, { useState, useEffect } from 'react';

import SpiderChart from './SpiderChart.js';
import GraphTitleAxis from './GraphTitleAxis';
import Dataset from './Dataset';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({ title: '', axe: '' });
  const [axis, setAxis] = useState([]);
  const [title, setTitle] = useState('This is a Radar Example');
  const [label, setLabel] = useState('Custom Label');
  const [numbers, setNumbers] = useState([]);
  const [datasets, setDatasets] = useState([
    // {
    //   label: "My First dataset",
    //   backgroundColor: "rgba(255, 87, 51,0.2)",
    //   pointBackgroundColor: "rgba(220,220,220,1)",
    //   data: [10, 20, 30, 2]
    // }
    // {
    //   label: "Hidden dataset",
    //   backgroundColor: "rgba(187, 51, 255 ,0.2)",
    //   data: [12, 19, 3, 5]
    // },
    // {
    //   label: "My Second dataset",
    //   backgroundColor: "rgba(255, 255, 51,0.2)",
    //   pointBackgroundColor: "rgba(151,187,205,1)",
    //   data: [16, 10, 15, 14]
    // }
  ]);
  const addToDatasets = (event) => {
    event.preventDefault();
    console.log('Before', datasets);
    setDatasets([...datasets, { label, data: Object.values(numbers) }]);

    console.log('After', datasets);
  };

  // useEffect(() => {
  //   console.log('Numbers:', numbers);
  //   console.log('axis:', axis);
  // }, [axis]);

  return (
    <Router>
      <div>
        <Route
          exact
          path="/dashboard"
          render={() => (
            <GraphTitleAxis
              setAxis={setAxis}
              setTitle={setTitle}
              axis={axis}
              setFormData={setFormData}
              formData={formData}
            />
          )}
        />

        <div>
          <Route
            exact
            path="/dashboard/chart"
            render={(renderProps) => (
              <SpiderChart
                axis={axis}
                title={title}
                datasets={datasets}
                addToDatasets={addToDatasets}
                setLabel={setLabel}
                label={label}
                setNumbers={setNumbers}
                numbers={numbers}
              />
            )}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
