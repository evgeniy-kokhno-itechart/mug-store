import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const ProtectedRoute = ({
  path, component: Component, render: renderProvided, currentUser, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!currentUser.name) {
        return <Redirect to={{ pathname: '/login', fromPath: props.location }} />;
      }
      return Component ? <Component {...props} /> : renderProvided(props);
    }}
  />
);

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  currentUser: PropTypes.shape({ name: PropTypes.string }),
  location: PropTypes.shape({ state: PropTypes.shape({ from: PropTypes.shape({ pathname: PropTypes.string }) }) }),
  render: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  component: null,
  currentUser: null,
  location: null,
  render: null,
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(ProtectedRoute);
