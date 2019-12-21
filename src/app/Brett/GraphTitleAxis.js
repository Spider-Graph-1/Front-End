import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function GraphTitleAxis({ setAxis, axis, setTitle, formData, setFormData }) {
  const [num, setNum] = useState();
  const [greenlight, setGreenlight] = useState(false);
  const numArray = ['', '', '', '', '', '', ''];
  const [axisData, setAxisData] = useState([]);

  const newTitle = (event) => {
    // setFormData({ [event.target.name]: event.target.value });
    setTitle(event.target.value);
  };

  const saveAxis = (event) => {
    // setFormData({ [event.target.name]: event.target.value });
    setAxisData([...axisData, event.target.value]);
  };
  const renderAxisField = (event) => {
    setNum(event.target.value);
    console.log(num);
    setGreenlight(true);
  };
  const submitForm = (event) => {
    console.log(axisData);
    event.preventDefault();
    setAxis(axisData);
    document.getElementById('charty').reset();
    // setFormData({ title: "", axe: "" });
  };
  // useEffect(() => {
  //   console.log(axis);
  // }, [axis]);
  //Form here
  return (
    <div>
      <form id="charty" onSubmit={submitForm}>
        <label htmlFor="title">Graph Title:</label>
        <input
          name="title"
          type="text"
          placeholder="Add Title Here"
          // value={formData.title}
          onChange={newTitle}
        ></input>

        <label htmlFor="numAxis">Select Number of Axis</label>
        <select
          name="numAxis"
          type="select"
          onChange={renderAxisField}
          // value={formData.axe}
        >
          <option default>Choose an Option</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        {greenlight
          ? numArray.slice(0, num).map((item, id) => {
              return (
                <>
                  <label htmlFor="axis">Axis {id + 1} title</label>
                  <input
                    name="axis"
                    type="text"
                    placeholder={`Add Axis ${id + 1} Name`}
                    onChange={saveAxis}
                  ></input>
                </>
              );
            })
          : null}
        <button type="submit">Create</button>
      </form>
      <Link to="/dashboard/chart">See Chart</Link>
    </div>
  );
}

export default GraphTitleAxis;
