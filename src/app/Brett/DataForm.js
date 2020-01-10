import React from 'react';
import { awaitExpression } from '@babel/types';

function DataForm({
  axis,
  addToDatasets,
  setLabel,
  label,
  setNumbers,
  numbers,
  color,
  setColor,
}) {
  const addLabel = (event) => {
    setLabel(event.target.value);
  };

  const changeValue = (event) => {
    const newNumbers = [...numbers];
    newNumbers[event.target.name] = event.target.value;
    setNumbers(newNumbers);
  };
  const changeColor = (event) => {
    setColor(event.target.value);
  };

  // Setting up how to save the data.

  return (
    <form onSubmit={addToDatasets}>
      <label htmlFor="datalabel">Data Label</label>
      <input
        required
        name="datalabel"
        type="text"
        value={label}
        placeholder="Add Title Here"
        onChange={addLabel}
      />
      <label htmlFor="color">Dataset color:</label>
      <input
        required
        name="color"
        type="color"
        value={color}
        onChange={changeColor}
        opacity="0.5"
      />
      {axis.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <label htmlFor={i}>{item}</label>
            <input
              required
              name={i}
              type="number"
              step="0.1"
              onChange={changeValue}
            />
          </React.Fragment>
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
}

export default DataForm;
