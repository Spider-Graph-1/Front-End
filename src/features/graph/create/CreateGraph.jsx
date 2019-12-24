import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  makeStyles,
  Step,
  Stepper,
  Typography,
  StepLabel,
  Button,
  DialogActions,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GraphTitleAxis from '../../../app/Brett/GraphTitleAxis';
import { structureGraph, addGraphData } from './createGraphSlice';
import Dataset from '../../../app/Brett/Dataset';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(1),
  },

  addButton: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
  },

  dialogButton: {
    marginRight: theme.spacing(1),
  },

  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const steps = ['Structure', 'Data', 'Styling'];

const initialStructureFormValues = {
  title: '',
  axes: {
    axis0: '',
    axis1: '',
    axis2: '',
  },
};

const initialDataFormValues = {
  datasetLabel: '',
  data: [0],
};

const CreateGraph = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [structureFormValues, setStructureFormValues] = useState(
    initialStructureFormValues
  );
  const [dataFormValues, setDataFormValues] = useState(initialDataFormValues);

  const handleNext = (event) => {
    event.preventDefault();
    if (activeStep === 0) {
      dispatch(
        structureGraph({
          title: structureFormValues.title,
          labels: Object.values(structureFormValues.axes),
        })
      );
    } else if (activeStep === 1) {
      dispatch(
        addGraphData({
          dataSetLabel: dataFormValues.datasetLabel,
          data: dataFormValues.data,
        })
      );
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return {
          form: (
            <GraphTitleAxis
              classes={classes}
              setIsOpen={setIsOpen}
              setActiveStep={setActiveStep}
            />
          ),
          instruction: 'Name your chart and enter how many axes to compare...',
        };
      case 1:
        return {
          form: (
            <Dataset
              formValues={dataFormValues}
              setFormValues={setDataFormValues}
            />
          ),
          instruction: 'Enter the data to be plotted...',
        };
      case 2:
        return {
          form: 'undefined',
          instruction: 'Customize the graph style...',
        };
      default:
        return { instruction: 'Unknown step' };
    }
  };

  const openChartCreator = () => {
    setStructureFormValues(initialStructureFormValues);
    setIsOpen(true);
  };

  useEffect(() => {
    if (activeStep === steps.length) {
      setIsOpen(false);
      setActiveStep(0);
      history.push('/graph');
    }
  }, [activeStep, history]);

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={openChartCreator}
        className={classes.addButton}
      >
        <AddIcon />
      </Fab>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Create New Graph</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {getStepContent(activeStep).form}
          <DialogActions>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep).instruction}
            </Typography>
            {activeStep === 0 ? (
              <Button
                onClick={() => setIsOpen(false)}
                className={classes.dialogButton}
              >
                Cancel
              </Button>
            ) : (
              <Button onClick={handleBack} className={classes.dialogButton}>
                Back
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleNext}
              className={classes.dialogButton}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGraph;
