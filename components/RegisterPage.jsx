const React = require('react');
const {withRouter} = require('react-router-dom');
const axios = require('axios');

const RegisterForm = require('./forms/RegisterForm');

class RegisterPage extends React.Component {
    state = {
        errors: {},
        user: {
            username: '',
            email: '',
            password1: '',
            password2: ''
        }
    }

    handleChange = (e) => {
        const {name: field, value} = e.target;
        const {user} = this.state;

        user[field] = value;
        this.setState(user);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/users/register', this.state.user).then(({status}) => {
            if (status !== 200) {
                this.reset();
                return;
            }

            this.props.history.push('/login');
        })
    }

    reset() {
        this.setState({
            errors: {},
            user: {
                username: '',
                email: '',
                password1: '',
                password2: ''
            }
        });
    }

    render() {
        return (
            <RegisterForm errors={this.state.errors}
                          user={this.state.user}
                          onChange={this.handleChange}
                          onSubmit={this.handleSubmit} />
        );
    }
}

module.exports = RegisterPage;