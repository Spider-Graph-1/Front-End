import React, { useState } from 'react';
import {
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeDatasetData, changeDatasetLabel } from './createGraphSlice';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
}));

const DatasetPanel = ({ index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const { datasets, labels } = useSelector((state) => state.createGraph);

  const changeLabel = (event) => {
    dispatch(changeDatasetLabel({ index, label: event.target.value }));
  };

  const changeValue = (event) => {
    dispatch(
      changeDatasetData({
        index,
        data: Object.assign([...datasets[index].data], {
          [Number(event.target.name)]: Number(event.target.value),
        }),
      })
    );
  };

  return (
    <ExpansionPanel expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>
          {datasets[index].label}
        </Typography>
      </ExpansionPanelSummary>
      <Box
        display="flex"
        flexDirection="column"
        component={ExpansionPanelDetails}
      >
        <TextField
          required
          id={`datalabel${index}`}
          name={`datalabel${index}`}
          label="Dataset label"
          type="text"
          value={datasets[index].label}
          variant="filled"
          color="secondary"
          fullWidth
          onChange={changeLabel}
        />

        {labels.map((label, labelIndex) => {
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={labelIndex}
              pt={1}
            >
              <TextField
                required
                name={labelIndex.toString()}
                type="number"
                label={`Value for ${label}`}
                value={datasets[index].data[labelIndex]}
                variant="filled"
                color="secondary"
                fullWidth
                step="0.1"
                onChange={changeValue}
              />
            </Box>
          );
        })}
      </Box>
    </ExpansionPanel>
  );
};

export default DatasetPanel;
