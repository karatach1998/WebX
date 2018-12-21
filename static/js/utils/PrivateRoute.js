const React = require('react');
const { Route, Redirect } = require('react-router-dom');

const Auth = require('./Auth');

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated()
            ? <Component {...props} />
            : <Redirect to="/login" />
    )} />
);

module.exports = PrivateRoute;