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
import { TwitterPicker } from 'react-color';
import colors from '../../../utils/colors';
import {
  changeColor,
  changeDatasetData,
  changeDatasetLabel,
  removeDataset,
} from './createGraphSlice';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0,
  },

  removeButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  },

  colorPicker: {
    marginBottom: '1rem',
  },
}));

const DatasetPanel = ({ index, expanded, setExpanded, handleExpansion }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { datasets, labels } = useSelector((state) => state.createGraph);
  const [markedComplete, setMarkedComplete] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

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
    if (datasets.some((dataset) => dataset.label === event.target.value)) {
      setDuplicate(true);
    } else {
      setDuplicate(false);
    }
    dispatch(changeDatasetLabel({ index, label: event.target.value }));
  };

  const labelDuplicate = (event) => {
    if (duplicate) {
      dispatch(changeDatasetLabel({ index, label: `${event.target.value}*` }));
      setDuplicate(false);
    }
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
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography className={classes.heading}>
            {datasets[index].label || 'Unlabeled dataset'}
          </Typography>
          {markedComplete && (
            <CheckIcon color="secondary" className={classes.checkIcon} />
          )}
          {datasets.length > 1 && (
            <Box
              component={Button}
              mx={4}
              type="button"
              onClick={() => dispatch(removeDataset(index))}
              className={classes.removeButton}
            >
              Remove
            </Box>
          )}
        </Box>
      </ExpansionPanelSummary>
      <Box
        display="flex"
        flexDirection="column"
        component={ExpansionPanelDetails}
      >
        <TwitterPicker
          name="color"
          color={datasets[index].borderColor}
          colors={Object.keys(colors).map((color) => colors[color]['500'])}
          width={346}
          triangle="hide"
          onChangeComplete={(color) => dispatch(changeColor({ index, color }))}
          className={classes.colorPicker}
        />
        <TextField
          required
          id={`datalabel${index}`}
          name={`datalabel${index}`}
          label="Dataset label"
          type="text"
          value={datasets[index].label}
          variant="filled"
          color="secondary"
          error={duplicate}
          helperText={duplicate && 'This dataset label already exists'}
          onBlur={labelDuplicate}
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
