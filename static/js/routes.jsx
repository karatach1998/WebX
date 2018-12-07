const React = require('react');
const { IndexRoute, Route, Switch } = require('react-router');

const Main = require('../../components/Main');
const Board = require('../../components/Board');

const routes = module.exports = (
    <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/boards/:boardId" component={Board} />
    </Switch>
);
