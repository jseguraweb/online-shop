import React, { Fragment } from 'react';
import '../styles/Login.scss';

const Login = () => {
    return (
        <Fragment>
            <form className="login-container">
                <label htmlFor="username" className="username">
                    <input type="text" id="login-username" name="username" placeholder="username" required />
                </label>
                <label htmlFor="password" className="userpassword">
                    <input type="text" id="login-password" name="password" placeholder="password" required />
                </label>
                <label htmlFor="" className="submit-btn">
                    <input type="submit" value="LOG IN" id="login-btn" className="active-button" />
                </label>
            </form>
        </Fragment>
    );
}

export default Login;
