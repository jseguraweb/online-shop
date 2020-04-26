import React, { Fragment, useState } from 'react';
import '../styles/Login.scss';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const userData = {
            username: username,
            password: password
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };
        const response = await fetch('/cart/login', options);
        const data = await response.json();
        console.log('RESPONSE DATA: ', data);
    }

    return (
        <Fragment>
            <form className="login-container">
                <label htmlFor="username" className="username">
                    <input type="text" id="login-username" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label htmlFor="password" className="userpassword">
                    <input type="text" id="login-password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label htmlFor="" className="submit-btn">
                    <input type="submit" value="LOG IN" id="login-btn" className="active-button" onClick={(e) => { e.preventDefault(); handleSubmit() }} />
                </label>
            </form>
        </Fragment>
    );
}

export default Login;
