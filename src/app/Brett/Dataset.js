import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

function Dataset({ formValues, setFormValues }) {
  const { labels } = useSelector((state) => state.createGraph);

  const changeLabel = (event) => {
    setFormValues({
      ...formValues,
      datasetLabel: event.target.value,
    });
  };

  const changeValue = (event) => {
    const newNumbers = formValues.data;
    newNumbers[event.target.name] = Number(event.target.value);
    setFormValues({ ...formValues, data: newNumbers });
  };

  // const changeColor = (event) => {
  //   let newColor = event.target.value;
  //   let opacColor = newColor + '4D';
  //   setColor(opacColor);
  // };

  return (
    <form>
      <label htmlFor="datalabel">Dataset Label</label>
      <input
        required
        id="datalabel"
        name="datalabel"
        type="text"
        value={formValues.datasetLabel}
        onChange={changeLabel}
      />
      {/* <label htmlFor="color">Dataset color:</label>*/}
      {/* <input*/}
      {/*  required*/}
      {/*  name="color"*/}
      {/*  type="color"*/}
      {/*  onChange={changeColor}*/}
      {/*  opacity="0.5"*/}
      {/*/ >*/}
      {labels.map((item, index) => {
        return (
          <Fragment key={item}>
            <label htmlFor={item}>{item}</label>
            <input
              required
              name={index}
              type="number"
              step="0.1"
              onChange={changeValue}
            />
          </Fragment>
        );
      })}

      <button type="submit">Submit</button>
    </form>
  );
}

export default Dataset;
