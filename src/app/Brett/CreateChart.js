import React from 'react';
import { Radar } from 'react-chartjs-2';

function CreateChart({ setAxis, axis, setTitle, formData, setFormData }) {
  let axisData = '';

  const newTitle = (event) => {
    // setFormData({ [event.target.name]: event.target.value });
    setTitle(event.target.value);
  };

  const saveAxis = (event) => {
    // setFormData({ [event.target.name]: event.target.value });
    axisData = event.target.value;
  };
  const submitForm = (event) => {
    console.log(axisData);
    event.preventDefault();
    setAxis([...axis, axisData]);
    document.getElementById('charty').reset();
    // setFormData({ title: "", axe: "" });
  };

  //Form here
  return (
    <form id="charty" onSubmit={submitForm}>
      <label htmlFor="title">Graph Title:</label>
      <input
        name="title"
        type="text"
        placeholder="Add Title Here"
        // value={formData.title}
        onChange={newTitle}
      ></input>

      <label htmlFor="axis">Add axis:</label>
      <input
        name="axe"
        type="text"
        placeholder="Add Axis Name"
        // value={formData.axe}
        onChange={saveAxis}
      ></input>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateChart;
