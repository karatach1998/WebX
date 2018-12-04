const React = require('react');
const { Route } = require('react-router');

const Main = require('../../components/main');

const Routes = module.exports = () => (
    <div>
        <Route path="/" component={Main}/>
    </div>
);