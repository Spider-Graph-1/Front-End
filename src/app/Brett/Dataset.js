import React from 'react';
import { awaitExpression } from '@babel/types';

function Dataset({
  axis,
  addToDatasets,
  setLabel,
  setNumbers,
  numbers,
  setColor,
}) {
  const addLabel = (event) => {
    setLabel(event.target.value);
  };

  const changeValue = (event) => {
    let newNumbers = [...numbers];
    newNumbers[event.target.name] = event.target.value;
    setNumbers(newNumbers);
    console.log(`numbers: ${numbers}`);
  };
  const changeColor = (event) => {
    let newColor = event.target.value;
    let opacColor = newColor + '4D';
    setColor(opacColor);
  };

  return (
    <form onSubmit={addToDatasets}>
      <label htmlFor="datalabel">Data Label</label>
      <input
        required
        name="datalabel"
        type="text"
        placeholder="Add Title Here"
        onChange={addLabel}
      />
      <label htmlFor="color">Dataset color:</label>
      <input
        required
        name="color"
        type="color"
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

export default Dataset;
