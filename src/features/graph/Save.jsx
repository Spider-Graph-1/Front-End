import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { postGraph } from './saveGraphSlice';
import { putGraph } from './edit/editGraphSlice';

const Save = ({ canSave }) => {
  const dispatch = useDispatch();
  const { title, labels, datasets } = useSelector(
    (state) => state.createGraph.present
  );

  const { id } = useParams();

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

  return (
    <Button disabled={!canSave} onClick={handleSave}>
      Save
    </Button>
  );
};

const mapStateToProps = (state) => {
  return {
    canSave: state.createGraph.past.length > 0,
  };
};

export default connect(mapStateToProps)(Save);
