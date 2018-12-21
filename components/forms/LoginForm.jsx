const React = require('react');
const { Link } = require('react-router-dom');


const LoginForm = ({onSubmit, onChange, errors, user}) => (
    <div className="login-container-parent">
        <div className="login-container-child">
            <form className="login-form" action="/" onSubmit={onSubmit}>
                <h1 className="login-text">Sign in</h1>

                <div className="login-input-container">
                    <p className="login-text-label">Username</p>
                    <input type="text" className="login-input-field" name="username" onChange={onChange}
                           placeholder="For example: cavin" value={user.username}/>
                    <span className="login-underline-animation"/>
                </div>

                <div className="login-input-container">
                    <p className="login-text-label">Password</p>
                    <input type="password" className="login-input-field" name="password" onChange={onChange}
                           placeholder="For example: ********" value={user.password}/>
                    <span className="login-underline-animation"/>
                </div>

                <br/>
                <button className="login-btn login-btn-login" type="submit">Sign in</button>
            </form>

            <div className="login-container-link">
                <Link className="login-link" to="/register">Register</Link>
            </div>
        </div>
    </div>
);

module.exports = LoginForm;