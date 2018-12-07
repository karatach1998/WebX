const React = require('react');
const ReactDOM = require('react-dom');
import { BrowserRouter as Router } from "react-router-dom";

const routes = require('./routes');

console.log('LOG: index.jsx');

ReactDOM.render(
    <Router>
        {routes}
    </Router>,
    document.getElementById('root')
);
