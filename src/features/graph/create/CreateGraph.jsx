import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  makeStyles,
  Step,
  Stepper,
  StepLabel,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import StructureForm from './StructureForm';
import DatasetsForm from './DatasetsForm';

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

const steps = ['Structure', 'Data'];

const CreateGraph = () => {
  const history = useHistory();

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const getStepContent = (step) => {
    if (step === 0) {
      return (
        <StructureForm
          classes={classes}
          setIsOpen={setIsOpen}
          setActiveStep={setActiveStep}
        />
      );
    }

    return <DatasetsForm classes={classes} setActiveStep={setActiveStep} />;
  };

  useEffect(() => {
    if (activeStep === steps.length) {
      setIsOpen(false);
      // setActiveStep(0);
      history.push('/graph');
    }
  }, [activeStep, history]);

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

          {getStepContent(activeStep)}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGraph;
