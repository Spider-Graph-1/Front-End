import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  DialogActions,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { addGraphData } from './createGraphSlice';
import useRequiredValidation from '../../../utils/useRequiredValidation';

function DatasetsForm({ classes, setActiveStep }) {
  const {
    labels,
    datasets: [{ label, data }],
  } = useSelector((state) => state.createGraph);
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);

  const [formValues, setFormValues] = useState({
    label,
    data,
  });

  useRequiredValidation(formValues.data, formValues.label, setIsDisabled);

  const changeLabel = (event) => {
    setFormValues({
      ...formValues,
      label: event.target.value,
    });
  };

  const changeValue = (event) => {
    setFormValues({
      ...formValues,
      data: Object.assign([...formValues.data], {
        [Number(event.target.name)]: event.target.value,
      }),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addGraphData({
        label: formValues.label,
        data: formValues.data,
      })
    );

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      pt={1}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="datalabel"
        name="datalabel"
        label="Dataset label"
        type="text"
        value={formValues.label}
        variant="filled"
        color="secondary"
        fullWidth
        onChange={changeLabel}
      />

      {labels.map((value, index) => {
        return (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            pt={1}
          >
            <TextField
              required
              name={index.toString()}
              type="number"
              label={`Value for ${value}`}
              value={formValues.data[index]}
              variant="filled"
              color="secondary"
              fullWidth
              step="0.1"
              onChange={changeValue}
            />
          </Box>
        );
      })}

      <DialogActions>
        <Typography className={classes.instructions}>
          Enter the data to be plotted...
        </Typography>
        <Button
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
          className={classes.dialogButton}
        >
          Back
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

export default DatasetsForm;
