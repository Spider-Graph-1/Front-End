import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { deleteGraph, resetSuccess } from './deleteSlice';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: theme.palette.primary.main,
  },
}));

const Delete = ({
  graphToDelete,
  setGraphToDelete,
  setRefresh,
  setOpen,
  open,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { graphs } = useSelector((state) => state.dashboard);
  const { deleting, success } = useSelector((state) => state.removeGraph);

  const handleDelete = () => {
    dispatch(deleteGraph(graphToDelete));
  };

  useEffect(() => {
    if (success) {
      setGraphToDelete(null);
      setRefresh(true);
      setOpen(false);
      dispatch(resetSuccess());
    }
  }, [dispatch, setGraphToDelete, setOpen, setRefresh, success]);

  return (
    <Dialog maxWidth="xs" aria-labelledby="confirm-delete" open={open}>
      <DialogTitle id="confirm-delete">Confirm Delete</DialogTitle>
      <DialogContent>
        {graphToDelete &&
          `Delete ${
            graphs.find((graph) => graph.id === graphToDelete).graph_name
          }?`}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="primary"
          startIcon={
            deleting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )
          }
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
