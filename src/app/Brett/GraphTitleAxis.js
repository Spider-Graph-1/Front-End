import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Container,
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    padding: '1rem',
  },
  formField: {
    margin: '.5rem 15%',
  },
  selectLabel: {
    margin: '0 15%',
  },
  formButton: {
    margin: '.5rem auto',
    width: '50%',
  },
});

function GraphTitleAxis({
  setAxis,
  axis,
  setTitle,
  formData,
  setFormData,
  history,
}) {
  const classes = useStyles();
  const [num, setNum] = useState();
  const [greenlight, setGreenlight] = useState(false);
  const [axisData, setAxisData] = useState(['', '', '', '', '', '', '']);

  const newTitle = (event) => {
    setTitle(event.target.value);
  };

  const saveAxis = (event) => {
    let newAxisData = [...axisData];
    newAxisData[event.target.name] = event.target.value;
    setAxisData(newAxisData);
  };
  const renderAxisField = (event) => {
    setNum(event.target.value);
    console.log(num);
    setGreenlight(true);
  };
  const submitForm = (event) => {
    console.log(axisData);
    event.preventDefault();
    setAxis(axisData.slice(0, num));
    history.push('/dashboard/chart');
  };

  return (
    <Container maxWidth="sm">
      <Paper>
        <Box
          py="1.5rem"
          component="form"
          display="flex"
          flexDirection="column"
          onSubmit={submitForm}
        >
          <Typography variant="h3" align="center" className={classes.title}>
            Create Chart
          </Typography>
          <TextField
            required
            name="title"
            type="text"
            color="secondary"
            label="Graph Title"
            placeholder="Add Title Here"
            onChange={newTitle}
            className={classes.formField}
          />

          <InputLabel id="numAxis" className={classes.selectLabel}>
            Select Number of Axis
          </InputLabel>
          <Select
            labelId="numAxis"
            type="select"
            onChange={renderAxisField}
            required
            className={classes.formField}
          >
            <MenuItem default>Choose an Option</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
          </Select>
          {greenlight
            ? axisData.slice(0, num).map((item, id) => {
                return (
                  <>
                    <TextField
                      required
                      name={id}
                      type="text"
                      label={`Axis ${id + 1} title`}
                      value={item}
                      color="secondary"
                      placeholder={`Add Axis ${id + 1} Name`}
                      onChange={saveAxis}
                      className={classes.formField}
                    />
                  </>
                );
              })
            : null}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.formButton}
          >
            Create
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default GraphTitleAxis;
