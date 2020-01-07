import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../api/utils/axiosWithAuth';

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
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeTitle, changeAxis } from '../../features/graph/graphSlice';

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

function GraphTitleAxis() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { title, labels } = useSelector((state) => state.createGraph.present);
  const [num, setNum] = useState();
  const [greenlight, setGreenlight] = useState(false);
  const [axisData] = useState(['', '', '', '', '', '', '']);

  const newTitle = ({ target: { value } }) => {
    dispatch(changeTitle(value));
  };

  useEffect(() => {
    axiosWithAuth()
      .get('/users/4')
      .then((response) => console.log('This is the response', response))
      .catch((error) => console.log(error));
  }, []);

  const saveAxis = ({ target: { value } }, index) => {
    dispatch(
      changeAxis({
        index,
        label: value,
      })
    );
  };
  const renderAxisField = (event) => {
    setNum(event.target.value);
    console.log(num);
    setGreenlight(true);
  };
  const submitForm = (event) => {
    event.preventDefault();
    history.push('/graph');
  };

  function routeToGraph(event) {
    history.push('/graph');
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <Box
          mt={18}
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
            value={title}
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
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
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
                      value={labels[id]}
                      color="secondary"
                      placeholder={`Add Axis ${id + 1} Name`}
                      onChange={(event) => saveAxis(event, id)}
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

          <Button onClick={routeToGraph}>See Graph</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default GraphTitleAxis;
