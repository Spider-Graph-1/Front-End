import React, { useState, useEffect } from 'react';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SpiderChart from './SpiderChart.js';
import StructureForm from '../../features/graph/create/StructureForm';
import DatasetsForm from '../../features/graph/create/DatasetsForm';
import CreateGraph from '../../features/graph/create/CreateGraph';
import ViewGraph from '../../features/graph/ViewGraph';

function App() {
  const [formData, setFormData] = useState({ title: '', axe: '' });
  const [axis, setAxis] = useState([]);
  const [title, setTitle] = useState('This is a Radar Example');
  const [label, setLabel] = useState('Custom Label');
  const [numbers, setNumbers] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [color, setColor] = useState('#FF0000');

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
            <>
              {/* <GraphTitleAxis*/}
              {/*  setFormData={setFormData}*/}
              {/*  formData={formData}*/}
              {/*  {...renderProps}*/}
              {/*/ >*/}
              <CreateGraph />
            </>
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
                setColor={setColor}
              />
            )}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
