import React, { useState, useEffect } from 'react';

import SpiderChart from './SpiderChart.js';
import GraphTitleAxis from './GraphTitleAxis';
import DataForm from './DataForm';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({ title: '', axe: '' });
  const [axis, setAxis] = useState([]);
  const [title, setTitle] = useState('This is a Radar Example');
  const [label, setLabel] = useState();
  const [numbers, setNumbers] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [color, setColor] = useState();

  const addToDatasets = (event) => {
    event.preventDefault();
    setDatasets([
      ...datasets,
      { label, data: numbers, backgroundColor: color },
    ]);
  };

  return (
    <Router>
      <div>
        <Route
          exact
          path="/dashboard"
          render={(renderProps) => (
            <GraphTitleAxis
              setAxis={setAxis}
              setTitle={setTitle}
              axis={axis}
              setFormData={setFormData}
              formData={formData}
              {...renderProps}
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
                setAxis={setAxis}
                setTitle={setTitle}
                title={title}
                datasets={datasets}
                addToDatasets={addToDatasets}
                setLabel={setLabel}
                label={label}
                setNumbers={setNumbers}
                numbers={numbers}
                history={renderProps.history}
                color={color}
                setColor={setColor}
                setDatasets={setDatasets}
              />
            )}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
