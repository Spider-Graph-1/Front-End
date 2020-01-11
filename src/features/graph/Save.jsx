import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Box } from '@material-ui/core';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams, Prompt } from 'react-router-dom';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { postGraph } from './saveGraphSlice';
import { putGraph } from './edit/editGraphSlice';

const Save = ({ canSave }) => {
  const dispatch = useDispatch();
  const { title, labels, datasets } = useSelector(
    (state) => state.createGraph.present
  );

  const [incomplete, setIncomplete] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (
      datasets.every((dataset) => dataset.data.every((value) => value !== ''))
    ) {
      setIncomplete(false);
    } else {
      setIncomplete(true);
    }
  }, [datasets]);

  const handleSave = () => {
    if (id) {
      dispatch(
        putGraph(id, {
          graph_name: title,
          graph_info: JSON.stringify({
            labels,
            datasets,
          }),
          user_id: localStorage.getItem('userId'),
        })
      );
    } else {
      dispatch(
        postGraph({
          graph_name: title,
          graph_info: JSON.stringify({
            labels,
            datasets,
          }),
          user_id: localStorage.getItem('userId'),
        })
      );
    }

    dispatch(UndoActionCreators.clearHistory());
  };

  if (incomplete) {
    return (
      <Tooltip title="All fields must be filled out before saving">
        <Box display="flex" justifyContent="center">
          <Button disabled onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Tooltip>
    );
  }

  return (
    <>
      <Prompt
        when={canSave}
        message="Are you sure you want to leave without saving?"
      />
      <Button disabled={!canSave} onClick={handleSave}>
        Save
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    canSave: state.createGraph.past.length > 0,
  };
};

export default connect(mapStateToProps)(Save);
