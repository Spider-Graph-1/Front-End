import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <>
    <Button onClick={onUndo} disabled={!canUndo} startIcon={<UndoIcon />}>
      Undo
    </Button>
    <Button onClick={onRedo} disabled={!canRedo} startIcon={<RedoIcon />}>
      Redo
    </Button>
  </>
);

const mapStateToProps = (state) => {
  return {
    canUndo: state.createGraph.past.length > 0,
    canRedo: state.createGraph.future.length > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);
