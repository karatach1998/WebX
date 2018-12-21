const React = require('react');
const {HashRouter: Router} = require('react-router-dom');

const Auth = require('./utils/Auth');
const routes = require('./routes');

class App extends React.Component {
    state = {
        isAuthenticated: false
    }

    componentDidMount() {
        this.checkAuthentication();
    }

    checkAuthentication() {
        this.setState({isAuthenticated: Auth.isAuthenticated()});
    }

    render() {
        return (
            <Router>
                {routes}
            </Router>
        );
    }
}

module.exports = App;