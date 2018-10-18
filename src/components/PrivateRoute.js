import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

const PrivateRoute = ({ component: Component, isLogged, logout, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={props => {
        if (isLogged) {
          return <Component {...props} logout={logout} />
        } else {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
      }}
    />
  )
}



export default withAuth()(PrivateRoute);