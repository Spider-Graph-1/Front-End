import React from 'react';
import { awaitExpression } from '@babel/types';
import styled from 'styled-components';

function Dataset({ axis, addToDatasets, setLabel, setNumbers, numbers }) {
  const Form = styled.form`
    display: flex;
    flex-direction: column;
  `;

  const addLabel = (event) => {
    setLabel(event.target.value);
  };

  const changeValue = (event) => {
    let newNumbers = [...numbers];
    newNumbers[event.target.name] = event.target.value;
    setNumbers(newNumbers);
    console.log(`numbers: ${numbers}`);
  };

  return (
    <Form onSubmit={addToDatasets}>
      <label htmlFor="datalabel">Data Label</label>
      <input
        name="datalabel"
        type="text"
        placeholder="Add Title Here"
        onChange={addLabel}
      />
      {axis.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <label htmlFor="example">{item}</label>
            <input name={i} type="number" step="0.01" onChange={changeValue} />
          </React.Fragment>
        );
      })}

      <button type="submit">Submit</button>
    </Form>
  );
}

export default Dataset;
