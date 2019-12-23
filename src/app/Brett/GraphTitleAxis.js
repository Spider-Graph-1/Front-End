import React from 'react';

function GraphTitleAxis({ formValues, setFormValues }) {
  const changeTitle = (event) => {
    setFormValues({
      ...formValues,
      title: event.target.value,
    });
  };

  const changeAxis = (event) => {
    setFormValues({
      ...formValues,
      axes: {
        ...formValues.axes,
        [event.target.name]: event.target.value,
      },
    });
  };

  const removeAxis = (keyToRemove) => {
    const filtered = Object.keys(formValues.axes)
      .filter((key) => key !== keyToRemove)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: formValues.axes[key],
        };
      }, {});

    setFormValues({ ...formValues, axes: filtered });
  };

  return (
    <form id="charty">
      <label htmlFor="title">Graph Title:</label>
      <input
        required
        id="title"
        name="title"
        type="text"
        value={formValues.title}
        onChange={changeTitle}
      />

      {Array.from(Array(Object.keys(formValues.axes).length), (item, index) => {
        if (index < 3) {
          return (
            <div key={index}>
              <label htmlFor={`axis${index}`}>Axis {index + 1} title</label>
              <input
                id={`axis${index}`}
                name={`axis${index}`}
                type="text"
                value={formValues.axes[`axis${index}`]}
                onChange={changeAxis}
              />
            </div>
          );
        }
        return (
          <div key={index}>
            <label htmlFor={`axis${index}`}>Axis {index + 1} title</label>
            <input
              id={`axis${index}`}
              name={`axis${index}`}
              type="text"
              value={formValues.axes[`axis${index}`]}
              onChange={changeAxis}
            />
            <button type="button" onClick={() => removeAxis(`axis${index}`)}>
              -
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          setFormValues({
            ...formValues,
            axes: {
              ...formValues.axes,
              [`axis${Object.keys(formValues.axes).length}`]: '',
            },
          })
        }
      >
        Add Axis
      </button>
    </form>
  );
}

export default GraphTitleAxis;
