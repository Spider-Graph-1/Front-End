import React from "react";
import { awaitExpression } from "@babel/types";

function Dataset({ axis, addToDatasets, setLabel, setNumbers, numbers }) {
  const addLabel = event => {
    setLabel(event.target.value);
  };

  const changeValue = event => {
    var b = event.target.value;
    const a = Number(b);
    setNumbers([...numbers, a]);
    console.log(numbers);
  };

  return (
    <form onSubmit={addToDatasets}>
      <label htmlFor="datalabel">Data Label</label>
      <input
        name="datalabel"
        type="text"
        placeholder="Add Title Here"
        onChange={addLabel}
      ></input>
      {axis.map(item => {
        return (
          <>
            <label htmlFor="example">{item}</label>
            <input name="example" type="text" onChange={changeValue}></input>
          </>
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Dataset;
