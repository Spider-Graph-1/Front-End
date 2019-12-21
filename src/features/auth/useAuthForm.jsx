import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: '1rem',
    paddingBlockEnd: '2rem',
    borderBlockEnd: `2px solid ${theme.palette.primary.main}`,
  },
  formButton: {
    margin: '0.75rem',
  },
  formField: {
    margin: '1rem 15%',
  },
  progressBar: {
    margin: '10px 0',
    inlineSize: '100%',
  },
  checkIcon: {
    minInlineSize: '10%',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    insetBlockStart: '50%',
    insetInlineStart: '50%',
    marginBlockStart: -12,
    marginInlineStart: -12,
  },
}));

const useAuthForm = (initialFormValues) => {
  const dispatch = useDispatch();
  const { authenticating, success, error } = useSelector((state) => state.auth);

  const classes = useStyles();
  const history = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (success) {
      history.push('/dashboard');
    }
  }, [history, success]);

  return {
    authenticating,
    error,
    handleChange,
    formValues,
    dispatch,
    classes,
  };
};

export default useAuthForm;
