const React = require('react');
const { Link } = require('react-router-dom');

const RegisterForm = ({onSubmit, onChange, errors, user}) => (
    <div className="login-container-parent">
        <div className="login-container-child">
            <form className="login-form" method="post">
                <h1 className="login-text">Register</h1>

                <div className="login-input-container">
                    <p className="login-text-label">Username</p>
                    <input type="text" className="login-input-field" name="username"
                           placeholder="For example: username" value={user.username} onChange={onChange} />
                    <span className="login-underline-animation"/>
                </div>

                <div className="login-input-container">
                    <p className="login-text-label">Email</p>
                    <input type="email" className="login-input-field" name="email"
                           placeholder="For example: user@example.com" value={user.email} onChange={onChange} />
                    <span className="login-underline-animation"/>
                </div>

                <div className="login-input-container">
                    <p className="login-text-label">Password</p>
                    <input type="password" className="login-input-field" name="password1"
                           placeholder="For example: ********" value={user.password1} onChange={onChange} />
                    <span className="login-underline-animation"/>
                </div>

                <div className="login-input-container">
                    <p className="login-text-label">Repeat password</p>
                    <input type="password" className="login-input-field" name="password2"
                           placeholder="Repeat password here" value={user.password2} onChange={onChange} />
                    <span className="login-underline-animation"/>
                </div>

                <br/>
                <button type="submit" className="login-btn login-btn-login">Register</button>
            </form>

            <br/>
            <div className="container-link">
                <Link className="login-link" to="/login">Back to login</Link>
            </div>
        </div>
    </div>
);

module.exports = RegisterForm;