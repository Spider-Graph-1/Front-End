import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';

function GraphTitleAxis({
  setAxis,
  axis,
  setTitle,
  formData,
  setFormData,
  history,
}) {
  const [num, setNum] = useState();
  const [greenlight, setGreenlight] = useState(false);
  const [axisData, setAxisData] = useState(['', '', '', '', '', '', '']);

  const newTitle = (event) => {
    setTitle(event.target.value);
  };

  const saveAxis = (event) => {
    let newAxisData = [...axisData];
    newAxisData[event.target.name] = event.target.value;
    setAxisData(newAxisData);
  };
  const renderAxisField = (event) => {
    setNum(event.target.value);
    console.log(num);
    setGreenlight(true);
  };
  const submitForm = (event) => {
    console.log(axisData);
    event.preventDefault();
    setAxis(axisData.slice(0, num));
    history.push('/dashboard/chart');
  };

  return (
    <div>
      <form id="charty" onSubmit={submitForm}>
        <label htmlFor="title">Graph Title:</label>
        <input
          name="title"
          type="text"
          placeholder="Add Title Here"
          onChange={newTitle}
        />

        <label htmlFor="numAxis">Select Number of Axis</label>
        <select name="numAxis" type="select" onChange={renderAxisField}>
          <option default>Choose an Option</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        {greenlight
          ? axisData.slice(0, num).map((item, id) => {
              return (
                <>
                  <label htmlFor="axis">Axis {id + 1} title</label>
                  <input
                    name={id}
                    type="text"
                    value={item}
                    placeholder={`Add Axis ${id + 1} Name`}
                    onChange={saveAxis}
                  />
                </>
              );
            })
          : null}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default GraphTitleAxis;
