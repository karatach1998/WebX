const React = require('react');
const { Route } = require('react-router');
const App = require('./main');

const Routes = module.exports = () => (
    <div>
        <Route path="/" component={App}/>
    </div>
);