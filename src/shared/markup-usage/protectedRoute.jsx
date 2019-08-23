/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export const ProtectedRoute = ({
  path, component: Component, render: renderProvided, currentUserName, ...rest
}) => (
  <Route
    {...rest}
    render={
      props => (
        !currentUserName
          ? <Redirect to={{ pathname: '/login', fromPath: props.location }} />
          : Component
            ? <Component {...props} />
            : renderProvided(props)
      )}
  />
);

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  currentUserName: PropTypes.string,
  location: PropTypes.shape({ pathname: PropTypes.string }),
  render: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  component: null,
  currentUserName: '',
  location: null,
  render: null,
};

const mapStateToProps = state => ({
  currentUserName: state.user.currentUser.name,
});

export default connect(mapStateToProps)(ProtectedRoute);
