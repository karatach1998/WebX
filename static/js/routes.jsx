const React = require('react');
const { IndexRoute, Route, Switch } = require('react-router');

const Main = require('../../components/Main');
const Board = require('../../components/Board');
const LoginPage = require('../../components/LoginPage');
const RegisterPage = require('../../components/RegisterPage');
const PrivateRoute = require('./utils/PrivateRoute');

const routes = module.exports = (
    <Switch>
        <PrivateRoute exact path="/" component={Main} />
        <PrivateRoute exact path="/boards/:boardId" component={Board} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
    </Switch>
);
