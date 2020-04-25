import React, { Fragment } from 'react';
import '../styles/Login.scss';

const Login = () => {
    return (
        <Fragment>
            <form className="login-container">
                <label htmlFor="username" className="username">
                    <input type="text" id="username" name="username" placeholder="username" />
                </label>
                <label htmlFor="userpassword" className="userpassword">
                    <input type="text" id="userpassword" name="userpassword" placeholder="password" />
                </label>
                <label htmlFor="" className="submit-btn">
                    <input type="submit" value="LOG IN" id="login-btn" className="active-button" />
                </label>
            </form>
        </Fragment>
    );
}

export default Login;
