import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  DialogActions,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DatasetPanel from './DatasetPanel';
import { addDataset } from './createGraphSlice';

function DatasetsForm({ classes, setActiveStep }) {
  const dispatch = useDispatch();
  const { datasets } = useSelector((state) => state.createGraph);
  const [expanded, setExpanded] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    datasets.forEach((dataset) => {
      if (dataset.data.every((value) => value !== '') && dataset.label !== '') {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    });
  }, [datasets]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddDataset = () => {
    dispatch(addDataset());
  };

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      pt={1}
      onSubmit={handleSubmit}
    >
      {datasets.map((dataset, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <DatasetPanel
          key={index}
          index={index}
          expanded={expanded}
          setExpanded={setExpanded}
          handleExpansion={handleExpansion}
        />
      ))}
      <Button type="button" onClick={handleAddDataset}>
        Add Dataset
      </Button>
      <DialogActions>
        <Typography className={classes.instructions}>
          Enter the data to be plotted...
        </Typography>
        <Button onClick={handleBack} className={classes.dialogButton}>
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
                Finish
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
            Finish
          </Button>
        )}
      </DialogActions>
    </Box>
  );
}

export default DatasetsForm;
