const React = require('react');
const ReactDOM = require('react-dom');
import { BrowserRouter as Router } from "react-router-dom";

const Routes = require('./routes');

console.log('LOG: index.jsx');

ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    document.getElementById('root')
);
