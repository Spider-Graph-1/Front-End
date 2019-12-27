import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  TextField,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import { changeDatasetData, changeDatasetLabel } from './createGraphSlice';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
}));

const DatasetPanel = ({ index, expanded, setExpanded, handleExpansion }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { datasets, labels } = useSelector((state) => state.createGraph);
  const [markedComplete, setMarkedComplete] = useState(false);

  useEffect(() => {
    if (index === datasets.length - 1) {
      setExpanded(`panel${index}`);
    }
  }, [datasets.length, index, setExpanded]);

  useEffect(() => {
    if (
      datasets[index].data.every((value) => value !== '') &&
      datasets[index].label !== ''
    ) {
      setMarkedComplete(true);
    } else {
      setMarkedComplete(false);
    }
  }, [datasets, index]);

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
    <ExpansionPanel
      expanded={expanded === `panel${index}`}
      onChange={handleExpansion(`panel${index}`)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
      >
        <Typography className={classes.heading}>
          {datasets[index].label || 'Unlabled dataset'}
        </Typography>
        {markedComplete && (
          <CheckIcon color="secondary" className={classes.checkIcon} />
        )}
        {datasets.length > 1 && (
          <Box component={Button} mx={4} type="button">
            Remove
          </Box>
        )}
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
