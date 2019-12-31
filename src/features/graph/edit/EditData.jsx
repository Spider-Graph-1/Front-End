import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import DatasetPanel from '../create/DatasetPanel';
import { addDataset } from '../create/createGraphSlice';

const EditData = () => {
  const dispatch = useDispatch();
  const { datasets } = useSelector((state) => state.createGraph);
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAddDataset = () => {
    dispatch(addDataset());
  };

  return (
    <Box component="form" display="flex" flexDirection="column" pt={1}>
      {datasets.map((dataset, index) => (
        <DatasetPanel
          // eslint-disable-next-line react/no-array-index-key
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
    </Box>
  );
};

export default EditData;
