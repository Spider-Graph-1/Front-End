import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addAxis, changeAxis, changeTitle, removeAxis } from '../graphSlice';

const EditStructure = () => {
  const dispatch = useDispatch();
  const { title, labels } = useSelector((state) => state.createGraph.present);

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

  return (
    <Box component="form" display="flex" flexDirection="column" px={0.5}>
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

      <Button type="button" onClick={() => dispatch(addAxis())}>
        Add Axis
      </Button>
    </Box>
  );
};

export default EditStructure;
