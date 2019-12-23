import React, { useState } from 'react';
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
import GraphTitleAxis from '../../../app/Brett/GraphTitleAxis';
import { structureGraph } from './createGraphSlice';
import Dataset from '../../../app/Brett/Dataset';

const useStyles = makeStyles((theme) => ({
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

const initialFormValues = {
  title: '',
  axes: {
    axis0: '',
    axis1: '',
    axis2: '',
  },
};

const CreateGraph = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [formValues, setFormValues] = useState(initialFormValues);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return {
          form: (
            <GraphTitleAxis
              formValues={formValues}
              setFormValues={setFormValues}
            />
          ),
          instruction: 'Name your chart and enter how many axes to compare...',
        };
      case 1:
        return {
          form: <Dataset />,
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
    setFormValues(initialFormValues);
    setIsOpen(true);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      dispatch(
        structureGraph({
          title: formValues.title,
          labels: Object.values(formValues.axes),
        })
      );
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    setIsOpen(false);
    setActiveStep(0);
  };

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

          {activeStep === steps.length ? (
            handleFinish()
          ) : (
            <>
              <DialogContent>{getStepContent(activeStep).form}</DialogContent>
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGraph;
