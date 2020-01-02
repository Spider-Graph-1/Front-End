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
import { addAxis, changeAxis, changeTitle, removeAxis } from '../graphSlice';

function Structure({ classes, setIsOpen, setActiveStep }) {
  const dispatch = useDispatch();
  const { title, labels } = useSelector((state) => state.createGraph);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (labels.every((value) => value !== '') && title !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [labels, title]);

  const editTitle = ({ target: { value } }) => {
    dispatch(changeTitle(value));
  };

  const editAxis = ({ target: { value } }, index) => {
    dispatch(
      changeAxis({
        index,
        label: value,
      })
    );
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box component="form" display="flex" flexDirection="column" p={1}>
      <TextField
        required
        autoFocus
        name="title"
        type="text"
        label="Graph title"
        value={title}
        onChange={editTitle}
        variant="filled"
        color="secondary"
      />

      {labels.map((axis, index) => (
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
            value={labels[index]}
            onChange={(event) => editAxis(event, index)}
            variant="filled"
            color="secondary"
            fullWidth
          />

          {labels.length > 3 && (
            <Box
              component={Button}
              type="button"
              onClick={() => dispatch(removeAxis(index))}
              mx={1}
              px={3}
            >
              Remove
            </Box>
          )}
        </Box>
      ))}

      {isDisabled ? (
        <Tooltip title="All axes must be filled out before adding another">
          <Box display="flex" justifyContent="center">
            <Button type="button" disabled>
              Add Axis
            </Button>
          </Box>
        </Tooltip>
      ) : (
        <Button type="button" onClick={() => dispatch(addAxis())}>
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
            onClick={handleNext}
            className={classes.dialogButton}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Box>
  );
}

export default Structure;
