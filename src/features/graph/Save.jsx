import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector, connect } from 'react-redux';
import { postGraph } from './saveGraphSlice';

const Save = ({ canSave }) => {
  const dispatch = useDispatch();
  const { title, labels, datasets } = useSelector(
    (state) => state.createGraph.present
  );

  return (
    <Button
      disabled={!canSave}
      onClick={() =>
        dispatch(
          postGraph({
            graph_name: title,
            graph_info: JSON.stringify({
              labels,
              datasets,
            }),
            user_id: localStorage.getItem('userId'),
          })
        )
      }
    >
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
