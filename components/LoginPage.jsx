const React = require('react');
const {withRouter} = require('react-router-dom');
const axios = require('axios');

const LoginForm = require('./forms/LoginForm');
const Auth = require('../static/js/utils/Auth');

class LoginPage extends React.Component {
    state = {
        errors: {},
        user: {
            username: '',
            password: ''
        },
        status: false
    }

    handleChange = (e) => {
        const {name: field, value} = e.target;
        const {user} = this.state;

        user[field] = value;
        this.setState({user});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log('handleSubmit');
        axios.post('/api/users/login', this.state.user).then(({status, data: {sid}}) => {
            if (status !== 200) {
                this.reset(e);
                return;
            }

            Auth.authenticate(sid);
            this.props.history.push('/');
        });
    }

    reset() {
        this.setState({
            errors: {},
            user: {
                username: '',
                password: ''
            }
        });
    }

    render() {
        return (
            <LoginForm errors={this.state.errors}
                       user={this.state.user}
                       onChange={this.handleChange}
                       onSubmit={this.handleSubmit} />
        );
    }
}

module.exports = withRouter(LoginPage);