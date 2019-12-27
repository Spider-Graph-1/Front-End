import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  DialogActions,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addDataField, structureGraph } from './createGraphSlice';

function StructureForm({ classes, setIsOpen, setActiveStep }) {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);

  const { title, labels } = useSelector((state) => state.createGraph);

  const [formValues, setFormValues] = useState({
    title,
    axes: labels,
  });

  useEffect(() => {
    if (
      formValues.axes.every((value) => value !== '') &&
      formValues.title !== ''
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formValues.axes, formValues.title]);

  const changeTitle = (event) => {
    setFormValues({
      ...formValues,
      title: event.target.value,
    });
  };

  const addAxis = () => {
    setFormValues({
      ...formValues,
      axes: [...formValues.axes, ''],
    });

    dispatch(addDataField());
  };

  const changeAxis = (event) => {
    setFormValues({
      ...formValues,
      axes: Object.assign([...formValues.axes], {
        [Number(event.target.name)]: event.target.value,
      }),
    });
  };

  const removeAxis = (axisToRemove) => {
    setFormValues({
      ...formValues,
      axes: formValues.axes.filter(
        (axis) => formValues.axes.indexOf(axis) !== axisToRemove
      ),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      structureGraph({
        title: formValues.title,
        labels: Object.values(formValues.axes),
      })
    );

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      onSubmit={handleSubmit}
      p={1}
    >
      <TextField
        required
        autoFocus
        name="title"
        type="text"
        label="Graph title"
        value={formValues.title}
        onChange={changeTitle}
        variant="filled"
        color="secondary"
      />

      {formValues.axes.map((axis, index) => {
        return (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            display="flex"
            justifyContent="space-evenly"
            pt={1}
          >
            <TextField
              required
              name={index.toString()}
              label="Axis label"
              type="text"
              value={formValues.axes[index]}
              onChange={changeAxis}
              variant="filled"
              color="secondary"
              fullWidth
            />

            {formValues.axes.length > 3 && (
              <Box
                component={Button}
                type="button"
                onClick={() => removeAxis(index)}
                mx={1}
                px={3}
              >
                Remove
              </Box>
            )}
          </Box>
        );
      })}

      {isDisabled ? (
        <Tooltip title="All axes must be filled out before adding another">
          <Box display="flex" justifyContent="center">
            <Button type="button" disabled>
              Add Axis
            </Button>
          </Box>
        </Tooltip>
      ) : (
        <Button type="button" onClick={addAxis}>
          Add Axis
        </Button>
      )}

      <DialogActions>
        <Typography className={classes.instructions}>
          Name your chart and enter how many axes to compare...
        </Typography>
        <Button
          onClick={() => setIsOpen(false)}
          className={classes.dialogButton}
        >
          Cancel
        </Button>

        {isDisabled ? (
          <Tooltip title="All fields must be filled out before proceeding">
            <Box display="flex" justifyContent="center">
              <Button
                disabled
                variant="contained"
                type="submit"
                className={classes.dialogButton}
              >
                Next
              </Button>
            </Box>
          </Tooltip>
        ) : (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
            className={classes.dialogButton}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Box>
  );
}

export default StructureForm;
