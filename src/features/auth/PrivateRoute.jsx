import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Route
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
      render={() => {
        return authenticated ? <Component /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
