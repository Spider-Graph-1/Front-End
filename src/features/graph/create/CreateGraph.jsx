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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return 'Name your chart and enter how many axis to compare...';
    case 1:
      return 'Enter the data to be plotted...';
    case 2:
      return 'Customize the graph style...';
    default:
      return 'Unknown step';
  }
};

const CreateGraph = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    handleNext();
    setIsOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setIsOpen(true)}
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
          <>
            {activeStep === steps.length ? (
              handleFinish()
            ) : (
              <>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                {activeStep === 0 ? (
                  <Button
                    onClick={() => setIsOpen(false)}
                    className={classes.button}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </>
            )}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGraph;
