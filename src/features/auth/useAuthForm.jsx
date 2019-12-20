import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  formButton: {
    margin: theme.spacing(1),
  },
  formField: {
    margin: '1rem 15%',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
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
