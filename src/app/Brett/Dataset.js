import React from 'react';
import { awaitExpression } from '@babel/types';

function Dataset({ axis, addToDatasets, setLabel, setNumbers, numbers }) {
  const addLabel = (event) => {
    setLabel(event.target.value);
  };

  const changeValue = (event) => {
    setNumbers({
      ...numbers,
      [event.target.name]: event.target.value,
    });
    console.log(`numbers: ${numbers}`);
  };

  return (
    <form onSubmit={addToDatasets}>
      <label htmlFor="datalabel">Data Label</label>
      <input
        name="datalabel"
        type="text"
        placeholder="Add Title Here"
        onChange={addLabel}
      />
      {axis.map((item, id) => {
        return (
          <>
            <label htmlFor="example">{item}</label>
            <input name={id} type="number" step="0.01" onChange={changeValue} />
          </>
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Dataset;
